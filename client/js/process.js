/* =========================================================
   A S ENGINEERING WORK - PROCESS & ABOUT MODULE
   - 3D Floating 8K Mirror Sleeve & Engineering Strengths
   - 12-Stage Interactive Manufacturing Process 3D Visualizer
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initAboutStrengths3D();
  init12StageProcess3D();
});

/**
 * 1. Engineering Strengths 3D Scene (Floating 8K Mirror Sleeve)
 */
function initAboutStrengths3D() {
  const container = document.getElementById('strengths-3d-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 1.8);
  topLight.position.set(2, 6, 4);
  scene.add(topLight);

  const blueRim = new THREE.PointLight(0x0057D9, 3, 20);
  blueRim.position.set(-5, -2, 3);
  scene.add(blueRim);

  const orangeRim = new THREE.PointLight(0xFF7A00, 2.5, 20);
  orangeRim.position.set(5, 2, -3);
  scene.add(orangeRim);

  // 8K Mirror SS Sleeve Model
  const sleeveMaterial = new THREE.MeshStandardMaterial({
    color: 0xF1F5F9,
    metalness: 0.98,
    roughness: 0.05
  });

  const sleeveGroup = new THREE.Group();
  scene.add(sleeveGroup);

  const mainCylinderGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.6, 32, 1, true);
  const mainCylinder = new THREE.Mesh(mainCylinderGeo, sleeveMaterial);
  sleeveGroup.add(mainCylinder);

  // Top and Bottom Trim Bevel Rings
  const trimGeo = new THREE.TorusGeometry(1.21, 0.05, 16, 32);
  const topTrim = new THREE.Mesh(trimGeo, sleeveMaterial);
  topTrim.rotation.x = Math.PI / 2;
  topTrim.position.y = 1.8;
  sleeveGroup.add(topTrim);

  const bottomTrim = topTrim.clone();
  bottomTrim.position.y = -1.8;
  sleeveGroup.add(bottomTrim);

  sleeveGroup.rotation.x = 0.2;
  sleeveGroup.rotation.z = -0.1;

  // Floating Particles around central sleeve
  const particleCount = 40;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 6;
    positions[i + 1] = (Math.random() - 0.5) * 6;
    positions[i + 2] = (Math.random() - 0.5) * 6;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xFF7A00, size: 0.06 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Render Loop
  const animate = () => {
    requestAnimationFrame(animate);
    sleeveGroup.rotation.y += 0.008;
    particles.rotation.y -= 0.002;
    renderer.render(scene, camera);
  };

  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/**
 * 2. 12-Stage Manufacturing Process 3D Visualizer
 */
function init12StageProcess3D() {
  const container = document.getElementById('process-3d-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Ambient & Spotlight
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(0, 6, 6);
  scene.add(spotLight);

  const sparkLight = new THREE.PointLight(0xFF7A00, 0, 10);
  sparkLight.position.set(0, 0, 1.2);
  scene.add(sparkLight);

  // Materials for different stages
  const rawSteelMat = new THREE.MeshStandardMaterial({ color: 0x64748B, metalness: 0.4, roughness: 0.6 });
  const weldedMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.7, roughness: 0.3 });
  const mirrorBuffedMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, metalness: 0.98, roughness: 0.05 });

  // Stage Geometries Group
  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  // Base Sleeve Model
  let currentMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 3.2, 32, 1, true), weldedMat);
  stageGroup.add(currentMesh);

  // Laser Scan Grid Line (for Stage 11 Inspection)
  const laserGeo = new THREE.RingGeometry(1.22, 1.28, 32);
  const laserMat = new THREE.MeshBasicMaterial({ color: 0x0057D9, side: THREE.DoubleSide });
  const laserScanRing = new THREE.Mesh(laserGeo, laserMat);
  laserScanRing.rotation.x = Math.PI / 2;
  laserScanRing.visible = false;
  stageGroup.add(laserScanRing);

  // Stage Data & Morphing Configuration
  const stagesData = [
    { name: "1. Shearing", desc: "Raw SS304/SS316 steel plates precision cut to exact blank size.", mat: rawSteelMat, wireframe: true, spark: 0, laser: false },
    { name: "2. Bending", desc: "Hydraulic press brake shaping plate edge radius.", mat: rawSteelMat, wireframe: true, spark: 0, laser: false },
    { name: "3. Stretching & Rolling", desc: "3-Roll bending machine curving blank into hollow cylinder.", mat: rawSteelMat, wireframe: false, spark: 0, laser: false },
    { name: "4. Welding", desc: "Automatic TIG longitudinal seam welding with argon shielding gas.", mat: weldedMat, wireframe: false, spark: 4, laser: false },
    { name: "5. Weld Press", desc: "Hydraulic weld flattening press removing seam height excess.", mat: weldedMat, wireframe: false, spark: 0, laser: false },
    { name: "6. Lap Wheel Rub", desc: "Lap wheel abrasive dressing smoothing joint area.", mat: weldedMat, wireframe: false, spark: 2, laser: false },
    { name: "7. Rough Machining", desc: "Heavy lathe turning establishing inner & outer diameter baselines.", mat: weldedMat, wireframe: false, spark: 0, laser: false },
    { name: "8. Final Machining", desc: "High-speed CNC lathe finishing tolerances to ±0.005mm.", mat: weldedMat, wireframe: false, spark: 0, laser: false },
    { name: "9. Ovality Correction", desc: "Hydraulic expander mandrel ensuring 100% roundness perfection.", mat: weldedMat, wireframe: false, spark: 0, laser: false },
    { name: "10. Buffing & Polishing", desc: "Multi-head automatic buffing achieving 8K mirror mirror finish.", mat: mirrorBuffedMat, wireframe: false, spark: 1, laser: false },
    { name: "11. CMM Inspection", desc: "Coordinate Measuring Machine & surface roughness verification.", mat: mirrorBuffedMat, wireframe: false, spark: 0, laser: true },
    { name: "12. Protective Packing", desc: "Anti-corrosion VCI sleeve wrapping and export wood crating.", mat: mirrorBuffedMat, wireframe: false, spark: 0, laser: false }
  ];

  let currentStageIndex = 0;

  function updateProcessStage(index) {
    currentStageIndex = index;
    const stage = stagesData[index];

    // Update Material & Wireframe
    currentMesh.material = stage.mat;
    currentMesh.material.wireframe = stage.wireframe;

    // Spark Intensity
    sparkLight.intensity = stage.spark;

    // Laser Ring
    laserScanRing.visible = stage.laser;

    // Text update
    const nameElem = document.getElementById('active-stage-title');
    const descElem = document.getElementById('active-stage-desc');
    const badgeElem = document.getElementById('active-stage-badge');

    if (nameElem) nameElem.textContent = stage.name;
    if (descElem) descElem.textContent = stage.desc;
    if (badgeElem) badgeElem.textContent = `STAGE ${index + 1} OF 12`;

    // Highlight active timeline buttons
    document.querySelectorAll('.stage-pill-btn').forEach((btn, i) => {
      if (i === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  // Expose global step trigger
  window.setStageIndex = function (index) {
    if (index >= 0 && index < 12) {
      updateProcessStage(index);
    }
  };

  // Next / Prev button triggers
  const prevBtn = document.getElementById('prev-stage-btn');
  const nextBtn = document.getElementById('next-stage-btn');

  if (prevBtn) prevBtn.addEventListener('click', () => updateProcessStage(Math.max(0, currentStageIndex - 1)));
  if (nextBtn) nextBtn.addEventListener('click', () => updateProcessStage(Math.min(11, currentStageIndex + 1)));

  // Animation Loop
  let laserY = -1.5;
  const animate = () => {
    requestAnimationFrame(animate);

    stageGroup.rotation.y += 0.007;

    // Animate CMM Laser Scan line up and down
    if (laserScanRing.visible) {
      laserY += 0.04;
      if (laserY > 1.5) laserY = -1.5;
      laserScanRing.position.y = laserY;
    }

    renderer.render(scene, camera);
  };

  animate();
  updateProcessStage(0);

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
