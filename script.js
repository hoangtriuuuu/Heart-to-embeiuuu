const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const textParticles = [];
const numParticles = 250;
const heartScale = Math.min(canvas.width, canvas.height) / 25;
const textSize = 2.5; // Kích thước hạt nhỏ hơn

// Hàm vẽ hình trái tim
function heartFunction(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
}

// Tạo hạt sáng cho trái tim
for (let i = 0; i < numParticles; i++) {
    let t = Math.random() * Math.PI * 2;
    let heartPos = heartFunction(t);

    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: canvas.width / 2 + heartPos.x * heartScale,
        targetY: canvas.height / 2 + heartPos.y * heartScale,
        size: Math.random() * 2 + 1,
        opacity: 0,
        speed: Math.random() * 0.03 + 0.01,
        blur: Math.random() * 5 + 2
    });
}

// Vẽ chữ trên canvas ẩn để lấy vị trí pixel
const textCanvas = document.createElement("canvas");
const textCtx = textCanvas.getContext("2d");
textCanvas.width = canvas.width;
textCanvas.height = canvas.height;
textCtx.font = "bold 80px Arial";
textCtx.textAlign = "center";
textCtx.fillStyle = "white";
textCtx.fillText("Anh yêu Thương", canvas.width / 2, canvas.height / 2 + 20);

const textData = textCtx.getImageData(0, 0, canvas.width, canvas.height);
for (let y = 0; y < textCanvas.height; y += 5) {
    for (let x = 0; x < textCanvas.width; x += 5) {
        let alpha = textData.data[(y * textCanvas.width + x) * 4 + 3];
        if (alpha > 128) {
            textParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                targetX: x,
                targetY: y,
                size: textSize,
                opacity: 0,
                speed: Math.random() * 0.03 + 0.01,
                blur: Math.random() * 5 + 3
            });
        }
    }
}

// Vẽ hạt sáng
function drawParticles(particlesArray, color, glow) {
    particlesArray.forEach(p => {
        ctx.beginPath();
        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );
        ctx.shadowColor = `rgba(${color}, 1)`;
        ctx.shadowBlur = glow ? p.blur : 0;
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
    });
}

// Animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;
        p.opacity += 0.02;
    });

    textParticles.forEach(p => {
        p.x += (p.targetX - p.x) * p.speed;
        p.y += (p.targetY - p.y) * p.speed;
        p.opacity += 0.02;
    });

    drawParticles(particles, "255, 255, 255", true); // Trái tim màu trắng, có ánh sáng
    drawParticles(textParticles, "255, 0, 0", true); // Chữ màu đỏ lấp lánh

    requestAnimationFrame(animate);
}

// Chạy animation
animate();
