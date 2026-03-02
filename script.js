// --- 3D Background Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0x00f2ff, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(20, 20, 20);
scene.add(light);
camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.005; torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// --- UPI Payment & Booking Verification ---
function processPayment(amount, service) {
    const upiId = "7385009275@ybl";
    const upiUrl = `upi://pay?pa=${upiId}&pn=UmerTakildar&am=${amount}&cu=INR&tn=Booking_${service}`;

    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        window.location.href = upiUrl;
        
        // Proof logic: Payment ke baad user ko browser me wapas aana hoga
        setTimeout(() => {
            const check = confirm("Kya aapne Payment complete kar li hai? Fix meeting only if paid.");
            if(check) {
                // Verified redirect
                window.location.href = "https://calendly.com/umertakildar7/30min";
            }
        }, 8000); 
    } else {
        alert("Mobile se open karein GPay/PhonePe trigger karne ke liye.");
    }
}
