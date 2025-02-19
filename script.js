document.addEventListener("DOMContentLoaded", function() {
    const heartShape = [
        [50, 20], [40, 10], [30, 15], [25, 25], [28, 40],
        [35, 55], [50, 75], [65, 55], [72, 40], [75, 25],
        [70, 15], [60, 10], [50, 20]
    ];

    const container = document.getElementById("heartContainer");
    const particles = [];
    const numParticles = 100; // Tăng số lượng hạt sáng

    function createParticles() {
        for (let i = 0; i < numParticles; i++) {
            let particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${Math.random() * window.innerWidth}px`;
            particle.style.top = `${Math.random() * window.innerHeight}px`;
            container.appendChild(particle);
            particles.push(particle);
        }
    }

    function animateParticles() {
        let progress = 0;
        function step() {
            progress += 0.02;
            particles.forEach((particle, index) => {
                let target = heartShape[index % heartShape.length];
                let endX = (target[0] / 100) * window.innerWidth;
                let endY = (target[1] / 100) * window.innerHeight;

                let startX = parseFloat(particle.style.left);
                let startY = parseFloat(particle.style.top);

                let x = (1 - progress) * startX + progress * endX;
                let y = (1 - progress) * startY + progress * endY;

                particle.style.transform = `translate(${x - startX}px, ${y - startY}px) scale(${1.2 - progress * 0.2})`;
                particle.style.opacity = Math.max(0.5, 1 - progress);
            });

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                document.getElementById("heartText").style.opacity = 1;
            }
        }
        step();
    }

    createParticles();
    setTimeout(animateParticles, 500);
});
