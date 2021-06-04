console.log("attack")

const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;

context.canvas.width = 800;

// Player
const player = {
    height: 64,
    jumping: true,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0
}

// Set up the controller
const controller = {
    left: false,
    right: false,
    up: false,
    space: false,

    keyListener: function (event) {

        let key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {
            case 37:
                controller.left = key_state;
                break;
            case 38:
                controller.up = key_state;
                break;
            case 32:
                controller.space = key_state;
                break;
            case 39:
                controller.right = key_state;
                break
        }
    }
}



const loop = () => {

    // Linear Gradient Background
    const gradient = context.createLinearGradient(0, 200, 0, 0)
    gradient.addColorStop(0, "yellow")
    gradient.addColorStop(1, "red")
    context.fillStyle = gradient
    context.fillRect(0, 0, 800, 400)

    // Ground
    context.strokeStyle = "black"
    context.lineWidth = 80;
    context.beginPath()
    context.moveTo(0, 360)
    context.lineTo(800, 360)
    context.stroke()


    // Draw Player
    context.fillStyle = "#8DAA9D"; // hex for cube color
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    // context.rect(square.x, square.y, head.height, body.width)
    context.fill();

    if (controller.up && player.jumping == false) {
        player.yVelocity -= 20;
        player.jumping = true;
    }
    if (controller.left) {
        player.xVelocity -= 0.5;
    }
    if (controller.right) {
        player.xVelocity += 0.5;
    }
    player.yVelocity += 1.5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    if (player.y > 338 - 16 - 64) {
        player.jumping = false;
        player.y = 338 - 16 - 64;
        player.yVelocity = 0;
    }



    // Level Display
    context.font = "25px Arial";
    context.fillStyle = "black"
    context.fillText(`Sean's Webpage`, 25, 50);



    window.requestAnimationFrame(loop)

}
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener)


window.requestAnimationFrame(loop)