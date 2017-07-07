/*jslint evil: true */  
//Possible x and y pixel values
var possibleY = [55, 140, 225, 310];
var possibleX = [0, 100, 200, 300, 400];

//Specifies lives left before game over
var lives = 11;
//Specifies inital score
var score = 0;
// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/Rock.png';
    this.x = -100;
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    this.speed = speed;//for speed
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	//this.x = this.x + (dt * 300 * Math.random());
    //collision engine
	//this.x = this.speed+Math.round(this.x+(dt * 30000));
    this.x = this.x + this.speed * dt;//for speed
    if (this.x - player.x < 50 && this.x - player.x > 0 && this.y === player.y) {
         reset();
    }
    //resets enemys at start after reaching end of board
    if (this.x > 505) {
        this.x = -100;
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    var counterX = 200;
    var counterY = 395;
    this.sprite = 'images/char-princess-girl.png';
    this.x = counterX;
    this.y = counterY;
	
};

Player.prototype.update = function(dt) { 

    if (this.x === key.x && this.y === key.y) {
        this.foundKey();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.foundKey = function(){
    score = score + 1;
    key.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    key.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numKeys = document.getElementById("score");
    numKeys.innerHTML = score;
    if (score === 10) {
        document.write("<center><br><br><h1 style =\"color:blue; background-color:yellow\">YOU WIN!<center></h1>");
    }
};

Player.prototype.handleInput = function(key) {
    switch (key) { 
        case 'up': 
            //checks if player is off the map
            if (this.y === 55) {
                  reset();
            }
            else {
                this.y -= 85;
            }
            break;
        case 'down':
            if (this.y === 395) {
			    
                
            }
            else {
                this.y += 85;
            }
            break;
        case 'left':
            if (this.x === 0) {
                reset();
            }
            else {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x === 400) {
                reset();
            }
            else {
                this.x += 100; 
            }
            
            break;
    }
};

//reset function for when player dies or gets key
var reset =  function (){
    player.x = 200;
    player.y = 395;
    lives = lives - 1;
    var lifeSpanElement = document.getElementById("lives");
    lifeSpanElement.innerHTML = lives;
    if (lives === 0) {
        document.write("<center><br><br><h1 style =\"color:red; background-color:cyan;\">Game Over</h1><h3 style =\"color:red;\">Refresh to play again</h3><center>");
    }
};

var Key = function() {
    this.sprite = 'images/Key.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(200), new Enemy(500), new Enemy(700), new Enemy(400), new Enemy(200)];

var player = new Player();

var key = new Key();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});