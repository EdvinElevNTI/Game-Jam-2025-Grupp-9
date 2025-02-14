const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 200;

        let dinoImg = new Image();
        dinoImg.src = 'shuriken.png';

        let dino = { x: 50, y: 150, width: 40, height: 40, dy: 0, gravity: 0.5, jumpPower: -12, onGround: false };
        let obstacles = [];
        let gameSpeed = 4;
        let score = 0;
        let gameOver = false;

        function drawDino() {
            ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
        }

        function drawObstacles() {
            ctx.fillStyle = "red";
            obstacles.forEach(obstacle => {
                ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });
        }

        function updateDino() {
            dino.dy += dino.gravity;
            dino.y += dino.dy;
            if (dino.y > 150) {
                dino.y = 150;
                dino.dy = 0;
                dino.onGround = true;
            }
        }

        function updateObstacles() {
            for (let i = 0; i < obstacles.length; i++) {
                obstacles[i].x -= gameSpeed;
                if (obstacles[i].x + obstacles[i].width < 0) {
                    obstacles.splice(i, 1);
                    score++;
                }
                if (
                    dino.x < obstacles[i].x + obstacles[i].width &&
                    dino.x + dino.width > obstacles[i].x &&
                    dino.y < obstacles[i].y + obstacles[i].height &&
                    dino.y + dino.height > obstacles[i].y
                ) {
                    gameOver = true;
                }
            }
        }

        // let obstacleCooldown = 0; // Timer to control spawning frequency

        let obstacleCooldown = 0; // Timer to control spawning frequency
      
        function spawnObstacle() {
            if (obstacleCooldown <= 0 && Math.random() < 0.03) { // Lower spawn chance
                obstacles.push({ x: canvas.width, y: 160, width: 20, height: 40 });
                obstacleCooldown = 100; // Prevent spawning for the next 100 frames
            }
            if (obstacleCooldown > 0) obstacleCooldown--; // Decrease cooldown over time
        }

        function spawnObstacleGroup() {
        if (obstacleCooldown <= 0 && Math.random() < 0.03) { // Lower spawn chance
            let numObstacles = Math.floor(Math.random() * 3) + 1; // Random 1 to 3 blocks

            for (let i = 0; i < numObstacles; i++) {
                setTimeout(() => {
                    obstacles.push({ x: canvas.width + i * 25, y: 160, width: 20, height: 40 });
                }, i * 100); // 0.1s (100ms) delay per obstacle
            }

            obstacleCooldown = 100; // Prevent spawning for the next 100 frames
        }
        if (obstacleCooldown > 0) obstacleCooldown--; // Decrease cooldown over time
    }



        function jump() {
            if (dino.onGround) {
                dino.dy = dino.jumpPower;
                dino.onGround = false;
            }
        }

        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") jump();
        });

        function gameLoop() {
            if (gameOver) {
                ctx.fillStyle = "black";
                ctx.font = "30px Arial";
                ctx.fillText("Game Over! Score: " + score, 250, 100);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawDino();
            drawObstacles();
            updateDino();
            updateObstacles();
            spawnObstacle();
            spawnObstacleGroup();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();