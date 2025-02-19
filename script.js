document.addEventListener("DOMContentLoaded", function() {
    const heartShape = [
        [50, 15], [30, 10], [20, 20], [15, 35], [20, 50],
        [30, 65], [50, 85], [70, 65], [80, 50], [85, 35],
        [80, 20], [70, 10], [50, 15]
    ];

    const container = document.getElementById("heartContainer");
    const particles = [];

    function createParticles() {
        heartShape.forEach(([x, y]) => {
            let particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = `${Math.random() * window.innerWidth}px`;
            particle.style.top = `${Math.random() * window.innerHeight}px`;
            container.appendChild(particle);
            particles.push({ element: particle, targetX: x, targetY: y });
        });
    }

    function animateParticles() {
        let progress = 0;
        function step() {
            progress += 0.02;
            particles.forEach(({ element, targetX, targetY }) => {
                let startX = parseFloat(element.style.left);
                let startY = parseFloat(element.style.top);
                let endX = (targetX / 100) * window.innerWidth;
                let endY = (targetY / 100) * window.innerHeight;

                let x = (1 - progress) * startX + progress * endX;
                let y = (1 - progress) * startY + progress * endY;

                element.style.transform = `translate(${x - startX}px, ${y - startY}px)`;
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
