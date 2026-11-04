import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { TreeSnapshot, GhostSprout, SlateCard, NodeType, IdeaNode } from '../types/tree';
import { transformCard, ingestSpeech } from '../services/api';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Zap,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  X,
  Info,
  GitPullRequest,
  Hash,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  AlertTriangle,
  ShieldCheck,
  CornerDownRight,
  Layers,
  MousePointer
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

  ctx.fillStyle = 'rgba(11, 15, 23, 0.92)';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(10, 10, 492, 140, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(subtitle.toUpperCase(), 256, 50);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 26px sans-serif';
  const clean = text.length > 34 ? text.slice(0, 33) + '…' : text;
  ctx.fillText(clean, 256, 104);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.68, 0.21, 1);
  return sprite;
}

function createTableTileTexture(card: SlateCard, colorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#0a0e17';
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.roundRect(8, 8, 496, 304, 26);
  ctx.fill();
  ctx.stroke();

  // Top header: Speaker and Intent tag
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(card.speaker.toUpperCase(), 32, 50);

  ctx.fillStyle = colorHex;
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`[${card.intent.toUpperCase()}]`, 480, 50);
  ctx.textAlign = 'left';

  // Divider line
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, 68);
  ctx.lineTo(488, 68);
  ctx.stroke();

  // Main text wrapping (up to 4 lines)
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 24px sans-serif';
  const words = card.distilledText.split(' ');
  let line = '';
  let y = 108;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 440 && n > 0) {
      ctx.fillText(line, 32, y);
      line = words[n] + ' ';
      y += 34;
      if (y > 215) {
        line += '...';
        break;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 32, y);

  // Bottom Gesture Guidance Bar
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('◂ Drag Left: Knead', 32, 288);

  ctx.fillStyle = '#06b6d4';
  ctx.textAlign = 'right';
  ctx.fillText('Drag Right: Stretch ▸', 480, 288);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
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
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Inspector selection item
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    type: 'node' | 'sprout' | 'tile';
  }>({
    id: selectedParentId || 'node_0000',
    type: 'node',
  });

  // Mutable refs to prevent scene re-creation on state changes
  const slateCardsRef = useRef(slateCards);
  slateCardsRef.current = slateCards;

  const treeRef = useRef(tree);
  treeRef.current = tree;

  const ghostSproutsRef = useRef(ghostSprouts);
  ghostSproutsRef.current = ghostSprouts;

  const selectedParentIdRef = useRef(selectedParentId);
  selectedParentIdRef.current = selectedParentId;

  // 3D Scene Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const sproutMeshesRef = useRef<{ mesh: THREE.Object3D; id: string }[]>([]);

  // Pickable Target Meshes: Map mesh.id -> { id, type }
  const pickableTargetsMap = useRef<Map<number, { id: string; type: 'node' | 'sprout' | 'tile'; mesh: THREE.Mesh }>>(new Map());
  const pickableMeshesList = useRef<THREE.Mesh[]>([]);
  const tableTileGroupsRef = useRef<Map<string, { group: THREE.Group; mesh: THREE.Mesh; initialPos: THREE.Vector3 }>>(new Map());

  // Drag interaction state in 3D
  const drag3DRef = useRef<{
    isArmed: boolean;
    isDragging: boolean;
    cardId: string | null;
    downClientX: number;
    downClientY: number;
    deltaX: number;
    deltaY: number;
    group: THREE.Group | null;
    mesh: THREE.Mesh | null;
    initialPos: THREE.Vector3;
  }>({
    isArmed: false,
    isDragging: false,
    cardId: null,
    downClientX: 0,
    downClientY: 0,
    deltaX: 0,
    deltaY: 0,
    group: null,
    mesh: null,
    initialPos: new THREE.Vector3(),
  });

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

  // Synchronize inspector selection when selectedParentId changes from external props
  useEffect(() => {
    if (selectedParentId && tree?.nodes?.[selectedParentId]) {
      setSelectedItem({ id: selectedParentId, type: 'node' });
    }
  }, [selectedParentId, tree]);

  // ── Texterial Actions: Stretch & Knead ───────────────────────────────────────
  const handleTexterial = useCallback(async (cardId: string, action: 'knead' | 'stretch') => {
    const card = slateCardsRef.current.find((c) => c.id === cardId);
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
  }, [setSlateCards]);

  // ── Stage Card to Selected Parent on Arbor ──────────────────────────────────
  const handleStage = useCallback(async (card: SlateCard) => {
    try {
      await onStageCard(card, selectedParentIdRef.current);
      setSlateCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isStaged: true } : c))
      );
    } catch (e) {
      console.error('Staging card failed:', e);
    }
  }, [onStageCard, setSlateCards]);

  const handleTexterialRef = useRef(handleTexterial);
  handleTexterialRef.current = handleTexterial;

  const handleStageRef = useRef(handleStage);
  handleStageRef.current = handleStage;

  const onSelectParentRef = useRef(onSelectParent);
  onSelectParentRef.current = onSelectParent;

  const onVoteRef = useRef(onVote);
  onVoteRef.current = onVote;

  // ── ONE-TIME Initialize Three.js Scene, Camera, WebXR & Animation Loop ─────
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06080d);
    scene.fog = new THREE.Fog(0x06080d, 3.2, 10.0);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 50);
    camera.position.set(0, 1.45, 0.95);
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

    // Attach WebXR VRButton
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
    controlsRef.current = controls;
    controls.target.set(0, 1.15, -1.05);
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.minDistance = 0.40;
    controls.maxDistance = 5.2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.update();

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.90);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.35);
    dirLight.position.set(2.5, 4.5, 1.8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const centerPoint = new THREE.PointLight(0x38bdf8, 2.5, 6);
    centerPoint.position.set(0, 2.0, -1.05);
    scene.add(centerPoint);

    // Roundtable virtual workspace
    const tableGroup = new THREE.Group();
    tableGroup.position.set(0, 0, -1.05);

    const tableGeom = new THREE.CylinderGeometry(1.35, 1.35, 0.04, 48);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x121620,
      roughness: 0.35,
      metalness: 0.25,
    });
    const tableMesh = new THREE.Mesh(tableGeom, tableMat);
    tableMesh.position.y = 0.72;
    tableGroup.add(tableMesh);

    // Glowing concentric compass rings on tabletop
    for (let r = 0.40; r <= 1.25; r += 0.28) {
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

    // ── Setup WebXR Controllers & Rays ────────────────────────────────────────
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

    // XR Listeners
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
        const p0 = new THREE.Vector3();
        const p1 = new THREE.Vector3();
        controller0.getWorldPosition(p0);
        controller1.getWorldPosition(p1);
        state.initialDistance = p0.distanceTo(p1);
      }
    }

    function finishXRGesture() {
      const state = xrGrabStateRef.current;
      if (state.gestureAction && slateCardsRef.current.length > 0) {
        const targetCard = slateCardsRef.current[0];
        if (state.gestureAction === 'stretch') {
          handleTexterialRef.current(targetCard.id, 'stretch');
        } else if (state.gestureAction === 'knead') {
          handleTexterialRef.current(targetCard.id, 'knead');
        }
      }
      state.gestureAction = null;
      state.initialDistance = 0;
    }

    controller0.addEventListener('selectstart', onSelectStart0);
    controller0.addEventListener('selectend', onSelectEnd0);
    controller1.addEventListener('selectstart', onSelectStart1);
    controller1.addEventListener('selectend', onSelectEnd1);

    // ── Animation Loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      controls.update();

      const elapsed = clock.getElapsedTime();

      // Gentle floating animation on Ghost Sprouts wireframe
      sproutMeshesRef.current.forEach(({ mesh, id }) => {
        mesh.rotation.y = elapsed * 0.75;
        mesh.position.y += Math.sin(elapsed * 2.5 + parseFloat(id.replace(/\D/g, '') || '1')) * 0.0003;
      });

      // Gentle floating hover on elevated 3D table cards (so they stay floating above table)
      tableTileGroupsRef.current.forEach(({ group, initialPos }, id) => {
        const drag = drag3DRef.current;
        if (!drag.isDragging || drag.cardId !== id) {
          const idx = id.charCodeAt(id.length - 1) || 1;
          group.position.y = initialPos.y + Math.sin(elapsed * 2.0 + idx) * 0.006;
        }
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

    // ── Robust Raycasting Selection & Non-Glitchy Dragging ─────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pickableMeshesList.current, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const target = pickableTargetsMap.current.get(hitMesh.id);

        if (target) {
          if (target.type === 'tile') {
            // Arm for potential 3D table tile drag or click
            const tileInfo = tableTileGroupsRef.current.get(target.id);
            if (tileInfo) {
              drag3DRef.current = {
                isArmed: true,
                isDragging: false,
                cardId: target.id,
                downClientX: event.clientX,
                downClientY: event.clientY,
                deltaX: 0,
                deltaY: 0,
                group: tileInfo.group,
                mesh: tileInfo.mesh,
                initialPos: tileInfo.initialPos.clone(),
              };
            }
          } else if (target.type === 'node') {
            onSelectParentRef.current(target.id);
            setSelectedItem({ id: target.id, type: 'node' });
            setIsInspectorOpen(true);
          } else if (target.type === 'sprout') {
            setSelectedItem({ id: target.id, type: 'sprout' });
            setIsInspectorOpen(true);
          }
        }
      }
    };

    const handlePointerMove = (event: MouseEvent) => {
      const drag = drag3DRef.current;
      if (!drag.isArmed || !drag.mesh || !drag.group) return;

      const dX = event.clientX - drag.downClientX;
      const dY = event.clientY - drag.downClientY;
      const dist = Math.hypot(dX, dY);

      // Deadzone check: only initiate physical drag if user moved past 6px
      if (!drag.isDragging) {
        if (dist >= 6) {
          drag.isDragging = true;
          controls.enabled = false; // Disable camera orbit only during intentional drag
        } else {
          return;
        }
      }

      drag.deltaX = dX;
      drag.deltaY = dY;

      if (dY < -25 && Math.abs(dX) < 40) {
        // Flick up towards tree
        drag.group.position.y = drag.initialPos.y + Math.min(Math.abs(dY) * 0.003, 0.45);
        (drag.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x10b981);
        (drag.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
      } else if (dX > 0) {
        // Stretch Right
        const progress = Math.min(dX / 70, 1);
        drag.mesh.scale.x = 1 + progress * 0.48;
        drag.mesh.scale.y = 1 - progress * 0.12;
        (drag.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x06b6d4);
        (drag.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
      } else if (dX < 0) {
        // Knead Left (Poisson bulge)
        const progress = Math.min(Math.abs(dX) / 70, 1);
        drag.mesh.scale.x = Math.max(1 - progress * 0.42, 0.58);
        drag.mesh.scale.y = 1 + progress * 0.32;
        (drag.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xf59e0b);
        (drag.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
      }
    };

    const handlePointerUp = (event: MouseEvent) => {
      const drag = drag3DRef.current;
      if (!drag.isArmed) return;

      const cardId = drag.cardId;
      const wasDragging = drag.isDragging;
      const dX = drag.deltaX;
      const dY = drag.deltaY;

      // Reset dragging state
      drag.isArmed = false;
      drag.isDragging = false;
      drag.cardId = null;

      // Re-enable controls
      controls.enabled = true;

      if (drag.mesh) {
        drag.mesh.scale.set(1, 1, 1);
        (drag.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.25;
      }
      if (drag.group) {
        drag.group.position.copy(drag.initialPos);
      }

      if (wasDragging && cardId) {
        // Was an intentional drag gesture
        const card = slateCardsRef.current.find((c) => c.id === cardId);
        if (dX >= 55) {
          handleTexterialRef.current(cardId, 'stretch');
        } else if (dX <= -55) {
          handleTexterialRef.current(cardId, 'knead');
        } else if (dY <= -40 && Math.abs(dX) < 40 && card) {
          handleStageRef.current(card);
        }
      } else if (cardId) {
        // Was a clean click on a 3D table tile
        setSelectedItem({ id: cardId, type: 'tile' });
        setIsInspectorOpen(true);
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      controller0.removeEventListener('selectstart', onSelectStart0);
      controller0.removeEventListener('selectend', onSelectEnd0);
      controller1.removeEventListener('selectstart', onSelectStart1);
      controller1.removeEventListener('selectend', onSelectEnd1);
      renderer.dispose();
    };
  }, []); // Run ONCE on mount

  // ── Rebuild Dynamic 3D Tree, Ghost Sprouts & Well-Spaced 3D Table Tiles ───
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Remove existing tree & table tiles group
    const existingGroup = scene.getObjectByName('DynamicArborGroup');
    if (existingGroup) scene.remove(existingGroup);

    pickableTargetsMap.current.clear();
    pickableMeshesList.current = [];
    sproutMeshesRef.current = [];
    tableTileGroupsRef.current.clear();

    const arborGroup = new THREE.Group();
    arborGroup.name = 'DynamicArborGroup';

    if (!tree || !tree.nodes) return;

    const rootId = tree.root_id || Object.keys(tree.nodes).find((id) => !tree.nodes[id].parent_id) || '';
    if (!rootId || !tree.nodes[rootId]) return;

    // ── Well-Spaced Radial Tree Coordinates ───────────────────────────────────
    const nodePositions = new Map<string, THREE.Vector3>();
    const levelHeight = 0.40; // 40cm vertical clearance per tier
    const tableCenterY = 0.92;
    const tableCenterZ = -1.05;

    function traverseTree(id: string, depth: number, aStart: number, aEnd: number) {
      const node = tree!.nodes[id];
      if (!node) return;

      const angle = (aStart + aEnd) / 2;
      // Generous radial expansion per depth (0.58m to 1.25m)
      const radius = depth === 0 ? 0 : 0.58 + depth * 0.34;
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

    traverseTree(rootId, 0, -Math.PI * 0.78, Math.PI * 0.78);

    // ── Spawn Well-Spaced 3D Nodes & Curved Connectors ────────────────────────
    nodePositions.forEach((pos, id) => {
      const node = tree.nodes[id];
      const isSelected = id === selectedParentId;
      const colors = NODE_COLORS[node.node_type] || NODE_COLORS.claim;

      // 3D Sphere Node
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(pos);

      const geom = new THREE.SphereGeometry(isSelected ? 0.08 : 0.06, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: colors.main,
        emissive: colors.emissive,
        emissiveIntensity: isSelected ? 0.95 : 0.35,
        roughness: 0.25,
        metalness: 0.15,
      });
      const mesh = new THREE.Mesh(geom, mat);
      nodeGroup.add(mesh);

      // Register picking target on the sphere mesh directly
      pickableTargetsMap.current.set(mesh.id, { id, type: 'node', mesh });
      pickableMeshesList.current.push(mesh);

      // Text Sprite Label
      const sprite = createTextSprite(node.text, `${node.author} • ${node.node_type}`, colors.hex);
      sprite.position.set(0, 0.14, 0);
      nodeGroup.add(sprite);

      arborGroup.add(nodeGroup);

      // Curved Bezier Branch Connector to Parent
      if (node.parent_id && nodePositions.has(node.parent_id)) {
        const parentPos = nodePositions.get(node.parent_id)!;
        const mid = new THREE.Vector3().addVectors(parentPos, pos).multiplyScalar(0.5);
        mid.y += 0.09;

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

    // ── Spawn Well-Spaced 3D Ghost Sprouts (Pending Proposals) ────────────────
    ghostSprouts.forEach((sprout) => {
      const parentPos = nodePositions.get(sprout.parent_id) || nodePositions.get(rootId);
      if (!parentPos) return;

      // Compute radial outward offset from table center
      const distToCenter = Math.hypot(parentPos.x, parentPos.z - tableCenterZ) || 1;
      const dirX = parentPos.x / distToCenter;
      const dirZ = (parentPos.z - tableCenterZ) / distToCenter;

      // Place 35cm outward and 18cm elevated from parent node (zero overlap!)
      const sproutPos = new THREE.Vector3(
        parentPos.x + dirX * 0.35,
        parentPos.y + 0.18,
        parentPos.z + dirZ * 0.35
      );

      const sproutGroup = new THREE.Group();
      sproutGroup.position.copy(sproutPos);

      // Wireframe diamond
      const octGeom = new THREE.OctahedronGeometry(0.075, 0);
      const octMat = new THREE.MeshStandardMaterial({
        color: sprout.has_conflict ? 0xf87171 : 0x38bdf8,
        emissive: sprout.has_conflict ? 0xef4444 : 0x0284c7,
        emissiveIntensity: 0.75,
        transparent: true,
        opacity: 0.85,
        wireframe: true,
      });
      const octMesh = new THREE.Mesh(octGeom, octMat);
      sproutGroup.add(octMesh);
      sproutMeshesRef.current.push({ mesh: octMesh, id: sprout.proposal_id });

      // Register picking target on octMesh
      pickableTargetsMap.current.set(octMesh.id, { id: sprout.proposal_id, type: 'sprout', mesh: octMesh });
      pickableMeshesList.current.push(octMesh);

      // Sprout label
      const votesCount = sprout.votes?.length || 0;
      const reqVotes = sprout.requiredVotes || 3;
      const subtitle = `[VOTE ${votesCount}/${reqVotes}] by ${sprout.author}`;
      const sprite = createTextSprite(sprout.text, subtitle, sprout.has_conflict ? '#ef4444' : '#38bdf8');
      sprite.position.set(0, 0.16, 0);
      sproutGroup.add(sprite);

      arborGroup.add(sproutGroup);

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

    // ── Spawn NON-COLLIDING Physical 3D Text Tiles on the Table Perimeter ────
    // Spaced out with at least 10cm of air between each card!
    const tileCount = slateCards.length;
    const tableArcRadius = 0.92; // Near perimeter of 1.35m radius table
    // Span a 1.6 rad (~92 degree) wide crescent
    const arcSpan = Math.min(0.40 * Math.max(tileCount - 1, 1), 1.65);
    const startAngle = -arcSpan / 2;

    slateCards.forEach((card, index) => {
      const colors = NODE_COLORS[card.intent] || NODE_COLORS.claim;
      const angle = tileCount <= 1 ? 0 : startAngle + (index / (tileCount - 1)) * arcSpan;

      const px = Math.sin(angle) * tableArcRadius;
      const pz = -1.05 + Math.cos(angle) * tableArcRadius;
      // Elevated cleanly above the table surface (table is at y=0.74, cards float at y=0.89)
      // Zero collision or clipping with tabletop!
      const py = 0.89; 

      const tileGroup = new THREE.Group();
      tileGroup.position.set(px, py, pz);
      tileGroup.rotation.y = angle;
      tileGroup.rotation.x = -0.24; // Ergonomically tilted up towards eyes with full table clearance

      // Soft holographic floor projection halo anchoring the card on the table
      const haloGeom = new THREE.RingGeometry(0.04, 0.12, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colors.main,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide
      });
      const haloMesh = new THREE.Mesh(haloGeom, haloMat);
      haloMesh.rotation.x = -Math.PI / 2;
      haloMesh.position.set(px, 0.744, pz);
      arborGroup.add(haloMesh);

      // Subtle vertical light beam connecting the table halo to the card
      const beamGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(px, 0.745, pz),
        new THREE.Vector3(px, py - 0.08, pz)
      ]);
      const beamMat = new THREE.LineDashedMaterial({
        color: colors.main,
        dashSize: 0.015,
        gapSize: 0.015,
        transparent: true,
        opacity: 0.35
      });
      const beamLine = new THREE.Line(beamGeom, beamMat);
      beamLine.computeLineDistances();
      arborGroup.add(beamLine);

      const tileTexture = createTableTileTexture(card, colors.hex);
      // Compact, sleek physical card dimensions (26cm wide x 16cm tall)
      const tileGeom = new THREE.BoxGeometry(0.26, 0.16, 0.012);
      const tileMat = new THREE.MeshStandardMaterial({
        map: tileTexture,
        roughness: 0.25,
        metalness: 0.1,
        emissive: colors.emissive,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.95,
      });
      const tileMesh = new THREE.Mesh(tileGeom, tileMat);
      tileGroup.add(tileMesh);

      // Edge outline
      const edges = new THREE.EdgesGeometry(tileGeom);
      const edgeLine = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: colors.main, transparent: true, opacity: 0.7 })
      );
      tileGroup.add(edgeLine);

      arborGroup.add(tileGroup);

      // Register picking target on tileMesh
      pickableTargetsMap.current.set(tileMesh.id, { id: card.id, type: 'tile', mesh: tileMesh });
      pickableMeshesList.current.push(tileMesh);

      tableTileGroupsRef.current.set(card.id, {
        group: tileGroup,
        mesh: tileMesh,
        initialPos: tileGroup.position.clone(),
      });
    });

    scene.add(arborGroup);
  }, [tree, ghostSprouts, slateCards, selectedParentId]);

  // ── Speech / Text Input Handler ─────────────────────────────────────────────
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

  // ── Resolved Inspector Content ─────────────────────────────────────────────
  let inspectedNode: IdeaNode | null = null;
  let inspectedSprout: GhostSprout | null = null;
  let inspectedTile: SlateCard | null = null;

  if (selectedItem.type === 'node' && tree?.nodes) {
    inspectedNode = tree.nodes[selectedItem.id] || tree.nodes[selectedParentId] || null;
  } else if (selectedItem.type === 'sprout') {
    inspectedSprout = ghostSprouts.find((s) => s.proposal_id === selectedItem.id) || null;
  } else if (selectedItem.type === 'tile') {
    inspectedTile = slateCards.find((c) => c.id === selectedItem.id) || null;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#06080d] overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* ── Top HUD: Merkle Provenance & Controls ─────────────────────────── */}
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

          {/* Toggle Side Inspector Button */}
          <button
            onClick={() => setIsInspectorOpen((prev) => !prev)}
            className={`px-2.5 py-1 rounded-xl text-xs font-medium border transition cursor-pointer flex items-center gap-1 ${
              isInspectorOpen
                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-600'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Node Full-Text Inspector"
          >
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inspector</span>
          </button>

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
      <div className="absolute top-14 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-4 bg-slate-900/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300 shadow-xl">
        <span className="flex items-center gap-1 text-cyan-300 font-medium">
          <ChevronRight className="w-3.5 h-3.5" /> Drag 3D Table Tile Right: <strong>Stretch (Elaborate)</strong>
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-amber-300 font-medium">
          <ChevronLeft className="w-3.5 h-3.5" /> Drag 3D Table Tile Left: <strong>Knead (Condense)</strong>
        </span>
        <span className="text-slate-600">•</span>
        <span className="flex items-center gap-1 text-emerald-300 font-medium">
          <ChevronUp className="w-3.5 h-3.5" /> Flick 3D Table Tile Up: <strong>Stage</strong>
        </span>
      </div>

      {/* ── Dedicated Side Inspector Panel (Full Node Text Display) ───────── */}
      {isInspectorOpen && (
        <aside className="absolute top-14 right-4 w-[410px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-170px)] bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 z-30 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-right-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Epistemic Node Inspector
              </h3>
            </div>
            <button
              onClick={() => setIsInspectorOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Inspected Item Content */}
          {inspectedNode ? (
            <div className="flex flex-col gap-3">
              {/* Type & Author Badges */}
              <div className="flex items-center justify-between text-xs">
                <span
                  style={{ backgroundColor: `${NODE_COLORS[inspectedNode.node_type]?.hex || '#06b6d4'}22`, color: NODE_COLORS[inspectedNode.node_type]?.hex || '#06b6d4', borderColor: NODE_COLORS[inspectedNode.node_type]?.hex || '#06b6d4' }}
                  className="px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase font-mono tracking-wide"
                >
                  {inspectedNode.node_type}
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  By {inspectedNode.author}
                </span>
                <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                  {inspectedNode.id}
                </span>
              </div>

              {/* WHOLE TEXT DISPLAY */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Full Proposition Sentence
                </label>
                <div className="text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text">
                  {inspectedNode.text}
                </div>
              </div>

              {/* Cryptographic Content Hash */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <Hash className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">Merkle Content Hash: {inspectedNode.content_hash || 'genesis'}</span>
              </div>

              {/* Ancestry & Parent Info */}
              {inspectedNode.parent_id && tree?.nodes?.[inspectedNode.parent_id] && (
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] uppercase text-slate-400 block mb-0.5 font-bold">Attached Parent:</span>
                  <button
                    onClick={() => {
                      onSelectParent(inspectedNode!.parent_id!);
                      setSelectedItem({ id: inspectedNode!.parent_id!, type: 'node' });
                    }}
                    className="text-left text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition cursor-pointer flex items-center gap-1"
                  >
                    <CornerDownRight className="w-3 h-3 flex-shrink-0 text-slate-500" />
                    <span className="truncate">[{inspectedNode.parent_id}] {tree.nodes[inspectedNode.parent_id].text}</span>
                  </button>
                </div>
              )}

              {/* Children Nodes List */}
              {inspectedNode.children_ids && inspectedNode.children_ids.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Child Branches ({inspectedNode.children_ids.length}):</span>
                  <div className="flex flex-col gap-1 max-h-32 overflow-y-auto custom-scrollbar">
                    {inspectedNode.children_ids.map((cid) => {
                      const child = tree?.nodes?.[cid];
                      if (!child) return null;
                      return (
                        <button
                          key={cid}
                          onClick={() => {
                            onSelectParent(cid);
                            setSelectedItem({ id: cid, type: 'node' });
                          }}
                          className="text-left text-[11px] bg-slate-900/80 hover:bg-slate-850 p-1.5 rounded border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span
                            style={{ backgroundColor: NODE_COLORS[child.node_type]?.hex || '#06b6d4' }}
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          />
                          <span className="truncate">[{cid}] {child.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Target Branch Setter Action */}
              <button
                onClick={() => onSelectParent(inspectedNode!.id)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedParentId === inspectedNode.id
                    ? 'bg-cyan-900/80 text-cyan-200 border border-cyan-500/50 shadow'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                {selectedParentId === inspectedNode.id ? 'Active Target Branch' : 'Set as Target Branch'}
              </button>
            </div>
          ) : inspectedSprout ? (
            <div className="flex flex-col gap-3">
              {/* Sprout Header */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full border border-pink-500/50 bg-pink-950/40 text-pink-300 text-[10px] font-bold uppercase font-mono">
                  Pending Proposal PR
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  By {inspectedSprout.author}
                </span>
              </div>

              {/* WHOLE TEXT DISPLAY */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Candidate Proposal Text
                </label>
                <div className="text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text">
                  {inspectedSprout.text}
                </div>
              </div>

              {/* Semantic Conflict Alert */}
              {inspectedSprout.has_conflict ? (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-600/60 text-xs text-red-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-300 font-semibold mb-0.5">Semantic Collision Warning</strong>
                    <p className="text-[11px] text-red-200/90 leading-snug">{inspectedSprout.conflict_reason}</p>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-600/50 text-[11px] text-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Consensus Aligned (No Semantic Collisions Detected)</span>
                </div>
              )}

              {/* Trade-Off Analysis */}
              {inspectedSprout.trade_off_analysis && (
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">Deliberation Trade-Off Analysis:</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{inspectedSprout.trade_off_analysis}</p>
                </div>
              )}

              {/* Live Votes Status */}
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Consensus Votes:</span>
                <span className="font-mono font-bold text-cyan-300">
                  {inspectedSprout.votes?.length || 0} / {inspectedSprout.requiredVotes || 3} Required
                </span>
              </div>

              {/* Vote Button */}
              <button
                onClick={() => onVote(inspectedSprout!.proposal_id, currentSpeaker)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Cast Approval Vote as {currentSpeaker}
              </button>
            </div>
          ) : inspectedTile ? (
            <div className="flex flex-col gap-3">
              {/* Tile Header */}
              <div className="flex items-center justify-between text-xs">
                <span
                  style={{ backgroundColor: `${NODE_COLORS[inspectedTile.intent]?.hex || '#06b6d4'}22`, color: NODE_COLORS[inspectedTile.intent]?.hex || '#06b6d4', borderColor: NODE_COLORS[inspectedTile.intent]?.hex || '#06b6d4' }}
                  className="px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase font-mono tracking-wide"
                >
                  {inspectedTile.intent}
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  Speaker: {inspectedTile.speaker}
                </span>
              </div>

              {/* WHOLE TEXT DISPLAY */}
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Distilled Proposition
                </label>
                <div className="text-[13px] text-slate-100 font-medium leading-relaxed bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 shadow-inner select-text">
                  {inspectedTile.distilledText}
                </div>
              </div>

              {/* Raw Speech Utterance */}
              {inspectedTile.rawText && inspectedTile.rawText !== inspectedTile.distilledText && (
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                    Raw Spoken Utterance
                  </label>
                  <p className="text-xs text-slate-400 italic bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                    "{inspectedTile.rawText}"
                  </p>
                </div>
              )}

              {/* Direct Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleTexterial(inspectedTile!.id, 'stretch')}
                  className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-cyan-800/40 transition cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  Stretch (Expand)
                </button>
                <button
                  onClick={() => handleTexterial(inspectedTile!.id, 'knead')}
                  className="py-2 px-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border border-amber-800/40 transition cursor-pointer"
                >
                  <Minimize2 className="w-3 h-3" />
                  Knead (Condense)
                </button>
              </div>

              <button
                onClick={() => handleStage(inspectedTile!)}
                disabled={inspectedTile.isStaged}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  inspectedTile.isStaged
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                }`}
              >
                {inspectedTile.isStaged ? <Check className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                {inspectedTile.isStaged ? 'Already Staged' : `Stage onto Branch [${selectedParentId}]`}
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Select any 3D node, ghost sprout, or table tile to inspect its full text, Merkle hash, and trade-offs.
            </div>
          )}
        </aside>
      )}

      {/* ── Minimalist Ingestion Toolbar (Bottom Console) ─────────────────── */}
      {/* Kept uncluttered so the 3D table tiles on the desk are fully visible */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-2.5 shadow-2xl flex items-center gap-2">
        <button
          onClick={toggleRecording}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
            isRecording
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          {isRecording ? 'Listening...' : 'Speak'}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleIngest();
          }}
          placeholder={`Speak or type an idea as ${currentSpeaker} to place a 3D tile on the table...`}
          className="flex-1 bg-slate-950/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
        />

        <button
          onClick={() => handleIngest()}
          disabled={isProcessing || !inputText.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer flex-shrink-0 shadow"
        >
          <Send className="w-3.5 h-3.5" />
          Ingest
        </button>
      </div>
    </div>
  );
};
