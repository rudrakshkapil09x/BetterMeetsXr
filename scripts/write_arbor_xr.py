import os

code = '''import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { TreeSnapshot, GhostSprout, SlateCard, NodeType } from '../types/tree';
import { transformCard, ingestSpeech } from '../services/api';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Glasses,
  Zap,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronUp
} from 'lucide-react';

interface ArborXRProps {
  tree: TreeSnapshot | null;
  ghostSprouts: GhostSprout[];
  slateCards: SlateCard[];
  setSlateCards: React.Dispatch<React.SetStateAction<SlateCard[]>>;
  selectedParentId: string;
  onSelectParent: (id: string) => void;
  onStageCard: (card: SlateCard, targetParentId: string) => Promise<void>;
  onVote: (proposalId: string, voterName: string) => void;
  currentSpeaker: string;
  setCurrentSpeaker: (name: string) => void;
  lastStateHash: string;
  lastRevision: number;
  onSeedDemo?: () => Promise<void>;
}

// ── Epistemic Primitives Colors ─────────────────────────────────────────────
const NODE_COLORS: Record<NodeType, { main: number; emissive: number; hex: string }> = {
  goal: { main: 0x06b6d4, emissive: 0x0891b2, hex: '#06b6d4' },
  topic: { main: 0x3b82f6, emissive: 0x2563eb, hex: '#3b82f6' },
  claim: { main: 0x10b981, emissive: 0x059669, hex: '#10b981' },
  question: { main: 0xf59e0b, emissive: 0xd97706, hex: '#f59e0b' },
  evidence: { main: 0x6366f1, emissive: 0x4f46e5, hex: '#6366f1' },
  action: { main: 0xa855f7, emissive: 0x9333ea, hex: '#a855f7' },
  proposal: { main: 0xec4899, emissive: 0xdb2777, hex: '#ec4899' },
};

function createTextSprite(text: string, subtitle: string, colorHex: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  // Background rounded pill
  ctx.fillStyle = 'rgba(11, 15, 23, 0.88)';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(10, 10, 492, 140, 24);
  ctx.fill();
  ctx.stroke();

  // Subtitle / metadata
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(subtitle.toUpperCase(), 256, 50);

  // Main text (truncate if needed)
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 28px sans-serif';
  const clean = text.length > 34 ? text.slice(0, 33) + '…' : text;
  ctx.fillText(clean, 256, 104);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.65, 0.20, 1);
  return sprite;
}

export const ArborXR: React.FC<ArborXRProps> = ({
  tree,
  ghostSprouts,
  slateCards,
  setSlateCards,
  selectedParentId,
  onSelectParent,
  onStageCard,
  onVote,
  currentSpeaker,
  setCurrentSpeaker,
  lastStateHash,
  lastRevision,
  onSeedDemo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vrButtonContainerRef = useRef<HTMLDivElement>(null);

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTexterialCardId, setActiveTexterialCardId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Drag state for Mouse / Touch Trial Mode gestures
  const [dragState, setDragState] = useState<{
    cardId: string;
    startX: number;
    startY: number;
    deltaX: number;
    deltaY: number;
    isDragging: boolean;
  } | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sproutMeshesRef = useRef<{ mesh: THREE.Object3D; id: string }[]>([]);
  const clickableObjects = useRef<{ mesh: THREE.Object3D; id: string; type: 'node' | 'sprout' | 'tile' }[]>([]);

  // XR Controller gesture refs
  const xrGrabStateRef = useRef<{
    controller0Grabbing: boolean;
    controller1Grabbing: boolean;
    grabbedTileId: string | null;
    initialDistance: number;
    gestureAction: 'stretch' | 'knead' | 'stage' | null;
  }>({
    controller0Grabbing: false,
    controller1Grabbing: false,
    grabbedTileId: null,
    initialDistance: 0,
    gestureAction: null,
  });

  // ── Texterial Actions: Stretch & Knead ───────────────────────────────────────
  const handleTexterial = useCallback(async (cardId: string, action: 'knead' | 'stretch') => {
    const card = slateCards.find((c) => c.id === cardId);
    if (!card) return;

    setActiveTexterialCardId(cardId);
    try {
      const resp = await transformCard(card.distilledText, action);
      setSlateCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, distilledText: resp.transformed } : c))
      );
    } catch (e) {
      console.error(`Texterial ${action} failed:`, e);
    } finally {
      setActiveTexterialCardId(null);
    }
  }, [slateCards, setSlateCards]);

  // ── Stage Card to Selected Parent on Arbor ──────────────────────────────────
  const handleStage = useCallback(async (card: SlateCard) => {
    try {
      await onStageCard(card, selectedParentId);
      setSlateCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isStaged: true } : c))
      );
    } catch (e) {
      console.error('Staging card failed:', e);
    }
  }, [onStageCard, selectedParentId, setSlateCards]);

  // ── Initialize Three.js Scene with WebXR ────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06080d);
    scene.fog = new THREE.Fog(0x06080d, 2.5, 8.0);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(0, 1.35, 0.70);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;

    // Attach WebXR VRButton to container
    if (vrButtonContainerRef.current) {
      vrButtonContainerRef.current.innerHTML = '';
      const vrBtn = VRButton.createButton(renderer);
      vrBtn.style.position = 'static';
      vrBtn.style.padding = '4px 10px';
      vrBtn.style.fontSize = '11px';
      vrBtn.style.fontWeight = 'bold';
      vrBtn.style.background = '#0284c7';
      vrBtn.style.color = '#ffffff';
      vrBtn.style.borderRadius = '8px';
      vrBtn.style.border = '1px solid #38bdf8';
      vrBtn.style.cursor = 'pointer';
      vrBtn.style.height = '28px';
      vrBtn.style.lineHeight = '20px';
      vrButtonContainerRef.current.appendChild(vrBtn);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.95, -1.05);
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 0.35;
    controls.maxDistance = 4.5;
    controls.update();

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(2, 4, 1.5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const centerPoint = new THREE.PointLight(0x38bdf8, 2.2, 5);
    centerPoint.position.set(0, 1.8, -1.05);
    scene.add(centerPoint);

    // Roundtable virtual workspace
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, -1.05);

    const tableGeom = new THREE.CylinderGeometry(1.25, 1.25, 0.04, 48);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      roughness: 0.35,
      metalness: 0.25,
    });
    const tableMesh = new THREE.Mesh(tableGeom, tableMat);
    tableMesh.position.y = 0.72;
    tableGroup.add(tableMesh);

    // Glowing concentric compass rings on tabletop
    for (let r = 0.35; r <= 1.15; r += 0.25) {
      const ringGeom = new THREE.RingGeometry(r - 0.003, r + 0.003, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.742;
      tableGroup.add(ringMesh);
    }

    // Floor grid
    const grid = new THREE.GridHelper(10, 20, 0x1e293b, 0x0f172a);
    grid.position.y = 0.01;
    scene.add(grid);
    scene.add(tableGroup);

    // ── Setup WebXR Controllers & Ray Laser Pointers ──────────────────────────
    const controller0 = renderer.xr.getController(0);
    const controller1 = renderer.xr.getController(1);
    scene.add(controller0);
    scene.add(controller1);

    const rayGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -2.5),
    ]);
    const rayMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    controller0.add(new THREE.Line(rayGeom, rayMat));
    controller1.add(new THREE.Line(rayGeom, rayMat.clone()));

    // XR Squeeze / Select Event Listeners for Two-Handed Gestures
    const onSelectStart0 = () => {
      xrGrabStateRef.current.controller0Grabbing = true;
      checkXRGrab();
    };
    const onSelectEnd0 = () => {
      xrGrabStateRef.current.controller0Grabbing = false;
      finishXRGesture();
    };
    const onSelectStart1 = () => {
      xrGrabStateRef.current.controller1Grabbing = true;
      checkXRGrab();
    };
    const onSelectEnd1 = () => {
      xrGrabStateRef.current.controller1Grabbing = false;
      finishXRGesture();
    };

    function checkXRGrab() {
      const state = xrGrabStateRef.current;
      if (state.controller0Grabbing && state.controller1Grabbing) {
        // Both hands active: compute initial distance
        const p0 = new THREE.Vector3();
        const p1 = new THREE.Vector3();
        controller0.getWorldPosition(p0);
        controller1.getWorldPosition(p1);
        state.initialDistance = p0.distanceTo(p1);
      }
    }

    function finishXRGesture() {
      const state = xrGrabStateRef.current;
      if (state.gestureAction && slateCards.length > 0) {
        const targetCard = slateCards[0];
        if (state.gestureAction === 'stretch') {
          handleTexterial(targetCard.id, 'stretch');
        } else if (state.gestureAction === 'knead') {
          handleTexterial(targetCard.id, 'knead');
        }
      }
      state.gestureAction = null;
      state.initialDistance = 0;
    }

    controller0.addEventListener('selectstart', onSelectStart0);
    controller0.addEventListener('selectend', onSelectEnd0);
    controller1.addEventListener('selectstart', onSelectStart1);
    controller1.addEventListener('selectend', onSelectEnd1);

    // ── Animation Loop supporting WebXR ───────────────────────────────────────
    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      controls.update();

      const elapsed = clock.getElapsedTime();

      // Gentle floating animation on Ghost Sprouts wireframe
      sproutMeshesRef.current.forEach(({ mesh, id }) => {
        mesh.rotation.y = elapsed * 0.75;
        mesh.position.y += Math.sin(elapsed * 2.5 + parseFloat(id.replace(/\D/g, '') || '1')) * 0.0003;
      });

      // Dual-hand WebXR gesture detection
      if (renderer.xr.isPresenting) {
        const state = xrGrabStateRef.current;
        if (state.controller0Grabbing && state.controller1Grabbing && state.initialDistance > 0) {
          const p0 = new THREE.Vector3();
          const p1 = new THREE.Vector3();
          controller0.getWorldPosition(p0);
          controller1.getWorldPosition(p1);
          const currentDist = p0.distanceTo(p1);
          const ratio = currentDist / state.initialDistance;

          if (ratio > 1.25) {
            state.gestureAction = 'stretch';
          } else if (ratio < 0.75) {
            state.gestureAction = 'knead';
          }
        }
      }

      renderer.render(scene, camera);
    });

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Pointer Raycasting for Node & Sprout Click Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = clickableObjects.current.map((item) => item.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest, true);

      if (intersects.length > 0) {
        let hit = intersects[0].object;
        while (hit.parent && !clickableObjects.current.some((c) => c.mesh === hit)) {
          hit = hit.parent;
        }
        const found = clickableObjects.current.find((item) => item.mesh === hit);
        if (found) {
          if (found.type === 'node') {
            onSelectParent(found.id);
          } else if (found.type === 'sprout') {
            onVote(found.id, currentSpeaker);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      controller0.removeEventListener('selectstart', onSelectStart0);
      controller0.removeEventListener('selectend', onSelectEnd0);
      controller1.removeEventListener('selectstart', onSelectStart1);
      controller1.removeEventListener('selectend', onSelectEnd1);
      renderer.dispose();
    };
  }, []);

  // ── Rebuild Dynamic 3D Tree & Ghost Sprouts on Prop Updates ────────────────
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing tree group
    const existingGroup = scene.getObjectByName('DynamicArborGroup');
    if (existingGroup) scene.remove(existingGroup);

    clickableObjects.current = [];
    sproutMeshesRef.current = [];

    const arborGroup = new THREE.Group();
    arborGroup.name = 'DynamicArborGroup';

    if (!tree || !tree.nodes) return;

    const rootId = tree.root_id || Object.keys(tree.nodes).find((id) => !tree.nodes[id].parent_id) || '';
    if (!rootId || !tree.nodes[rootId]) return;

    // Calculate radial tree positions
    const nodePositions = new Map<string, THREE.Vector3>();
    const levelHeight = 0.28;
    const tableCenterY = 0.85;
    const tableCenterZ = -1.05;

    function traverseTree(id: string, depth: number, aStart: number, aEnd: number) {
      const node = tree!.nodes[id];
      if (!node) return;

      const angle = (aStart + aEnd) / 2;
      const radius = depth === 0 ? 0 : 0.32 + depth * 0.20;
      const pos = new THREE.Vector3(
        Math.sin(angle) * radius,
        tableCenterY + depth * levelHeight,
        tableCenterZ + Math.cos(angle) * radius * 0.85
      );
      nodePositions.set(id, pos);

      const children = node.children_ids?.filter((cid) => tree!.nodes[cid]) || [];
      if (children.length > 0) {
        const step = (aEnd - aStart) / children.length;
        children.forEach((cid, i) => {
          traverseTree(cid, depth + 1, aStart + i * step, aStart + (i + 1) * step);
        });
      }
    }

    traverseTree(rootId, 0, -Math.PI * 0.85, Math.PI * 0.85);

    // Spawn 3D Nodes & Connectors
    nodePositions.forEach((pos, id) => {
      const node = tree.nodes[id];
      const isSelected = id === selectedParentId;
      const colors = NODE_COLORS[node.node_type] || NODE_COLORS.claim;

      // 3D Sphere Node
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const geom = new THREE.SphereGeometry(isSelected ? 0.075 : 0.055, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: colors.main,
        emissive: colors.emissive,
        emissiveIntensity: isSelected ? 0.85 : 0.3,
        roughness: 0.25,
        metalness: 0.15,
      });
      const mesh = new THREE.Mesh(geom, mat);
      nodeGroup.add(mesh);

      // Text Sprite Label
      const sprite = createTextSprite(node.text, `${node.author} • ${node.node_type}`, colors.hex);
      sprite.position.set(0, 0.13, 0);
      nodeGroup.add(sprite);

      arborGroup.add(nodeGroup);
      clickableObjects.current.push({ mesh: nodeGroup, id, type: 'node' });

      // Curved Bezier Branch Connector to Parent
      if (node.parent_id && nodePositions.has(node.parent_id)) {
        const parentPos = nodePositions.get(node.parent_id)!;
        const mid = new THREE.Vector3().addVectors(parentPos, pos).multiplyScalar(0.5);
        mid.y += 0.06;

        const curve = new THREE.QuadraticBezierCurve3(parentPos, mid, pos);
        const points = curve.getPoints(16);
        const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.75,
        });
        const line = new THREE.Line(lineGeom, lineMat);
        arborGroup.add(line);
      }
    });

    // Spawn 3D Ghost Sprouts (Pending Proposals)
    ghostSprouts.forEach((sprout) => {
      const parentPos = nodePositions.get(sprout.parent_id) || nodePositions.get(rootId);
      if (!parentPos) return;

      const sproutPos = new THREE.Vector3(parentPos.x + 0.20, parentPos.y + 0.14, parentPos.z + 0.08);

      const sproutGroup = new THREE.Group();
      sproutGroup.position.copy(sproutPos);

      // Wireframe diamond
      const octGeom = new THREE.OctahedronGeometry(0.065, 0);
      const octMat = new THREE.MeshStandardMaterial({
        color: sprout.has_conflict ? 0xf87171 : 0x38bdf8,
        emissive: sprout.has_conflict ? 0xef4444 : 0x0284c7,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.8,
        wireframe: true,
      });
      const octMesh = new THREE.Mesh(octGeom, octMat);
      sproutGroup.add(octMesh);
      sproutMeshesRef.current.push({ mesh: octMesh, id: sprout.proposal_id });

      // Sprout label
      const votesCount = sprout.votes?.length || 0;
      const reqVotes = sprout.requiredVotes || 3;
      const subtitle = `[VOTE ${votesCount}/${reqVotes}] by ${sprout.author}`;
      const sprite = createTextSprite(sprout.text, subtitle, sprout.has_conflict ? '#ef4444' : '#38bdf8');
      sprite.position.set(0, 0.15, 0);
      sproutGroup.add(sprite);

      arborGroup.add(sproutGroup);
      clickableObjects.current.push({ mesh: sproutGroup, id: sprout.proposal_id, type: 'sprout' });

      // Dashed connector line to parent
      const lineGeom = new THREE.BufferGeometry().setFromPoints([parentPos, sproutPos]);
      const lineMat = new THREE.LineDashedMaterial({
        color: sprout.has_conflict ? 0xef4444 : 0x38bdf8,
        dashSize: 0.03,
        gapSize: 0.02,
      });
      const line = new THREE.Line(lineGeom, lineMat);
      line.computeLineDistances();
      arborGroup.add(line);
    });

    scene.add(arborGroup);
  }, [tree, ghostSprouts, selectedParentId]);

  // ── Speech / Text Input Handler (Guaranteed Materialization) ────────────────
  const toggleRecording = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Web Speech API is not supported in this browser. Please type text instead.');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      await handleIngest(transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleIngest = async (textToIngest?: string) => {
    const text = (textToIngest || inputText).trim();
    if (!text || isProcessing) return;

    setIsProcessing(true);
    try {
      const resp = await ingestSpeech(currentSpeaker, text);
      const distilled = (resp as any).card?.distilled_text || (resp as any).distilledText || text;
      const intent = (resp as any).card?.intent || (resp as any).intent || 'claim';
      const newCard: SlateCard = {
        id: (resp as any).card_id || `card_${Date.now()}`,
        speaker: resp.speaker || currentSpeaker,
        rawText: text,
        distilledText: distilled,
        intent: intent,
        extractedQuery: (resp as any).extracted_query || (resp as any).card?.extracted_query || text,
        createdAt: Date.now(),
        isStaged: false,
      };
      setSlateCards((prev) => [newCard, ...prev.filter((c) => c.id !== newCard.id)]);
      if (!textToIngest) setInputText('');
    } catch (e) {
      console.error('Ingest speech failed, falling back locally:', e);
      // Guarantee card materializes
      const fallbackCard: SlateCard = {
        id: `card_${Date.now()}`,
        speaker: currentSpeaker,
        rawText: text,
        distilledText: text,
        intent: 'claim',
        extractedQuery: text,
        createdAt: Date.now(),
        isStaged: false,
      };
      setSlateCards((prev) => [fallbackCard, ...prev.filter((c) => c.id !== fallbackCard.id)]);
      if (!textToIngest) setInputText('');
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Populate Scenario Action ───────────────────────────────────────────────
  const handlePopulateScenario = async () => {
    if (isSeeding) return;
    setIsSeeding(true);
    try {
      if (onSeedDemo) {
        await onSeedDemo();
      }
    } catch (e) {
      console.error('Seeding scenario error:', e);
    } finally {
      setIsSeeding(false);
    }
  };

  // ── Mouse Pointer Drag Handlers (Trial Mode Gesture Engine) ─────────────────
  const handlePointerDownCard = (e: React.PointerEvent, cardId: string) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragState({
      cardId,
      startX: e.clientX,
      startY: e.clientY,
      deltaX: 0,
      deltaY: 0,
      isDragging: true,
    });
  };

  const handlePointerMoveCard = (e: React.PointerEvent) => {
    if (!dragState || !dragState.isDragging) return;
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    setDragState((prev) => (prev ? { ...prev, deltaX, deltaY } : null));
  };

  const handlePointerUpCard = (e: React.PointerEvent, card: SlateCard) => {
    if (!dragState || !dragState.isDragging) return;
    const { deltaX, deltaY } = dragState;
    setDragState(null);

    // Gesture Triggers
    if (deltaX >= 65) {
      // Pulled right: Elastic Stretch (Elaborate)
      handleTexterial(card.id, 'stretch');
    } else if (deltaX <= -65) {
      // Pushed left: Palmar Knead (Condense)
      handleTexterial(card.id, 'knead');
    } else if (deltaY <= -55 && Math.abs(deltaX) < 45) {
      // Flicked up: Stage card onto selected branch
      handleStage(card);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#06080d] overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* ── Top HUD: Merkle Provenance & Context ──────────────────────────── */}
      <header className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none flex-wrap gap-2">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">BetterMeets XR • Spatial Arbor</span>
          <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
            rev {lastRevision}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Hash: {lastStateHash ? lastStateHash.slice(0, 10) : 'genesis'}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Seed Demo Scenario Button */}
          <button
            onClick={handlePopulateScenario}
            disabled={isSeeding}
            className="bg-amber-600/90 hover:bg-amber-500 disabled:opacity-50 text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-amber-400/40 shadow transition cursor-pointer"
            title="Populate complete Smart City Disaster scenario with 11 nodes, 3 ghost sprouts & 5 cards"
          >
            <Zap className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : 'text-amber-200'}`} />
            {isSeeding ? 'Populating...' : '⚡ Populate Scenario'}
          </button>

          {/* WebXR VR Button Container */}
          <div ref={vrButtonContainerRef} className="flex items-center" />

          {/* Speaker Selector */}
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-[11px] text-slate-400">Speaker:</span>
            <select
              value={currentSpeaker}
              onChange={(e) => setCurrentSpeaker(e.target.value)}
              className="bg-slate-800 text-xs text-white border border-slate-600 rounded px-1.5 py-0.5 outline-none cursor-pointer"
            >
              {['You', 'Alice', 'Bob', 'Charlie'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Target Branch Badge */}
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 text-xs text-slate-300">
            <span className="text-slate-400 mr-1">Target:</span>
            <span className="font-mono text-cyan-300 font-bold">{selectedParentId}</span>
          </div>
        </div>
      </header>

      {/* ── Gesture Guidance Ribbon ────────────────────────────────────────── */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-800 text-[10px] text-slate-400">
        <span className="flex items-center gap-1 text-cyan-300">
          <ChevronRight className="w-3 h-3" /> Drag Right to <strong>Stretch</strong> (Elaborate)
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-amber-300">
          <ChevronLeft className="w-3 h-3" /> Drag Left to <strong>Knead</strong> (Condense)
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-emerald-300">
          <ChevronUp className="w-3 h-3" /> Drag Up to <strong>Stage</strong> onto Tree
        </span>
      </div>

      {/* ── Near-Field Tangible Slate (Bottom Console) ────────────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Tangible Slate (Graspable Text Tiles)
            </h2>
            <span className="text-[10px] text-slate-400">
              In VR: Pinch & pull/squeeze with two hands • In Trial Mode: Mouse drag left / right / up
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              {isRecording ? 'Listening...' : 'Speak'}
            </button>
          </div>
        </div>

        {/* Ingestion Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleIngest();
            }}
            placeholder={`Speak or type an idea as ${currentSpeaker}...`}
            className="flex-1 bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleIngest()}
            disabled={isProcessing || !inputText.trim()}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Ingest
          </button>
        </div>

        {/* Carousel of Tangible Elastic Tiles */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 custom-scrollbar max-h-40 min-h-[110px]">
          {slateCards.length === 0 ? (
            <div className="w-full text-center py-4 text-xs text-slate-500">
              No tiles on your slate. Click <strong className="text-amber-400">"⚡ Populate Scenario"</strong> above or type an idea to materialize graspable tiles.
            </div>
          ) : (
            slateCards.map((card) => {
              const colors = NODE_COLORS[card.intent] || NODE_COLORS.claim;
              const isTransforming = activeTexterialCardId === card.id;

              const isThisCardDragged = dragState?.cardId === card.id && dragState.isDragging;
              const deltaX = isThisCardDragged ? dragState.deltaX : 0;
              const deltaY = isThisCardDragged ? dragState.deltaY : 0;

              let scaleX = 1;
              let scaleY = 1;
              let translateY = 0;
              let glowColor = '';
              let gestureBadge = '';

              if (isThisCardDragged) {
                if (deltaY < -30 && Math.abs(deltaX) < 40) {
                  // Flicking upward to Stage
                  translateY = Math.max(deltaY, -80);
                  glowColor = '#10b981';
                  gestureBadge = deltaY <= -55 ? `🚀 RELEASE TO STAGE ONTO [${selectedParentId}]` : '↑ FLICK UP TO STAGE';
                } else if (deltaX > 0) {
                  // Stretching Right (Elaborate)
                  const progress = Math.min(deltaX / 65, 1);
                  scaleX = 1 + progress * 0.40;
                  scaleY = 1 - progress * 0.10;
                  glowColor = '#06b6d4';
                  gestureBadge = deltaX >= 65 ? '⚡ RELEASE TO STRETCH (AI Elaborate)' : `↔ PULL TO STRETCH (${Math.round(progress * 100)}%)`;
                } else if (deltaX < 0) {
                  // Kneading Left (Condense)
                  const progress = Math.min(Math.abs(deltaX) / 65, 1);
                  scaleX = Math.max(1 - progress * 0.38, 0.58);
                  scaleY = 1 + progress * 0.30; // Poisson bulge
                  glowColor = '#f59e0b';
                  gestureBadge = Math.abs(deltaX) >= 65 ? '🔥 RELEASE TO KNEAD (AI Condense)' : `>< SQUEEZE TO KNEAD (${Math.round(progress * 100)}%)`;
                }
              }

              return (
                <div
                  key={card.id}
                  onPointerDown={(e) => handlePointerDownCard(e, card.id)}
                  onPointerMove={handlePointerMoveCard}
                  onPointerUp={(e) => handlePointerUpCard(e, card)}
                  style={{
                    transform: `translate(0px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
                    borderLeftColor: colors.hex,
                    borderLeftWidth: '3px',
                    borderColor: glowColor || undefined,
                    boxShadow: glowColor ? `0 0 20px ${glowColor}66, inset 0 0 10px ${glowColor}33` : undefined,
                    transition: isThisCardDragged ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease',
                    cursor: isThisCardDragged ? 'grabbing' : 'grab',
                    touchAction: 'none',
                  }}
                  className="flex-shrink-0 w-72 bg-slate-950/95 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between shadow-md relative group select-none"
                >
                  {/* Floating Gesture Strain/Pressure Badge */}
                  {gestureBadge && (
                    <div
                      style={{ backgroundColor: glowColor ? `${glowColor}ee` : '#0284c7' }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white shadow-lg pointer-events-none whitespace-nowrap animate-pulse z-30"
                    >
                      {gestureBadge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="font-semibold text-slate-300">{card.speaker}</span>
                      <span className="uppercase text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                        {card.intent}
                      </span>
                    </div>
                    <p
                      className={`text-xs text-slate-200 line-clamp-3 leading-snug ${
                        isTransforming ? 'opacity-40 animate-pulse' : ''
                      }`}
                    >
                      {card.distilledText}
                    </p>
                  </div>

                  {/* Ergonomic Tangible Grips & Gestures Guidance */}
                  <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-slate-800/80 text-[9px] text-slate-400">
                    {/* Left Knead Handle */}
                    <div
                      onClick={(e) => { e.stopPropagation(); handleTexterial(card.id, 'knead'); }}
                      className="flex items-center gap-0.5 text-amber-400 hover:text-amber-300 cursor-pointer px-1 py-0.5 rounded hover:bg-slate-800"
                      title="Palmar Squash / Knead: Drag left or click to condense"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      <span>Knead</span>
                    </div>

                    {/* Stage Handle */}
                    <div
                      onClick={(e) => { e.stopPropagation(); handleStage(card); }}
                      className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded cursor-pointer ${
                        card.isStaged
                          ? 'text-slate-500'
                          : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-800'
                      }`}
                      title="Flick up or click to stage onto tree"
                    >
                      {card.isStaged ? <Check className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                      <span>{card.isStaged ? 'Staged' : 'Stage'}</span>
                    </div>

                    {/* Right Stretch Handle */}
                    <div
                      onClick={(e) => { e.stopPropagation(); handleTexterial(card.id, 'stretch'); }}
                      className="flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 cursor-pointer px-1 py-0.5 rounded hover:bg-slate-800"
                      title="Elastic Stretch: Drag right or click to elaborate"
                    >
                      <span>Stretch</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
'''

dest_path = os.path.join("better-google-meets", "frontend", "src", "components", "ArborXR.tsx")
with open(dest_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(code)
print("Successfully generated updated ArborXR.tsx")
