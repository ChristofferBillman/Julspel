// Canvas setup
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

//Initial variable setup.
var score = 0;

var down = false;
var up = false;
var right = false;

// src is a a string with the source of png. x and y are integers which are the coordinates it should be drawn at.
// DrawOnLoad defines if that object is to be drawn onload.
// pkg is a boolean which defines if a texture is a package or not.
class Texture {
    constructor(src, x, y,drawOnLoad, pkg) {
      this.image = new Image();
      this.image.src = src;
      this.x = x * 10;
      this.y = y * 10;
      this.drawOnLoad = drawOnLoad;
      if (pkg) {
          // 0 is a pkg that shouldn't be pressed.
        this.press = 1;
        // 0 is up, 1 is right, 2 is down.
        this.direction = 0;
      }
    }
    behaviour () { 
    }
}

// Object 'textures' contains all instances of the Texture class. 
var textures = {
    bg: new Texture("textures/bg.png",0,0, true, false),
    conveyorLeft: new Texture("textures/conveyorLeft.png", 0, 12,true,false),
    conveyorRight: new Texture("textures/conveyorRight.png",38,12,true,false),
    conveyorBtm: new Texture("textures/conveyorBtm.png",26,23,true,false),
    conveyorTop: new Texture("textures/conveyorTop.png",26,0,true,false),
    press: new Texture("textures/press.png",1,-14,false,false),
    package: new Texture("textures/package.png",-10,7,false,true),
    x: new Texture("textures/x.png",11, 1,false,false),
    up: new Texture("textures/up.png",21, 1,false,false),
    right: new Texture("textures/right.png",42, 22,false,false),
    down: new Texture("textures/down.png",21, 26,false,false),
}

// Eventlistener
document.addEventListener("keydown", function(e) {
    console.log(e.key);
	if (e.key == 'x') {
        // What happens when z is pressed.
        textures.press.y = -8 * 10;
    } 
    if(e.key == 'ArrowDown') {
        // What happens when down arrow is pressed.
        down = true;
    } 
    if(e.key == 'ArrowRight') {
        // What happens when right arrow is pressed.
        right = true;
    }
    if(e.key == 'ArrowUp') {
        // What happens when up arrow is pressed.
        up = true;
    }
}, false);

textures.press.behaviour = () => {
    // The behaviour should define the default state of the object.
    if(textures.press.y > -14 * 10) {
        textures.press.y -= 7;
    }
}
textures.package.behaviour = () => {
    if (textures.package.x > 10 * 48 || -15 * 10 > textures.package.y || textures.package.y > 32 * 10) {
        down = false;
        up = false;
        right = false;
        textures.package.x = -15 * 10;
        textures.package.y = 8 * 10;

        this.press = Math.round(Math.random());
        this.direction = Math.round(3 * Math.random());
    }
    // Controls behavior depending on what key was pressed.
    if (textures.package.x < 26 * 10) { 
        textures.package.x = textures.package.x+2;
    } else if(down) {
        textures.package.y = textures.package.y+2;
    } else if(up) {
        textures.package.y = textures.package.y-2;
    }  else if (right) {
        textures.package.x = textures.package.x+2;
    }

    // Fix score counter.
    if (textures.package.direction == 0 && up) { 
        score++;
    } else if(textures.package.direction == 1 && right) {
        score++;
    } else if(textures.package.direction == 2 && down) {
        score++;
    } 
}

window.requestAnimationFrame(draw);

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    // Draw on load. A loop that draws all objects with drawOnLoad = true.
    for(texture in textures) {
            texture = textures[texture];

            if(texture.drawOnLoad) {
                ctx.drawImage(texture.image, texture.x, texture.y, texture.image.width * 10, texture.image.height * 10);
        }
    }

    ctx.drawImage(textures.package.image, textures.package.x,textures.package.y, textures.package.image.width * 5, textures.package.image.height * 5);

    //Behaviours.
    textures.package.behaviour();
    textures.press.behaviour();

    // Drawing of textures with different scaling factor than 10.
    ctx.drawImage(textures.press.image, textures.press.x, textures.press.y, textures.press.image.width * 10, textures.press.image.height * 10);
    ctx.drawImage(textures.x.image, textures.x.x, textures.x.y, textures.x.image.width * 2, textures.x.image.height * 2);
    ctx.drawImage(textures.up.image, textures.up.x, textures.up.y, textures.up.image.width * 2, textures.press.image.height * 2);
    ctx.drawImage(textures.right.image, textures.right.x, textures.right.y, textures.right.image.width * 2, textures.right.image.height * 2);
    ctx.drawImage(textures.down.image, textures.down.x, textures.down.y, textures.down.image.width * 2, textures.down.image.height * 2);

    window.requestAnimationFrame(draw);
}
function shortenTexture(path) {
    
    return 
}

/*function animate(texture, time,x,y) {
    if (completed) return;

    frames = time / 16;
    x = x * 10;
    y = y * 10;

    var deltaX = x / frames;
    var deltaY = y / frames;

    if(index > frames) {
        var completed = true; 
    }

        if(!completed) {
            texture.x += deltaX;
            texture.y += deltaY;
        index++;
    }
    }
    */

