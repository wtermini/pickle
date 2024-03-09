const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a pickle shape using cylinders and spheres
let pickleTexture;
textureLoader.load('https://files.catbox.moe/566ip0.png', (texture) => {
  pickleTexture = texture;
  pickleTexture.wrapS = pickleTexture.wrapT = THREE.RepeatWrapping;
  pickleTexture.repeat.set(1, 1); // Adjust the repeat values to fit the texture nicely on the pickle shape
  const pickleMaterial = new THREE.MeshPhongMaterial({ map: pickleTexture });

  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 6, 90);
  const cylinder = new THREE.Mesh(cylinderGeometry, pickleMaterial);

  const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
  const topSphere = new THREE.Mesh(sphereGeometry, pickleMaterial);
  topSphere.position.set(0, 3, 0);

  const bottomSphere = new THREE.Mesh(sphereGeometry, pickleMaterial);
  bottomSphere.position.set(0, -3, 0);

  const pickle = new THREE.Group();
  pickle.add(cylinder);
  pickle.add(topSphere);
  pickle.add(bottomSphere);

  scene.add(pickle);

  camera.position.z = 15;

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

function createStarfield() {
  const starfield = new THREE.Group();
  const starGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < 1000; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    starfield.add(star);
  }

  return starfield;
}

const starfield = createStarfield();
scene.add(starfield);

function animate() {
  requestAnimationFrame(animate);

  pickle.rotation.x += 0.02;
  pickle.rotation.z += 0.04;

  // Animate starfield
  starfield.children.forEach((star) => {
    star.position.z += 0.2; // Adjust the speed by changing this value

    // Reset the star position when it's too close to the camera
    if (star.position.z > 10) {
      star.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
    }
  });

  renderer.render(scene, camera);
}

animate();
});