// --- 1. UPI Payment & Auto-Redirect Logic ---
function startPayment(amount, serviceName) {
    // ⚠️ APNI SAHI UPI ID YAHAN DALO
    const upiId = "7385009275@ybl"; 
    const name = "Umer Takildar";
    
    // UPI Link Format (Works on Mobile Apps)
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent("Booking: " + serviceName)}`;

    // Check if user is on Mobile
    if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
        window.location.href = upiUrl;

        // Payment ke baad user ko 5 second ka time dena
        setTimeout(() => {
            const confirmBooking = confirm("Kya aapne payment complete kar li hai? 'OK' par click karein apna slot book karne ke liye.");
            if (confirmBooking) {
                // Yahan apna Calendly link dalo
                window.location.href = "https://calendly.com/your-profile"; 
            }
        }, 5000); 
    } else {
        alert("Mobile phone se try karein taaki PhonePe/GPay open ho sake!");
    }
}

// --- 2. Real 3D Interactive Mouse/Touch Animation ---
const card = document.querySelector('.profile-section');

// Mouse Movement Effect (Desktop)
document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    if(card) {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        card.style.transition = "none"; // Animation fast rahe
    }
});

// Reset Position when mouse leaves
document.addEventListener('mouseleave', () => {
    if(card) {
        card.style.transition = "all 0.5s ease";
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
});

// Touch Support (Mobile)
document.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    let xAxis = (window.innerWidth / 2 - touch.pageX) / 20;
    let yAxis = (window.innerHeight / 2 - touch.pageY) / 20;
    if(card) {
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    }
});

// --- 3. Smooth Scroll (For Navigation) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
