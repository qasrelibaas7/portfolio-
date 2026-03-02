// --- 3D Background (Three.js) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x00f2ff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(20, 20, 20);
scene.add(light);
camera.position.z = 35;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.003; torus.rotation.y += 0.003;
    renderer.render(scene, camera);
}
animate();

// Mouse Movement Interaction
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    torus.rotation.x += y * 0.01;
    torus.rotation.y += x * 0.01;
});

// --- UPI Payment & Booking Logic ---
function processPayment(amount, service) {
    const upiId = "7385009275@ybl";
    const upiUrl = `upi://pay?pa=${upiId}&pn=UmerTakildar&am=${amount}&cu=INR&tn=Booking_${service.replace(/\s+/g, '_')}`;

    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        window.location.href = upiUrl;
        
        // Timer for verification popup
        setTimeout(() => {
            const confirmed = confirm("Did you complete the payment? Proceed only if paid.");
            if (confirmed) {
                // Verified Redirect to your Calendly
                window.location.href = "https://calendly.com/umertakildar7/30min";
            }
        }, 8000); 
    } else {
        alert("Please open this on your Mobile Phone to use PhonePe/GPay.");
    }
}
