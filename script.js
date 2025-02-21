const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateScale();
    createParticles();
}

window.addEventListener("resize", resizeCanvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const textParticles = [];
const numParticles = 300; 
let heartScale, fontSize;

function updateScale() {
    heartScale = Math.min(canvas.width, canvas.height) / 25; 
    fontSize = Math.min(canvas.width, canvas.height) / 12; // Chữ sẽ luôn vừa với màn hình
}

updateScale();

function heartFunction(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t))
    };
}

function createParticles() {
    particles.length = 0;
    textParticles.length = 0;

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
            blur: Math.random() * 5 + 2,
            vx: 0, vy: 0
        });
    }

    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");
    textCanvas.width = canvas.width;
    textCanvas.height = canvas.height;
    textCtx.font = `bold ${fontSize}px Arial`; // Cập nhật font chữ theo màn hình
    textCtx.textAlign = "center";
    textCtx.fillStyle = "white";
    textCtx.fillText("Anh yêu Thương", canvas.width / 2, canvas.height / 2 + fontSize / 3);

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
                    size: 2,
                    opacity: 0,
                    speed: Math.random() * 0.03 + 0.01,
                    blur: Math.random() * 4 + 3,
                    vx: 0, vy: 0
                });
            }
        }
    }
}
createParticles();

function drawParticles(particlesArray, color, glow) {
    particlesArray.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(${color}, 1)`;
        ctx.shadowBlur = glow ? p.blur : 0;
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
    });
}

// Chạm vào màn hình để đẩy hạt
canvas.addEventListener("touchmove", function(event) {
    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    [...particles, ...textParticles].forEach(p => {
        let dx = p.x - touchX;
        let dy = p.y - touchY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
            let force = (50 - distance) / 10;
            p.vx = dx * force * 0.1;
            p.vy = dy * force * 0.1;
        }
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += (p.targetX - p.x) * p.speed + p.vx;
        p.y += (p.targetY - p.y) * p.speed + p.vy;
        p.opacity += 0.02;
    });

    textParticles.forEach(p => {
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += (p.targetX - p.x) * p.speed + p.vx;
        p.y += (p.targetY - p.y) * p.speed + p.vy;
        p.opacity += 0.02;
    });

    drawParticles(particles, "255, 255, 255", true);
    drawParticles(textParticles, "255, 105, 180", true); // Hồng pastel

    requestAnimationFrame(animate);
}

animate();
