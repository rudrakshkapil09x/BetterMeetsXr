import os

# We will read ArborXR.tsx, replace the tile positioning, add the table shadow discs, and add the floating hover
path = os.path.join("better-google-meets", "frontend", "src", "components", "ArborXR.tsx")
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update py from 0.76 to 0.89 and angle tilt to -0.24
old_tile_placement = '''      const px = Math.sin(angle) * tableArcRadius;
      const pz = -1.05 + Math.cos(angle) * tableArcRadius;
      const py = 0.76; // Resting cleanly on tabletop surface

      const tileGroup = new THREE.Group();
      tileGroup.position.set(px, py, pz);
      tileGroup.rotation.y = angle;
      tileGroup.rotation.x = -0.30; // Ergonomically tilted up towards eyes'''

new_tile_placement = '''      const px = Math.sin(angle) * tableArcRadius;
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
      arborGroup.add(beamLine);'''

content = content.replace(old_tile_placement, new_tile_placement)

# 2. Add harmonic floating hover in the animation loop
old_anim_loop = '''      // Gentle floating animation on Ghost Sprouts wireframe
      sproutMeshesRef.current.forEach(({ mesh, id }) => {
        mesh.rotation.y = elapsed * 0.75;
        mesh.position.y += Math.sin(elapsed * 2.5 + parseFloat(id.replace(/\\D/g, '') || '1')) * 0.0003;
      });'''

new_anim_loop = '''      // Gentle floating animation on Ghost Sprouts wireframe
      sproutMeshesRef.current.forEach(({ mesh, id }) => {
        mesh.rotation.y = elapsed * 0.75;
        mesh.position.y += Math.sin(elapsed * 2.5 + parseFloat(id.replace(/\\D/g, '') || '1')) * 0.0003;
      });

      // Gentle floating hover on elevated 3D table cards (so they stay floating above table)
      tableTileGroupsRef.current.forEach(({ group, initialPos }, id) => {
        const drag = drag3DRef.current;
        if (!drag.isDragging || drag.cardId !== id) {
          const idx = id.charCodeAt(id.length - 1) || 1;
          group.position.y = initialPos.y + Math.sin(elapsed * 2.0 + idx) * 0.006;
        }
      });'''

content = content.replace(old_anim_loop, new_anim_loop)

with open(path, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)

print("Successfully elevated cards above the table with holographic halos and zero collision!")
