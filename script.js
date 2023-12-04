 






var boughtAC = false;
    var EnabledAC = false;
    var AC;
    function buyAutoClick() {
        if (boughtAC === false) {
            if (Clicks >= 400) {
                Clicks -= 400;
                boughtAC = true;
                AC = document.getElementById("AutoClicker");
                AC.style.display = "block";
                alert("Just Bought Auto Clicker\nEnable in Menu");
            }
            else {
                alert("Can't Afford\nGet Better")
            }
        }
        else {
            alert("Already Purchased");
        }
    }
        //Click Speed
        var CMax = 1;
        var CPrice = 25;
        var CCurrent = 1;


        function UpdateSpeedText() {
            var SpeedCheck = document.getElementById("ClickSped");
            SpeedCheck.innerHTML = "LVL " + CCurrent + "/" + CMax;

            SpeedCheck = document.getElementById("UpgradeCS");
            SpeedCheck.innerHTML = CPrice + "Clicks";

            var OtherCheck = document.getElementById("ClickSpeedA").innerHTML = '-';
            OtherCheck = document.getElementById("ClickSpeedB").innerHTML = '+';
            
        }

        function LowerSpeed() {
            if (CCurrent > 1) {
                CCurrent -= 1;
                UpdateSpeedText();
                UpdateSpeed();
            } else {
                alert("At Minimum Speed");
            }
        }

        function IncreaseSpeed() {
            if (CCurrent < CMax) {
                CCurrent += 1;
                UpdateSpeedText();
                UpdateSpeed();
            }
            if (CCurrent === CMax) {
                alert("At Maximum Speed\nBuy More");
            }
        }
        
        
        
        function BuySpeed() {
            if (Clicks >= CPrice) {
                Clicks -= CPrice;
                CMax += 1;
                CPrice = Math.round(CPrice * 1.1);
                UpdateSpeedText();
                updateCubeCounter();
            }
            else {
                alert("Can't afford upgrade.");
            }
        }

        //Beats Per Minute
        var BPM = document.getElementById("BPM");
        var bpm = 0;
        var Bpm = document.getElementById("BPMLabel");
        BPM.addEventListener("input", changeBPM);
        Bpm.innerHTML = "BPM:" + BPM.value;

        function changeBPM() {
            bpm = BPM.value;
            Bpm.innerHTML = "BPM:" + BPM.value;
        }
