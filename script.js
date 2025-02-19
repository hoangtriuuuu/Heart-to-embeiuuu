document.addEventListener("DOMContentLoaded", function() {
    const heartShape = [
        [50, 20], [40, 10], [30, 15], [25, 25], [28, 40],
        [35, 55], [50, 75], [65, 55], [72, 40], [75, 25],
        [70, 15], [60, 10], [50, 20]
    ];

    const textShape = [
        [40, 60], [45, 60], [50, 60], [55, 60], [60, 60],  // "A"
        [42, 65], [48, 65], [52, 65], [58, 65], [62, 65],  // "n"
        [44, 70], [50, 70], [54, 70], [60, 70], [64, 70],  // "h"
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
        setTimeout(() => {
            let particles = container.getElementsByClassName(className);
            Array.from(particles).forEach(particle => {
                particle.style.opacity = 1;
                particle.style.transform = "scale(1.2)";
            });
        }, delay);
    }

    createParticles(heartShape, container, "particle");
    createParticles(textShape, textContainer, "text-particle");

    setTimeout(() => animateParticles(container, "particle", 500), 500);
    setTimeout(() => animateParticles(textContainer, "text-particle", 1500), 2000);
});
