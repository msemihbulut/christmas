document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const bouquet = document.getElementById('bouquet');

    // Typewriter Setup
    const msgCard = document.querySelector('.message-card');
    const msgTitle = msgCard.querySelector('h1');
    const msgBody = msgCard.querySelector('p');
    
    // Store original text
    const titleText = msgTitle.innerHTML;
    const bodyText = msgBody.innerHTML;
    
    // Clear text initially
    msgTitle.innerHTML = '';
    msgBody.innerHTML = '';

    // HTML-aware Typewriter Function
    function typeHtml(element, html, speed, callback) {
        let i = 0;
        function type() {
            if (i < html.length) {
                // Check if current char is start of a tag
                if (html.charAt(i) === '<') {
                    let tag = '';
                    // Loop until closing >
                    while (html.charAt(i) !== '>') {
                        tag += html.charAt(i);
                        i++;
                    }
                    tag += '>'; // Add the closing >
                    element.innerHTML += tag;
                    i++;
                } else {
                    element.innerHTML += html.charAt(i);
                    i++;
                }
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    // Envelope Sequence
    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('open-envelope')) return; // Prevent double clicks

        // 1. Open Flap
        envelope.classList.add('open-envelope');

        // 2. Slide Content Up (wait for flap)
        setTimeout(() => {
            envelope.classList.add('slide-up');
            
            // Start Typing animation shortly after slide starts
            setTimeout(() => {
                // Type Title
                typeHtml(msgTitle, titleText, 100, () => {
                   // After Title, Type Body
                   setTimeout(() => {
                       typeHtml(msgBody, bodyText, 30);
                   }, 300);
                });
            }, 600); // Wait for card to be mostly visible
            
        }, 500);

        // 3. Bloom Bouquet (wait for side)
        setTimeout(() => {
            bouquet.classList.add('open');
        }, 1200);
    });

    // Create Snowflakes
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 50;
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Randomize Type
        const type = Math.random();
        let size;
        
        if (type < 0.3) {
             // 30% Standard Dot
             snowflake.classList.add('snow-dot');
             size = Math.random() * 5 + 2 + 'px';
        } else if (type < 0.8) {
             // 50% Snowflake Character (0.3 to 0.8)
             snowflake.classList.add('snow-char');
             snowflake.textContent = '❄';
             size = Math.random() * 10 + 10 + 'px'; // Bigger for text
             snowflake.style.fontSize = size;
        } else {
             // 20% Heart
             snowflake.classList.add('snow-char');
             snowflake.textContent = '❤'; // Or '🤍' for white heart
             snowflake.style.color = '#ff6b6b'; // Light red/pinkish
             size = Math.random() * 10 + 10 + 'px';
             snowflake.style.fontSize = size;
        }
        
        const startLeft = Math.random() * 100 + '%';
        const duration = Math.random() * 5 + 5 + 's'; 
        const delay = Math.random() * 5 + 's';

        snowflake.style.width = size; // Only affects dots, fontSize handles chars
        snowflake.style.height = size; // Only affects dots
        snowflake.style.left = startLeft;
        snowflake.style.animationDuration = duration;
        snowflake.style.animationDelay = delay;

        snowContainer.appendChild(snowflake);
    }

    // --- Celebration Features Extensions ---

    // Music Player Logic
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audio.play().then(() => {
                    musicBtn.textContent = "⏸️ Müziği Durdur";
                    isPlaying = true;
                }).catch(err => {
                    alert("Lütfen klasöre 'song.mp3' adında bir müzik dosyası koyun!");
                    console.error("Müzik hatası:", err);
                });
            } else {
                audio.pause();
                musicBtn.textContent = "🎵 Müzik Başlat";
                isPlaying = false;
            }
        });
    }

    // Countdown Logic (Target: Jan 1, 2026)
    const targetDate = new Date("January 1, 2026 00:00:00").getTime();
    let fireworksStarted = false;

    function updateCountdown() {
        // If element doesn't exist, stop
        if (!document.getElementById("countdown-container")) return;

        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown-container").innerHTML = "<div class='time-box' style='width:auto; padding:10px 20px;'><span>MUTLU YILLAR!</span></div>";
            
            // Trigger Fireworks if not already started
            if (!fireworksStarted) {
                startFireworks();
                fireworksStarted = true;
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if (elDays) elDays.innerText = days < 10 ? "0" + days : days;
        if (elHours) elHours.innerText = hours < 10 ? "0" + hours : hours;
        if (elMinutes) elMinutes.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (elSeconds) elSeconds.innerText = seconds < 10 ? "0" + seconds : seconds;
    }
    // Update every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Shooting Star Randomization
    const star = document.querySelector('.shooting-star');
    if (star) {
        star.addEventListener('animationiteration', () => {
            star.style.top = Math.random() * 30 + '%'; // Random vertical start in top 30%
            star.style.animationDelay = Math.random() * 5 + 's'; // Random delay
        });
    }

    // --- Fireworks Logic ---
    function startFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 4 + 1;
                this.dx = Math.cos(angle) * velocity;
                this.dy = Math.sin(angle) * velocity;
                this.life = 100;
                this.alpha = 1;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
            update() {
                this.x += this.dx;
                this.y += this.dy;
                this.alpha -= 0.01;
                this.life--;
            }
        }

        let particles = [];
        
        function createFirework() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2); // Top half
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#ffd700'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
            ctx.clearRect(0, 0, canvas.width, canvas.height); // No background clear, just transparent overlay? No, we need clean
            // Actually, for trails we use fillRect with low opacity. But we have a background image.
            // If we use fillRect(black), it covers the background.
            // SO we must use clearRect and just clean frames OR accept no trails.
            // Let's use clearRect for transparency to keep the beautiful background.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.draw();
                p.update();
                if (p.life <= 0) particles.splice(index, 1);
            });

            if (Math.random() < 0.05) { // 5% chance per frame (~3 fireworks per second at 60fps)
                createFirework();
            }
        }
        animate();
    }

    // --- Magic Cursor Logic ---
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Limit sparkle creation rate (e.g., one every 50ms)
        if (now - lastSparkleTime > 30) {
            createSparkle(e.clientX, e.clientY);
            lastSparkleTime = now;
        }
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('magic-sparkle');
        
        // Randomize size slightly
        const size = Math.random() * 4 + 3; // 3 to 7px
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random color variation (White to Gold)
        const colors = ['#ffffff', '#fffacd', '#ffd700', '#f0e68c'];
        sparkle.style.boxShadow = `0 0 5px ${colors[Math.floor(Math.random() * colors.length)]}`;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        document.body.appendChild(sparkle);

        // Remove after animation matches CSS (0.8s)
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }

    // --- Interactive Scene Elements ---
    const tree = document.querySelector('.asset-tree');
    const snowman = document.querySelector('.asset-snowman');

    function setupAnimation(element, animClass) {
        if (!element) return;
        
        // Remove class when animation ends to allow re-triggering
        element.addEventListener('animationend', () => {
            element.classList.remove(animClass);
        });

        element.addEventListener('click', () => {
            // If animation is currently playing, we can force restart
            if (element.classList.contains(animClass)) {
                element.classList.remove(animClass);
                void element.offsetWidth; // Force reflow
                element.classList.add(animClass);
            } else {
                element.classList.add(animClass);
            }
        });
    }

    setupAnimation(tree, 'anim-bounce');
    setupAnimation(snowman, 'anim-wiggle');

    // --- Parallax Effect ---
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate offset percentage (Mouse vs Center)
        // Values between -1 and 1
        const xOffset = (x - centerX) / centerX;
        const yOffset = (y - centerY) / centerY;

        // Apply to Layers
        
        // 1. Lights (background-ish, move slightly opposite)
        const lights = document.querySelector('.lights-container');
        if(lights) {
            lights.style.transform = `translate(${xOffset * -10}px, ${yOffset * -5}px)`;
        }

        // 2. Ground Scene (foreground, moves more opposite to create depth)
        const ground = document.querySelector('.ground-scene');
        if(ground) {
             ground.style.transform = `translate(${xOffset * -30}px, ${yOffset * -10}px)`;
        }

        // 3. Envelope (Center focus, subtle movement - maintain centering)
        const centerParams = envelope.parentElement; // .center-stage
        if (centerParams) {
             centerParams.style.transform = `translate(calc(-50% + ${xOffset * -15}px), calc(-50% + ${yOffset * -15}px))`;
        }
        
        // 4. Snow Container (Background, slight movement)
        const snowContainer = document.getElementById('snow-container');
        if (snowContainer) {
             snowContainer.style.transform = `translate(${xOffset * 10}px, ${yOffset * 10}px)`;
        }
    });

});