delay
        function help() {
            alert("Controls:\nPress Space to Explode Cube\nPress R to Reset\nUse Mouse to Look Around\n Press Q To Pause The Cube\nPress E To Change The Cubes Color\nSet BPM To Song BPM Before Uploading");
        }

        function buyColorChanger() {
            if (Clicks >= 200) {
                if (boughtCG === true) {
                    alert("You already own this.")
                } else {
                    alert("Just Bought Color Changer\nEnable In Menu");
                    Clicks -= 200;
                    boughtCG = true;
                    updateCubeCounter();
                    CG = document.getElementById('ColorChanger');

                    CG.style.display = "block";

                    CG = document.getElementById('BPMSlider');
                    CG.style.display = "block";
                }
            } else {
                alert("Can't Afford Color Changer\nScrub")
            }
        }

        function buyWireFrame() {
            if (Clicks >= 250) {
                if (boughtWF === true) {
                    alert("You already own this.")
                } else {
                    boughtWF = true;
                    alert("Just Bought Wire Frame\nEnable In Menu");
                    Clicks -= 250;
                    updateCubeCounter();
                    CG = document.getElementById('WireFrame');
                    CG.style.display = "block";
                }
            } else {
                alert("Can't Afford Wire Frame\nNerd")
            }
        }

        function buyAudio() {
            if (Clicks >= 300) {
                if (boughtAP === true) {
                    alert("You already own this.")
                } else {
                    alert("Just Bought Audio Upload\nEnable In Menu");
                    Clicks -= 300;
                    var boughtAP = true;
                    updateCubeCounter();
                    CG = document.getElementById('AudioUpload');
                    CG.style.display = "block";
                }
            } else {
                alert("Can't Afford Audio Upload\nFooking Muppet")
            }
        }

        function buyImage() {
            if (Clicks >= 300) {
                if (boughtIU === true) {
                    alert("You already own this.")
                } else {
                    alert("Just Bought Image Upload\nEnable In Menu");
                    Clicks -= 300;
                    boughtUI = true;
                    updateCubeCounter();
                    CG = document.getElementById('FileUpload');
                    CG.style.display = "block";
                }
            } else {
                alert("Can't Afford Image Upload\nFooking Muppet")
            }
        }


        //Set up shop
        Shop = document.getElementById('Shop');

        function openShop() {
            Shop.style.display = "block";
        }

        function ExitShop() {
            Shop.style.display = "none";
        }
        
        function HandleAutoClick() {
            const AutoTime = Date.now();
            AutoClickEnabled();
            if ( AutoTime - delayA >= lastTimeA && EnabledAC) {
                explodeCube();
                lastTimeA = AutoTime;
            }
        }
        
        function AutoClickEnabled() {
            AutoClick = document.getElementById("autoClickToggle");
            if (AutoClick.checked) {
                EnabledAC = true;
            }
            else {
                EnabledAC = false;
            }
        }

        // Set up the scene
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('game-container').appendChild(renderer.domElement);

        // Create a cube
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        var cube = new THREE.Mesh(geometry, material);
        var player = new THREE.Mesh(geometry, material);
    
        scene.add(cube);
        scene.add(player);   
        player.position.z = 7;
        camera.position.z = player.position.z;

        var floorgeometry = new THREE.PlaneGeometry( 10, 10 );
        var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide} );
        var floorplane = new THREE.Mesh( floorgeometry, material );
        floorplane.position.y -= 1;
        floorplane.rotation.x = 90;
        scene.add(floorplane);

   

        // Game controls
        var isSpinning = true;
        var isColorChanging = false;
        var isWireframe = false;
        var moveForward = false;
        var moveBackward = false;
        var moveLeft = false;
        var moveRight = false;
        var boughtCG = false;
        var boughtWF = false;
        var boughtAU = false;
        var boughtIU = false;

        //Handle Time
        let lastTime = 0;
        var delay = 500;
        
        //Handle Auto Time
        let lastTimeA= 0;
        var delayA = 500;

        var lastColorChangeTime = Date.now();
        var cubeCounter = 0;
        var Clicks = 0;

        // Create the cube counter element
        var counterElement = document.createElement('div');
        counterElement.id = 'counter';
        counterElement.style.position = 'absolute';
        counterElement.style.top = '10px';
        counterElement.style.right = '10px';
        counterElement.style.color = 'white';
        counterElement.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(counterElement);

        //Create the current clicks element
        var currentClicks = document.createElement('div');
        currentClicks.id = 'counter';
        currentClicks.style.position = 'absolute';
        currentClicks.style.top = '30px';
        currentClicks.style.right = '10px';
        currentClicks.style.color = 'gold';
        currentClicks.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(currentClicks);

        // Update the cube counter
        function updateCubeCounter() {
            counterElement.textContent = 'Total Clicks: ' + cubeCounter;
            currentClicks.textContent = 'Current Clicks: ' + Clicks;
        }


        function cheatCode() {
            var UserInput = prompt("Please Enter Clicks:");
            Clicks = UserInput;
        }

        // Handle key press event
        function handleKeyPress(event) {
            switch (event.keyCode) {
                case 81: // Q key
                    isSpinning = !isSpinning;
                    break;
                case 69: // E key
                    cube.material.color.setHex(Math.random() * 0xffffff);
                    break;
                case 32: // Space key
                    const CurrentTime = Date.now();
                    if (CurrentTime - delay >= lastTime) {
                        explodeCube();
                        lastTime = CurrentTime;
                    } else return;

                    break;
                case 82: // R key
                    resetScene();
                    break;
                case 80: // P key
                    cheatCode();
                    break;
                case 85: // U key
                    document.getElementById('audio-upload').click();
                    break;
                case 87: // W key
                    moveForward = true;
                    break;
                case 83: // S key
                    moveBackward = true;
                    break;
                case 65: // A key
                    moveLeft = true;
                    break;
                case 68: // D key
                    moveRight = true;
                    break;
            }
        }

        // Handle key release event
        function handleKeyRelease(event) {
            switch (event.keyCode) {
                case 87: // W key
                    moveForward = false;
                    break;
                case 83: // S key
                    moveBackward = false;
                    break;
                case 65: // A key
                    moveLeft = false;
                    break;
                case 68: // D key
                    moveRight = false;
                    break;
            }
        }

        // Handle color toggle change event
        function handleColorToggle() {
            isColorChanging = document.getElementById('color-toggle').checked;
        }

        // Handle wireframe toggle change event
        function handleWireframeToggle() {
            isWireframe = document.getElementById('wireframe-toggle').checked;
            cube.material.wireframe = isWireframe;
        }
        
        function UpdateSpeed() {
            if (CCurrent > 1){
                delay=500;
            delay -= (0.03*CCurrent*1000);
        }
        else {
            delay = 500;
        }
        }

        // Handle image upload event
        function handleImageUpload(event) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var image = document.createElement('img');
                image.onload = function() {
                    var texture = new THREE.Texture(image);
                    texture.needsUpdate = true;
                    cube.material.map = texture;
                    cube.material.needsUpdate = true;
                };
                image.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        var audioU = false;
        // Handle audio upload event
        function handleAudioUpload(event) {
            audioU = true;
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var audio = document.getElementById('audio-player');
                audio.src = e.target.result;
                audio.load();
                audio.play();
            };
            reader.readAsDataURL(file);
        }

        // Toggle audio playback
        function toggleAudioPlayback() {
            var audio = document.getElementById('audio-player');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        }

        // Explode the cube into smaller cubes
        function explodeCube() {
            scene.remove(cube);
            var cubes = [];
            var explosionStrength = 0.4;
            for (var i = 0; i < 50; i++) {
                var newCube = new THREE.Mesh(geometry, material.clone());
                newCube.position.set(cube.position.x, cube.position.y, cube.position.z);
                var direction = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
                direction.normalize();
                direction.multiplyScalar(explosionStrength);
                newCube.velocity = direction;
                cubes.push(newCube);
                scene.add(newCube);
            }
            cubeCounter++;
            Clicks++;
            updateCubeCounter();
            animateExplosion(cubes);
        }

        // Animate the explosion
        function animateExplosion(cubes) {
            var explosionDuration = 5000;
            var startTime = Date.now();

            function update() {
                var elapsedTime = Date.now() - startTime;
                if (elapsedTime >= explosionDuration) {
                    for (var i = 0; i < cubes.length; i++) {
                        scene.remove(cubes[i]);
                    }
                    scene.add(cube);
                } else {
                    for (var i = 0; i < cubes.length; i++) {
                        var newCube = cubes[i];
                        newCube.position.add(newCube.velocity);
                    }
                    requestAnimationFrame(update);
                }
            }
            update();
        }

        // Reset the scene
        function resetScene() {
            cube.position.set(0, 0, 0);
            cube.material.color.setHex(0x00ff00);
            cube.material.map = null;
            cube.material.needsUpdate = true;
            cube.material.wireframe = false;
            isSpinning = true;
            isColorChanging = false;
            isWireframe = false;
            updateCubeCounter();
        }

        // Event listeners
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyRelease);
        document.getElementById('color-toggle').addEventListener('change', handleColorToggle);
        document.getElementById('wireframe-toggle').addEventListener('change', handleWireframeToggle);
        document.getElementById('image-upload').addEventListener('change', handleImageUpload);
        document.getElementById('audio-upload').addEventListener('change', handleAudioUpload);

        var gameContainer = document.getElementById('game-container');
        var isMouseLocked = false;
        var rotationSpeed = 0.002;
        var moveSpeed = 0.1;
        var moveForward = false;
        var moveBackward = false;
        var moveLeft = false;
        var moveRight = false;

        // Handle mouse movement
        function handleMouseMove(event) {
            if (isMouseLocked) {
                var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

                // Limit vertical rotation
                var maxRotationX = Math.PI / 2 - 0.01; // 89 degrees
                camera.rotation.x -= movementY * rotationSpeed;
                camera.rotation.x = Math.max(-maxRotationX, Math.min(maxRotationX, camera.rotation.x));

                // Horizontal rotation
                camera.rotation.y -= movementX * rotationSpeed;
            }
        }

        document.addEventListener('mousemove', handleMouseMove);

        // Lock and hide the mouse cursor on click
        function lockAndHideMouse() {
            if (!isMouseLocked) {
                gameContainer.requestPointerLock = gameContainer.requestPointerLock || gameContainer.mozRequestPointerLock || gameContainer.webkitRequestPointerLock;
                gameContainer.requestPointerLock();
                gameContainer.style.cursor = 'none';
            } else {
                document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
                document.exitPointerLock();
                gameContainer.style.cursor = 'auto';
            }

            isMouseLocked = !isMouseLocked;
        }

        gameContainer.addEventListener('click', lockAndHideMouse);


        // Update camera position based on WASD keys
        function updateCameraPosition() {
            if (moveForward) {
                camera.position.add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(moveSpeed));
            }
            if (moveBackward) {
                camera.position.sub(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(moveSpeed));
            }
            if (moveLeft) {
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
                camera.position.add(direction.multiplyScalar(moveSpeed));
            }
            if (moveRight) {
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
                camera.position.add(direction.multiplyScalar(moveSpeed));
            }
        }

 

        // Render loop
        function animate() {
            requestAnimationFrame(animate);

            if (isSpinning) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
            if (audioU === true) {
                cube.material.color.setHex(Math.random() * 0xffffff);
                lastColorChangeTime = Date.now();
                audioU = false;
            } else if (isColorChanging && Date.now() - lastColorChangeTime > Math.round(60 / BPM.value * 1000)) {
                cube.material.color.setHex(Math.random() * 0xffffff);
                lastColorChangeTime = Date.now();
            }
            
            HandleAutoClick();
            

            updateCameraPosition();

            renderer.render(scene, camera);
        }

        animate();
