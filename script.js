document.addEventListener("DOMContentLoaded", function() {
    const heartShape = [
        [50, 20], [42, 12], [35, 18], [30, 30], [33, 45],
        [40, 55], [50, 70], [60, 55], [67, 45], [70, 30],
        [65, 18], [58, 12], [50, 20]
    ];

    const textShape = [
        [45, 60], [50, 60], [55, 60], // "A"
        [46, 65], [52, 65], [58, 65], // "n"
        [48, 70], [54, 70], [60, 70]  // "h"
    ];

    const container = document.getElementById("heartContainer");
    const textContainer = document.getElementById("textContainer");

    function createParticles(shape, targetContainer, className) {
        shape.forEach(point => {
            let particle = document.createElement("div");
            particle.classList.add(className);
            particle.style.left = `${(point[0] / 100) * window.innerWidth}px`;
            particle.style.top = `${(point[1] / 100) * window.innerHeight}px`;
            targetContainer.appendChild(particle);
        });
    }

    function animateParticles(container, className, delay) {
        let particles = container.getElementsByClassName(className);
        let index = 0;

        function animate() {
            if (index < particles.length) {
                particles[index].style.opacity = 1;
                particles[index].style.transform = "scale(1.3)";
                index++;
                requestAnimationFrame(animate);
            }
        }

        setTimeout(() => animate(), delay);
    }

    createParticles(heartShape, container, "particle");
    createParticles(textShape, textContainer, "text-particle");

    setTimeout(() => animateParticles(container, "particle", 500), 500);
    setTimeout(() => animateParticles(textContainer, "text-particle", 1200), 2000);
});
