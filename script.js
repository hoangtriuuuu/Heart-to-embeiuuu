const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const textParticles = [];
const numParticles = 200;
const numTextParticles = 50;
const heartScale = Math.min(canvas.width, canvas.height) / 25;

// Hàm vẽ hình trái tim
function heartFunction(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: - (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
}

// Tạo hạt sáng cho trái tim
for (let i = 0; i < numParticles; i++) {
    let t = Math.random() * Math.PI * 2;
    let heartPos = heartFunction(t);

    particles.push({
        x: canvas.width / 2 + heartPos.x * heartScale,
        y: canvas.height / 2 + heartPos.y * heartScale,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

// Tạo chữ từ hạt sáng
const text = "Anh yêu Thương";
ctx.font = "bold 50px Arial";
ctx.textAlign = "center";
ctx.fillText(text, canvas.width / 2, canvas.height / 1.3);
const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);

for (let i = 0; i < numTextParticles; i++) {
    let x, y;
    do {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
    } while (textData.data[(Math.floor(y) * canvas.width + Math.floor(x)) * 4 + 3] === 0);

    textParticles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5
    });
}

// Vẽ hạt sáng
function drawParticles(particlesArray) {
    particlesArray.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
    });
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawParticles(particles);
    drawParticles(textParticles);

    requestAnimationFrame(animate);
}

animate();
