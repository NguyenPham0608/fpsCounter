let lastTime = 0;
let fps = 0;
let averageFps = 0;
const fpsDisplay = document.getElementById('fps');
const avgFpsDisplay = document.getElementById('avgFps');
let kill=2

const fpsArray = [];

function calculateFPS(timestamp) {
    if (lastTime === 0) {
        lastTime = timestamp;
        requestAnimationFrame(calculateFPS);
        return;
    }

    const deltaTime = timestamp - lastTime; // Time passed between frames
    lastTime = timestamp;

    fps = Math.round((1000 / deltaTime)*100)/100; // Calculate FPS
    fpsArray.push(fps);
    if (fpsArray.length > 100) {
        fpsArray.shift();
    }
    averageFps = Math.round(fpsArray.reduce((a, b) => a + b, 0) / fpsArray.length);

    fpsDisplay.textContent = `FPS: ${fps}`; // Display the FPS
    avgFpsDisplay.textContent = `AVERAGE FPS: ${averageFps}`;

    requestAnimationFrame(calculateFPS); // Keep the loop going
}

window.addEventListener('keydown', function(e){
    if (e.key == ' ') {
        degradePerformance()

    }
})
let interval;
function degradePerformance() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    interval = setInterval(() => {
        for (let i = 0; i < 300; i++) {
            const div = document.createElement("div");
            container.appendChild(div);
        }
        console.log("Added 300 elements.");
    }, 10); // Adds 300 divs every 10ms
}

requestAnimationFrame(calculateFPS); // Start the loop
