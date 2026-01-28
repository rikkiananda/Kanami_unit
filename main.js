/* === PARTICLE SYSTEM === */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "▲■●◆★"; // Icons for editing feel

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
}

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * height; // Start anywhere
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 12 + 8;
        this.speed = Math.random() * 1 + 0.2;
        this.char = Math.random() > 0.8
            ? symbols[Math.floor(Math.random() * symbols.length)]
            : alphabet[Math.floor(Math.random() * alphabet.length)];
        this.opacity = 0;
        this.fadeState = 'in'; // in, hold, out
    }

    update() {
        this.y -= this.speed;

        // Fade Logic
        if (this.fadeState === 'in') {
            this.opacity += 0.01;
            if (this.opacity >= 0.4) this.fadeState = 'hold';
        } else if (this.y < height * 0.2) { // Fade out near top
            this.fadeState = 'out';
        }

        if (this.fadeState === 'out') {
            this.opacity -= 0.01;
        }

        if (this.y < -20 || this.opacity <= 0) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.font = `${this.size}px 'Arial'`;
        ctx.fillText(this.char, this.x, this.y);
    }
}

function initParticles() {
    particles = [];
    const count = width < 600 ? 30 : 60; // Fewer particles on mobile
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Init
resize();
window.addEventListener("resize", resize);
animate();

console.log("Kanami Unit: Particle System Active");


/* === INTERACTIVE GRAPH EDITOR === */
const graphContainer = document.getElementById("graph-container");

if (graphContainer) {
    const svgPath = document.getElementById("graph-path");
    const points = document.querySelectorAll(".graph-point");

    // Store point coordinates
    let pointCoords = [
        { x: 20, y: 80 },
        { x: 200, y: 20 },
        { x: 380, y: 60 }
    ];

    let isDragging = false;
    let dragIndex = -1;

    // 1. Mouse Down on Point
    points.forEach((point, index) => {
        point.addEventListener("mousedown", (e) => {
            isDragging = true;
            dragIndex = index;
            e.preventDefault(); // Prevent text selection
        });

        // Touch support
        point.addEventListener("touchstart", (e) => {
            isDragging = true;
            dragIndex = index;
            e.preventDefault();
        });
    });

    // 2. Mouse Move on Window
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        updatePointPosition(e.clientX, e.clientY);
    });

    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        updatePointPosition(touch.clientX, touch.clientY);
    });

    // 3. Mouse Up
    window.addEventListener("mouseup", () => { isDragging = false; });
    window.addEventListener("touchend", () => { isDragging = false; });

    function updatePointPosition(clientX, clientY) {
        // Get SVG bounding box to calculate relative Y
        const svgRect = graphContainer.querySelector("svg").getBoundingClientRect();

        // ViewBox is 0-100 height. Convert pixels to viewBox units.
        const scaleY = 100 / svgRect.height;
        let newY = (clientY - svgRect.top) * scaleY;

        // Clamp Y between 0 and 100
        newY = Math.max(5, Math.min(95, newY));

        // Update Data
        pointCoords[dragIndex].y = newY;

        // Visual Update
        // Update Circle
        points[dragIndex].setAttribute("cy", newY);

        // Update Path
        updateGraphPath();
    }

    function updateGraphPath() {
        const p = pointCoords;
        // Simple smoothing logic: Control points at X +/- 40% of segment width
        // For a 3-point curve:
        // P0 -> P1 (Cp1 at P0x+offset, P0y. Cp2 at P1x-offset, P1y)
        // P1 -> P2

        const pathData = `
            M ${p[0].x},${p[0].y} 
            C ${p[0].x + 80},${p[0].y} ${p[1].x - 80},${p[1].y} ${p[1].x},${p[1].y}
            C ${p[1].x + 80},${p[1].y} ${p[2].x - 80},${p[2].y} ${p[2].x},${p[2].y}
        `;

        svgPath.setAttribute("d", pathData.trim());
    }
}
