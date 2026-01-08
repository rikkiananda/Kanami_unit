const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function draw() {
    // CLEAR transparan, TIDAK hitam
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";
    ctx.fillStyle = "rgba(255, 217, 61, 0.5)"; // #FFD93D dengan opacity 30%

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);
