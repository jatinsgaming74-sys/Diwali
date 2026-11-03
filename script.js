
const wishForm = document.getElementById("wishForm");

const username = document.getElementById("username");

const welcomeCard = document.getElementById("welcomeCard");

const wishCard = document.getElementById("wishCard");

const nameBefore = document.getElementById("nameBefore");

const nameAfter = document.getElementById("nameAfter");

const againButton = document.getElementById("againButton");


// When user clicks Enter button

wishForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = username.value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    // Display user's name

    nameBefore.textContent = "Dear " + name + ",";

    nameAfter.textContent = name;

    // Hide welcome page

    welcomeCard.classList.add("hidden");

    // Show Diwali wishes

    wishCard.classList.remove("hidden");

    // Start fireworks

    celebrate();

});


// Create another wish button

againButton.addEventListener("click", function() {

    wishCard.classList.add("hidden");

    welcomeCard.classList.remove("hidden");

    username.value = "";

    username.focus();

});


// Fireworks Animation

const canvas = document.getElementById("fireworks");

const ctx = canvas.getContext("2d");

let particles = [];

let rockets = [];

let width;
let height;

function resizeCanvas() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();


const colors = [
    "#ffd166",
    "#ff5733",
    "#ff8cdb",
    "#70e1ff",
    "#ffffff",
    "#c5a3ff"
];


// Create firework explosion

function createExplosion(x, y) {

    const color = colors[
        Math.floor(Math.random() * colors.length)
    ];

    const totalParticles = 75;

    for (let i = 0; i < totalParticles; i++) {

        const angle = Math.PI * 2 * i / totalParticles;

        const speed = 1 + Math.random() * 4;

        particles.push({

            x: x,
            y: y,

            vx: Math.cos(angle) * speed,

            vy: Math.sin(angle) * speed,

            life: 90,

            color: color,

            size: 2 + Math.random() * 2

        });

    }

}


// Launch rocket

function launchRocket() {

    rockets.push({

        x: width * (0.1 + Math.random() * 0.8),

        y: height,

        targetY: height * (0.15 + Math.random() * 0.4),

        speed: 6 + Math.random() * 3

    });

}


// Special celebration when user enters name

function celebrate() {

    for (let i = 0; i < 12; i++) {

        setTimeout(function() {

            createExplosion(

                width * (0.1 + Math.random() * 0.8),

                height * (0.15 + Math.random() * 0.5)

            );

        }, i * 250);

    }

}


// Animation loop

let frame = 0;

function animate() {

    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(9, 8, 23, 0.18)";

    ctx.fillRect(0, 0, width, height);

    frame++;

    // Automatically launch fireworks

    if (frame % 55 === 0) {

        launchRocket();

    }


    // Rocket animation

    rockets = rockets.filter(function(rocket) {

        rocket.y -= rocket.speed;

        ctx.beginPath();

        ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);

        ctx.fillStyle = "#ffe7a1";

        ctx.fill();

        if (rocket.y <= rocket.targetY) {

            createExplosion(rocket.x, rocket.y);

            return false;

        }

        return true;

    });


    // Particle animation

    particles = particles.filter(function(p) {

        return p.life > 0;

    });


    particles.forEach(function(p) {

        p.x += p.vx;

        p.y += p.vy;

        p.vy += 0.025;

        p.life--;

        ctx.globalAlpha = Math.max(p.life / 90, 0);

        ctx.fillStyle = p.color;

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}

animate();
