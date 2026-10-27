/* =========================================================
   A S ENGINEERING WORK - CINEMATIC THREE.JS HERO SCENE
   - Real 3D Factory Scene with Overhead Industrial Robotic Arm
   - Client Real Products 3D Models:
     1. SS Precision Machined Ring (Matching Image 1)
     2. SS Flanged Heavy Bushing (Matching Image 2)
     3. SS Seamless Pipes & Tubes (Matching Image 3)
     4. Submersible Pump Sleeves & Column Assemblies (Matching Image 4)
     5. Submersible Pump & Motor Assemblies (Matching Image 5)
   - Studio HDR Lighting, Metallic PBR Reflections & Mouse Parallax
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 3D Scene cancelled - background video.mp4 is now used in hero section
  initHeroCinematicScene3D();
  initHeroGSAP();
});

/**
 * Three.js 3D Industrial Scene (Cancelled in favor of Video.mp4 Background)
 */
function initHeroCinematicScene3D() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return; // 3D Canvas element removed; background video active

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070D18, 0.035);

  const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 2.2, 9.8);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;

  // Clear previous contents
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Generate Procedural High-Contrast Studio Environment Map for Metallic Reflections
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  const createStudioEnvMap = () => {
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x070D18);

    const lightGeo = new THREE.PlaneGeometry(14, 14);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    const softbox1 = new THREE.Mesh(lightGeo, lightMat);
    softbox1.position.set(0, 14, 6);
    softbox1.rotation.x = Math.PI / 2;
    envScene.add(softbox1);

    const softbox2 = new THREE.Mesh(lightGeo, lightMat);
    softbox2.position.set(-14, 6, -6);
    softbox2.rotation.y = Math.PI / 2;
    envScene.add(softbox2);

    const orangeRimSoftbox = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0xF97316 }));
    orangeRimSoftbox.position.set(14, 4, 4);
    envScene.add(orangeRimSoftbox);

    const blueRimSoftbox = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0x0F62FE }));
    blueRimSoftbox.position.set(-14, 8, 8);
    envScene.add(blueRimSoftbox);

    return pmremGenerator.fromScene(envScene).texture;
  };

  const envTexture = createStudioEnvMap();
  scene.environment = envTexture;

  // Industrial Lighting Rig
  const ambientLight = new THREE.AmbientLight(0x0F172A, 0.95);
  scene.add(ambientLight);

  const mainSpotLight = new THREE.SpotLight(0xffffff, 2.8, 45, Math.PI / 4, 0.4, 1);
  mainSpotLight.position.set(5, 13, 7);
  mainSpotLight.castShadow = true;
  mainSpotLight.shadow.mapSize.width = 2048;
  mainSpotLight.shadow.mapSize.height = 2048;
  scene.add(mainSpotLight);

  const blueFillLight = new THREE.PointLight(0x0F62FE, 3.5, 30);
  blueFillLight.position.set(-8, 4, 5);
  scene.add(blueFillLight);

  const orangeGlowLight = new THREE.PointLight(0xF97316, 4.5, 15);
  orangeGlowLight.position.set(0, -1.2, 2.6);
  scene.add(orangeGlowLight);

  // ---------------------------------------------------------
  // PBR MATERIALS SETUP FOR CLIENT PRODUCTS
  // ---------------------------------------------------------
  // 1. Mirror Polished Stainless Steel (Client SS Rings & Sleeves)
  const ssMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xF8FAFC,
    metalness: 0.98,
    roughness: 0.06,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    reflectivity: 1.0,
    envMapIntensity: 2.8
  });

  // 2. Fine Lathe Turned Stainless Steel (Client SS Bushings)
  const brushedSSMaterial = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 2.2
  });

  // 3. Submersible Pump Top/Bottom Blue Paint (Client Image 4)
  const bluePaintMaterial = new THREE.MeshStandardMaterial({
    color: 0x0284C7,
    roughness: 0.25,
    metalness: 0.5,
    envMapIntensity: 1.2
  });

  // 4. Submersible Pump Teal Body Paint (Client Image 5)
  const tealPaintMaterial = new THREE.MeshStandardMaterial({
    color: 0x0D9488,
    roughness: 0.3,
    metalness: 0.45,
    envMapIntensity: 1.2
  });

  // 5. Intake Screen Mesh Metal
  const screenMeshMaterial = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.9,
    roughness: 0.35
  });

  const darkSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.85,
    roughness: 0.35
  });

  const orangeNeonMaterial = new THREE.MeshBasicMaterial({
    color: 0xF97316
  });

  // Master Stage Group
  const stageGroup = new THREE.Group();
  scene.add(stageGroup);

  // ---------------------------------------------------------
  // 1. BACKGROUND INDUSTRIAL ARCH & NEON RING
  // ---------------------------------------------------------
  const backArchGroup = new THREE.Group();

  const archOuterGeo = new THREE.TorusGeometry(4.6, 0.45, 32, 64, Math.PI * 1.25);
  const archOuterMesh = new THREE.Mesh(archOuterGeo, darkSteelMaterial);
  archOuterMesh.rotation.z = -Math.PI * 0.12;
  archOuterMesh.position.set(0, 0.8, -3.2);
  backArchGroup.add(archOuterMesh);

  const archGlowGeo = new THREE.TorusGeometry(4.4, 0.055, 16, 64, Math.PI * 1.25);
  const archGlowMesh = new THREE.Mesh(archGlowGeo, orangeNeonMaterial);
  archGlowMesh.rotation.z = -Math.PI * 0.12;
  archGlowMesh.position.set(0, 0.8, -3.1);
  backArchGroup.add(archGlowMesh);

  stageGroup.add(backArchGroup);

  // ---------------------------------------------------------
  // 2. OVERHEAD INDUSTRIAL ROBOTIC ARM
  // ---------------------------------------------------------
  const robotArmGroup = new THREE.Group();
  robotArmGroup.position.set(3.0, 3.4, -2.0);
  robotArmGroup.rotation.y = -Math.PI * 0.25;

  const robotBaseGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.6, 24);
  const robotBaseMesh = new THREE.Mesh(robotBaseGeo, darkSteelMaterial);
  robotArmGroup.add(robotBaseMesh);

  const joint1Group = new THREE.Group();
  joint1Group.position.y = 0.4;
  robotArmGroup.add(joint1Group);

  const armUpperGeo = new THREE.CylinderGeometry(0.22, 0.25, 1.8, 16);
  const armUpperMesh = new THREE.Mesh(armUpperGeo, darkSteelMaterial);
  armUpperMesh.position.set(0, 0.9, -0.2);
  armUpperMesh.rotation.x = 0.35;
  joint1Group.add(armUpperMesh);

  const joint2Group = new THREE.Group();
  joint2Group.position.set(0, 1.7, -0.5);
  joint1Group.add(joint2Group);

  const armForeGeo = new THREE.CylinderGeometry(0.18, 0.2, 1.6, 16);
  const armForeMesh = new THREE.Mesh(armForeGeo, darkSteelMaterial);
  armForeMesh.position.set(0, -0.6, 0.4);
  armForeMesh.rotation.x = -0.7;
  joint2Group.add(armForeMesh);

  const laserHeadGeo = new THREE.ConeGeometry(0.15, 0.4, 16);
  const laserHeadMesh = new THREE.Mesh(laserHeadGeo, orangeNeonMaterial);
  laserHeadMesh.position.set(0, -1.3, 0.8);
  laserHeadMesh.rotation.x = Math.PI;
  joint2Group.add(laserHeadMesh);

  stageGroup.add(robotArmGroup);

  // ---------------------------------------------------------
  // 3. MULTI-TIERED STEEL PLATFORM & GLOWING RING
  // ---------------------------------------------------------
  const pedestalGroup = new THREE.Group();
  pedestalGroup.position.y = -1.6;

  const baseTierGeo = new THREE.CylinderGeometry(4.0, 4.2, 0.45, 64);
  const baseTierMesh = new THREE.Mesh(baseTierGeo, darkSteelMaterial);
  baseTierMesh.position.y = -0.22;
  baseTierMesh.receiveShadow = true;
  pedestalGroup.add(baseTierMesh);

  const topTierGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.45, 64);
  const topTierMesh = new THREE.Mesh(topTierGeo, darkSteelMaterial);
  topTierMesh.position.y = 0.22;
  topTierMesh.receiveShadow = true;
  pedestalGroup.add(topTierMesh);

  const ledRingGeo = new THREE.TorusGeometry(3.72, 0.05, 16, 64);
  const ledRingMesh = new THREE.Mesh(ledRingGeo, orangeNeonMaterial);
  ledRingMesh.rotation.x = Math.PI / 2;
  ledRingMesh.position.y = 0.01;
  pedestalGroup.add(ledRingMesh);

  stageGroup.add(pedestalGroup);

  // ---------------------------------------------------------
  // 4. CLIENT REAL PRODUCTS 3D MODELS DISPLAY
  // ---------------------------------------------------------
  const productsGroup = new THREE.Group();
  productsGroup.position.y = -1.2;

  // Helper 1: Create Hollow SS Ring (Matching Client Image 1)
  function createSSRing(outerR, innerR, height) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerR, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const extrudeSettings = {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  // Helper 2: Create Lathe-Turned Flanged Bushing (Matching Client Image 2)
  function createSSFlangedBushing(flangeR, outerR, innerR, flangeH, totalH) {
    const points = [];
    points.push(new THREE.Vector2(innerR, 0));
    points.push(new THREE.Vector2(flangeR - 0.03, 0));
    points.push(new THREE.Vector2(flangeR, 0.03));
    points.push(new THREE.Vector2(flangeR, flangeH - 0.02));
    points.push(new THREE.Vector2(flangeR - 0.03, flangeH));
    points.push(new THREE.Vector2(outerR, flangeH));
    points.push(new THREE.Vector2(outerR, totalH - 0.02));
    points.push(new THREE.Vector2(outerR - 0.02, totalH));
    points.push(new THREE.Vector2(innerR, totalH));
    points.push(new THREE.Vector2(innerR, 0));

    return new THREE.LatheGeometry(points, 48);
  }

  // Helper 3: Create Hollow Thin-Walled SS Tube (Matching Client Image 3)
  function createSSTube(outerR, wallThickness, length) {
    const group = new THREE.Group();
    const innerR = outerR - wallThickness;

    // Outer Tube Wall
    const outerGeo = new THREE.CylinderGeometry(outerR, outerR, length, 36, 1, true);
    const outerMesh = new THREE.Mesh(outerGeo, ssMaterial);
    outerMesh.castShadow = true;
    group.add(outerMesh);

    // Inner Tube Wall
    const innerGeo = new THREE.CylinderGeometry(innerR, innerR, length, 36, 1, true);
    const innerMesh = new THREE.Mesh(innerGeo, ssMaterial);
    group.add(innerMesh);

    // Top End Ring
    const topCapGeo = createSSRing(outerR, innerR, 0.01);
    const topCapMesh = new THREE.Mesh(topCapGeo, ssMaterial);
    topCapMesh.rotation.x = Math.PI / 2;
    topCapMesh.position.y = length / 2;
    group.add(topCapMesh);

    // Bottom End Ring
    const botCapMesh = topCapMesh.clone();
    botCapMesh.position.y = -length / 2;
    group.add(botCapMesh);

    return group;
  }

  // Helper 4: Create Vertical Submersible Pump Column (Matching Client Image 4)
  function createSubmersiblePumpColumn(columnHeight, radius, blueCapHeight) {
    const columnGroup = new THREE.Group();

    // 1. Top Blue Cap (SAGAR Style)
    const topCapGeo = new THREE.CylinderGeometry(radius * 0.95, radius, blueCapHeight, 32);
    const topCapMesh = new THREE.Mesh(topCapGeo, bluePaintMaterial);
    topCapMesh.position.y = columnHeight / 2 - blueCapHeight / 2;
    topCapMesh.castShadow = true;
    columnGroup.add(topCapMesh);

    // Top Cap Rib Ring
    const ribGeo = new THREE.TorusGeometry(radius * 0.98, 0.03, 16, 32);
    const ribMesh = new THREE.Mesh(ribGeo, bluePaintMaterial);
    ribMesh.rotation.x = Math.PI / 2;
    ribMesh.position.y = columnHeight / 2 - 0.08;
    columnGroup.add(ribMesh);

    // 2. Main Polished SS Sleeve
    const sleeveHeight = columnHeight - blueCapHeight * 2 - 0.4;
    const sleeveGeo = new THREE.CylinderGeometry(radius, radius, sleeveHeight, 36);
    const sleeveMesh = new THREE.Mesh(sleeveGeo, ssMaterial);
    sleeveMesh.position.y = 0.1;
    sleeveMesh.castShadow = true;
    columnGroup.add(sleeveMesh);

    // 3. Perforated Intake Mesh Screen Section
    const screenGeo = new THREE.CylinderGeometry(radius * 1.01, radius * 1.01, 0.35, 32);
    const screenMesh = new THREE.Mesh(screenGeo, screenMeshMaterial);
    screenMesh.position.y = -sleeveHeight / 4;
    columnGroup.add(screenMesh);

    // Screen border rings
    const borderTop = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.02, 0.02, 16, 32), ssMaterial);
    borderTop.rotation.x = Math.PI / 2;
    borderTop.position.y = -sleeveHeight / 4 + 0.175;
    columnGroup.add(borderTop);

    const borderBot = borderTop.clone();
    borderBot.position.y = -sleeveHeight / 4 - 0.175;
    columnGroup.add(borderBot);

    // 4. Interstage Joint Coupling Rings
    for (let c = 0; c < 3; c++) {
      const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(radius * 1.015, 0.025, 16, 32), ssMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = (sleeveHeight / 3) * (c - 1);
      columnGroup.add(ringMesh);
    }

    // 5. Bottom Blue Motor Base
    const botCapGeo = new THREE.CylinderGeometry(radius, radius * 1.05, blueCapHeight, 32);
    const botCapMesh = new THREE.Mesh(botCapGeo, bluePaintMaterial);
    botCapMesh.position.y = -columnHeight / 2 + blueCapHeight / 2;
    botCapMesh.castShadow = true;
    columnGroup.add(botCapMesh);

    return columnGroup;
  }

  // Helper 5: Create Horizontal Submersible Centrifugal Pump (Matching Client Image 5)
  function createHorizontalPump() {
    const pumpGroup = new THREE.Group();

    // Main SS Body Cylinder
    const bodyGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.4, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, ssMaterial);
    bodyMesh.rotation.z = Math.PI / 2;
    bodyMesh.castShadow = true;
    pumpGroup.add(bodyMesh);

    // Teal Left Suction Casing
    const leftVoluteGeo = new THREE.CylinderGeometry(0.55, 0.52, 0.35, 32);
    const leftVolute = new THREE.Mesh(leftVoluteGeo, tealPaintMaterial);
    leftVolute.rotation.z = Math.PI / 2;
    leftVolute.position.x = -0.85;
    leftVolute.castShadow = true;
    pumpGroup.add(leftVolute);

    // Teal Right Discharge Volute Casing & Nozzle
    const rightVolute = leftVolute.clone();
    rightVolute.position.x = 0.85;
    pumpGroup.add(rightVolute);

    // Vertical Outlet Flange Nozzle
    const nozzleGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.4, 24);
    const nozzleMesh = new THREE.Mesh(nozzleGeo, tealPaintMaterial);
    nozzleMesh.position.set(0.85, 0.45, 0);
    pumpGroup.add(nozzleMesh);

    const nozzleFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.08, 24), tealPaintMaterial);
    nozzleFlange.position.set(0.85, 0.65, 0);
    pumpGroup.add(nozzleFlange);

    return pumpGroup;
  }

  // ---------------------------------------------------------
  // INSTANTIATE AND POSITION CLIENT REAL PRODUCT 3D MODELS
  // ---------------------------------------------------------

  // 1. Client Product 1: SS Precision Ring (Image 1)
  const ringMesh = new THREE.Mesh(createSSRing(1.3, 1.0, 0.45), ssMaterial);
  ringMesh.position.set(-2.2, 1.2, 0.5);
  ringMesh.rotation.set(0.25, 0.4, -0.15);
  ringMesh.castShadow = true;
  productsGroup.add(ringMesh);

  // 2. Client Product 2: SS Flanged Bushing (Image 2)
  const bushingMesh = new THREE.Mesh(createSSFlangedBushing(1.15, 0.88, 0.65, 0.25, 1.3), brushedSSMaterial);
  bushingMesh.position.set(-0.8, 0.85, 0.4);
  bushingMesh.rotation.set(0.15, -0.3, 0.1);
  bushingMesh.castShadow = true;
  productsGroup.add(bushingMesh);

  // 3. Client Product 3: SS Seamless Pipes & Tubes (Image 3)
  const tube1 = createSSTube(0.28, 0.04, 2.6);
  tube1.rotation.z = Math.PI / 2;
  tube1.rotation.y = -0.45;
  tube1.position.set(0.6, 0.35, 1.3);
  productsGroup.add(tube1);

  const tube2 = createSSTube(0.24, 0.035, 2.4);
  tube2.rotation.z = Math.PI / 2;
  tube2.rotation.y = -0.45;
  tube2.position.set(0.85, 0.22, 0.85);
  productsGroup.add(tube2);

  // 4. Client Product 4: Set of 3 Vertical Submersible Pump Columns (Image 4)
  const pumpColumn1 = createSubmersiblePumpColumn(3.2, 0.35, 0.3);
  pumpColumn1.position.set(1.5, 1.6, -0.6);
  productsGroup.add(pumpColumn1);

  const pumpColumn2 = createSubmersiblePumpColumn(2.6, 0.32, 0.26);
  pumpColumn2.position.set(2.2, 1.3, -1.0);
  productsGroup.add(pumpColumn2);

  const pumpColumn3 = createSubmersiblePumpColumn(2.8, 0.30, 0.28);
  pumpColumn3.position.set(0.8, 1.4, -1.2);
  productsGroup.add(pumpColumn3);

  // 5. Client Product 5: Horizontal Submersible Centrifugal Pump (Image 5)
  const horizPump = createHorizontalPump();
  horizPump.position.set(-1.2, 0.2, 1.4);
  horizPump.rotation.y = 0.35;
  productsGroup.add(horizPump);

  stageGroup.add(productsGroup);

  // ---------------------------------------------------------
  // 5. ANIMATION LOOP (SLOW TURNTABLE, ROBOT MOTION & PARALLAX)
  // ---------------------------------------------------------
  let mouseX = 0;
  let mouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.0003;
    mouseY = (e.clientY - windowHalfY) * 0.0003;
  });

  let clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Slow turntable rotation of products platform (0.002 rad/frame)
    stageGroup.rotation.y += 0.002;

    // 2. Robotic Arm Smooth Idle Motion
    joint1Group.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15;
    joint2Group.rotation.x = Math.cos(elapsedTime * 0.6) * 0.1;

    // 3. Subtle floating rotation for SS Ring and Flanged Bushing
    ringMesh.rotation.z = -0.15 + Math.sin(elapsedTime * 0.5) * 0.05;
    bushingMesh.rotation.y = -0.3 + Math.cos(elapsedTime * 0.4) * 0.08;

    // 4. Smooth Camera Mouse Parallax
    camera.position.x += (mouseX * 2.5 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 1.8 + 2.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0.4, 0);

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
 * GSAP Hero Text Reveal Animation
 */
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

  tl.from('.hero-tagline', { y: -20, opacity: 0, delay: 0.2 })
    .from('.hero-title', { y: 35, opacity: 0 }, '-=0.6')
    .from('.hero-subtitle', { y: 25, opacity: 0 }, '-=0.6')
    .from('.hero-cta-group', { y: 20, opacity: 0 }, '-=0.5')
    .from('.hero-bottom-bar', { y: 30, opacity: 0 }, '-=0.5')
    .from('.hero-right-wrapper', { scale: 0.92, opacity: 0, duration: 1.2 }, '-=1');
}
