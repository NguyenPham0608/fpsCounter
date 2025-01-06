let lastTime = 0;
let fps = 0;
let averageFps = 0;
const fpsDisplay = document.getElementById('fps');
const avgFpsDisplay = document.getElementById('avgFps');
const killSpan = document.getElementById('kill');
const button=document.getElementById('degrade')
let elements = 3

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
        button.style.opacity = 1;
        button.style.display = 'block';

    }
})

button.addEventListener('click', degradePerformance);

let interval;
function degradePerformance() {
    button.style.opacity = 0;
    button.style.display = 'none';
    const container = document.createElement("div");
    document.body.appendChild(container);
    interval = setInterval(() => {
        for (let i = 0; i < 600; i++) {
            const div = document.createElement("div");
            container.appendChild(div);
            elements++
            killSpan.textContent = `Elements: ${elements}`;
        }
        console.log("Added 600 elements.");
    }, 10); // Adds 600 divs every 10ms
}

requestAnimationFrame(calculateFPS); // Start the loop
