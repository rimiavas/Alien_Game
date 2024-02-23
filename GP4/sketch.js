/*
	The Game Project Part 4 - Character Interaction
*/

var gameChar_x; // The x position of the game character.
var gameChar_y; // The y position of the game character.
var floorPos_y; // The y position of the ground.

var canyonss; // The canyon objects in the game.
var collectables; // The collectable objects in the game.
var flagpole; // The flagpole object in the game.
var trees_x; // The x positions of the trees.
var trees_y; // The y positions of the trees.
var clouds; // The cloud objects in the game.
var mountains; // The mountain objects in the game.

var cameraPosX; // The x position of the camera.

//interaction variables
var isLeft; // Whether the character is moving left.
var isRight; // Whether the character is moving right.
var isFalling; // Whether the character is falling.
var isPlummeting; // Whether the character is plummeting.

//jump variables
var jumpHeight; // The height of the character's jump.
var gravity; // The speed at which the character falls.
var speed; // The speed at which the character moves.

var gameOver; // Whether the game is over.
var levelComplete; // Whether the level is complete.

var gameScore; // The player's current score.


function setup() {
    noStroke();
    // Create canvas with width 1024 and height 576
    createCanvas(1024, 576);
    // Set the position of the floor
    floorPos_y = height * 3 / 4;
    // Set the initial position of the game character
    gameChar_x = width / 10;
    gameChar_y = floorPos_y;

    // Set the initial positions of the canyons
    canyons = [{
        x_pos: 675,
        width: 150
    }, {
        x_pos: 1600,
        width: 150
    }, {
        x_pos: 2600,
        width: 150
    }];

    // Set the initial direction of the game character
    isLeft = false;
    isRight = false;
    // Set the initial falling status of the game character
    isFalling = false;
    isPlummeting = false;

    // Set the initial jump height and gravity of the game character
    jumpHeight = 200;
    gravity = 5;
    // Set the initial speed of the game character
    speed = 4;

    // Set the initial positions of the collectables
    collectables = [{
        x_pos: 375,
        y_pos: floorPos_y,
        isFound: false,
        size: 58
    }, {
        x_pos: 1075,
        y_pos: floorPos_y,
        isFound: false,
        size: 58
    }, {
        x_pos: 1775,
        y_pos: floorPos_y,
        isFound: false,
        size: 58
    }, {
        x_pos: 2475,
        y_pos: floorPos_y,
        isFound: false,
        size: 58
    }];

    // Set the initial position of the flagpole
    flagpole = {
        x_pos: 2950,
        y_pos: floorPos_y,
        isReached: false,
    }

    // Set the initial positions of the trees
    trees_x = [-1500, 100, 600, 900, 1200, 1500, 1800, 2100, 2400, 2875, 3050];
    trees_y = floorPos_y;

    // Set the initial positions of the clouds
    clouds = [{
        x_pos: 186,
        y_pos: 75
    }, {
        x_pos: 475,
        y_pos: 90

    }, {
        x_pos: 700,
        y_pos: 60
    }, {
        x_pos: 1000,
        y_pos: 75
    }, {
        x_pos: 1300,
        y_pos: 90

    }, {
        x_pos: 1500,
        y_pos: 60
    }, {
        x_pos: 1800,
        y_pos: 75
    }, {
        x_pos: 2100,
        y_pos: 90
    }, {
        x_pos: 2400,
        y_pos: 60
    }, {
        x_pos: 2700,
        y_pos: 75
    }, {
        x_pos: 2950,
        y_pos: 90
    }];


    // Set the initial positions of the mountains
    mountains = [{
        x_pos: 320,
        y_pos: 432
    }, {
        x_pos: 1300,
        y_pos: 432
    }, {
        x_pos: 2280,
        y_pos: 432
    }, {
        x_pos: 3260,
        y_pos: 432
    }];

    // Set the initial camera position
    cameraPosX = 0;

    // Set the initial gameOver and levelComplete 
    gameOver = false;
    levelComplete = false;
    // Set the initial game score to 0
    gameScore = 0;
    noStroke();

}

function draw() {
    // Update the camera position based on the game character's position
    if (gameChar_x > width * 0.2) {
        cameraPosX = gameChar_x - 200;
        noStroke();

    }

    ///////////DRAWING CODE//////////

    background(133, 212, 228); //fill the sky blue
    noStroke();
    fill(237, 201, 175);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

    // Translate the canvas to simulate camera movement
    push();
    translate(-cameraPosX, 0)

    // Loop through the mountains array and draw each mountain
    for (var i = 0; i < mountains.length; i++) {
        // Set the stroke weight to 2
        strokeWeight(2);

        // Set the stroke color to black
        stroke(0);

        // Set the fill color of the first triangle to a gradient of colors, with a dark color on the bottom, a medium color in the middle, and a light color on the top
        fill(210, 180, 140);
        triangle(mountains[i].x_pos - 320, mountains[i].y_pos, mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 30, mountains[i].y_pos - 212);

        // Set the fill color of the second triangle to a gradient of colors, with a dark color on the bottom, a medium color in the middle, and a light color on the top
        fill(244, 164, 96);
        triangle(mountains[i].x_pos, mountains[i].y_pos, mountains[i].x_pos + 325, mountains[i].y_pos, mountains[i].x_pos + 30, mountains[i].y_pos - 212);
        noStroke();
    }

    noStroke();
    /*cloud drawing*/
    for (var i = 0; i < clouds.length; i++) {
        // right side of cloud
        fill(200, 200, 200); // Set the fill color to a light grey.
        ellipse(clouds[i].x_pos + 84, clouds[i].y_pos - 20, 50);
        ellipse(clouds[i].x_pos + 74, clouds[i].y_pos, 50);
        ellipse(clouds[i].x_pos + 103, clouds[i].y_pos, 50);
        //left side of cloud
        fill(255, 255, 255); // Set the fill color to white.
        ellipse(clouds[i].x_pos, clouds[i].y_pos, 50);
        ellipse(clouds[i].x_pos + 26, clouds[i].y_pos - 22, 50);
        ellipse(clouds[i].x_pos + 54, clouds[i].y_pos - 25, 50);
        ellipse(clouds[i].x_pos + 24, clouds[i].y_pos, 50);
        ellipse(clouds[i].x_pos + 50, clouds[i].y_pos, 50);
        //right side cloud shading.
        fill(255, 255, 255, 230); // Set the fill color to a transparent white.
        ellipse(clouds[i].x_pos + 84, clouds[i].y_pos - 20, 50);
        ellipse(clouds[i].x_pos + 74, clouds[i].y_pos, 50);
        ellipse(clouds[i].x_pos + 103, clouds[i].y_pos, 50);
        noStroke();
    }



    // Loop through the trees_x array and draw each tree
    for (var i = 0; i < trees_x.length; i++) {

        fill(153, 61, 0); // different shades of brown for treee stumps
        rect(trees_x[i], trees_y - 40, 40, 40, 10); // tree stump
        fill(179, 71, 0);
        rect(trees_x[i], trees_y - 76, 40, 40, 10); // tree stump
        fill(204, 82, 0);
        rect(trees_x[i], trees_y - 110, 40, 40, 10); // tree stump
        fill(230, 92, 0);
        rect(trees_x[i], trees_y - 146, 40, 40, 10); // tree stump

        // leaves drawing for the tree
        fill(51, 102, 0); //leaves colour
        beginShape();
        vertex(trees_x[i] + 19, trees_y - 146);
        vertex(trees_x[i] - 46, trees_y - 126);
        vertex(trees_x[i] - 90, trees_y - 146);
        vertex(trees_x[i] - 46, trees_y - 166);
        vertex(trees_x[i] + 19, trees_y - 146);
        // last leaf
        vertex(trees_x[i] + 84, trees_y - 126);
        vertex(trees_x[i] + 128, trees_y - 146);
        vertex(trees_x[i] + 84, trees_y - 166);
        vertex(trees_x[i] + 19, trees_y - 146);
        // middle leaf
        vertex(trees_x[i], trees_y - 210);
        vertex(trees_x[i] + 19, trees_y - 250)
        vertex(trees_x[i] + 39, trees_y - 210)
        vertex(trees_x[i] + 19, trees_y - 146);
        endShape();

        // Draw the inner part of the leaves
        fill(116, 181, 96); // different shade of green for the leaves
        beginShape();
        // Second leaf
        vertex(trees_x[i] + 19, trees_y - 146);
        vertex(trees_x[i] - 46, trees_y - 166);
        vertex(trees_x[i] - 60, trees_y - 230);
        vertex(trees_x[i], trees_y - 210);
        // Fourth leaf
        vertex(trees_x[i] + 19, trees_y - 146);
        vertex(trees_x[i] + 84, trees_y - 166);
        vertex(trees_x[i] + 100, trees_y - 230);
        vertex(trees_x[i] + 39, trees_y - 210)
        endShape();
    }

    // Loop through the canyons array and draw each canyon

    for (var i = 0; i < canyons.length; i++) {
        noStroke();
        fill(208, 114, 47);
        rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height - floorPos_y);
    }

    // Loop through the collectables array and draw each collectable
    //when collectables not found the drawing is shown .
    for (var i = 0; i < collectables.length; i++) {
        var collectable = collectables[i];
        if (!collectable.isFound) {
            // bread
            fill(198, 137, 88); // bread colour
            ellipse(collectable.x_pos, collectable.y_pos - 20, collectable.size, collectable.size / 2);

            // bread line
            stroke(222, 188, 160); // bread line colour
            strokeWeight(4);
            line(collectable.x_pos - 10, collectable.y_pos - 15, collectable.x_pos - 10, collectable.y_pos - 23);
            line(collectable.x_pos, collectable.y_pos - 11, collectable.x_pos, collectable.y_pos - 25);
            line(collectable.x_pos + 10, collectable.y_pos - 15, collectable.x_pos + 10, collectable.y_pos - 23);
            noStroke();
            strokeWeight(1);

            // Check if the game character is close enough to collect the bread
            if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < collectable.size / 2) {
                collectable.isFound = true;
                gameScore++; // increment gameScore
            }
            noStroke();
        }
    }


    //flag pole drawing
    fill(153, 79, 0) // pole colour
    rect(flagpole.x_pos, flagpole.y_pos - 105, flagpole.x_pos - 2945, flagpole.y_pos - 327) // pole

    // If the character has not reached the flag pole, draw the flag to the left of the pole
    if (!flagpole.isReached) {
        fill(255) //flag fill
        rect(flagpole.x_pos - 30, flagpole.y_pos - 105, flagpole.x_pos - 2920, flagpole.y_pos - 410) // flag
    }

    // If the character has reached the flag pole, draw the flag to the right of the pole and the UFO goes green
    if (flagpole.isReached) {
        fill(255)
        rect(flagpole.x_pos + 5, flagpole.y_pos - 105, flagpole.x_pos - 2920, flagpole.y_pos - 410) // flag

        // Draw the UFO light
        fill(71, 219, 63, 50);
        triangle(gameChar_x, 40, gameChar_x - 100, 435, gameChar_x + 120, 435); //light
        ellipse(gameChar_x + 10, 435, 215, 10);
        noStroke();
    }

    // Draw the UFO
    // Add antenna to UFO
    stroke(112, 119, 123); // Use the same color as the UFO body

    // Left antenna
    line(gameChar_x - 20, 25, gameChar_x - 40, 10); // Diagonal line
    fill(255, 0, 255);
    ellipse(gameChar_x - 40, 10, 8); // Antenna tip

    // Right antenna
    line(gameChar_x + 20, 25, gameChar_x + 40, 10); // Diagonal line
    ellipse(gameChar_x + 40, 10, 8); // Antenna tip


    noStroke();
    // UFO head
    stroke(0)
    fill(152, 159, 163); // Light UFO color
    ellipse(gameChar_x, 40, 60);
    noStroke();
    
    stroke(0)

    // UFO body
    fill(112, 119, 123); // Dark UFO color
    ellipse(gameChar_x, 70, 150, 60);
    noStroke();
    stroke(0);
    line(gameChar_x - 75, 70, gameChar_x + 75, 70);
    fill(71, 219, 63)
    // UFO lights
    ellipse(gameChar_x - 40, 70, 20);
    ellipse(gameChar_x, 70, 20);
    ellipse(gameChar_x + 40, 70, 20);
    noStroke();



    /////// character drawing ///////

    if (isLeft && isFalling) {
        // add your jumping-left code
        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x - 10, gameChar_y - 40, 26, 5); //left arm

        //character hands
        ellipse(gameChar_x - 23, gameChar_y - 40, 5, 8); //left hand

        //character legs
        ellipse(gameChar_x - 7, gameChar_y - 18, 25, 8); //right leg
        ellipse(gameChar_x - 18, gameChar_y - 18, 6, 8); //right feet

        //character body
        ellipse(gameChar_x + 10, gameChar_y - 18, 25, 8); //left legs
        ellipse(gameChar_x + 20, gameChar_y - 18, 6, 8); //left feet
        ellipse(gameChar_x, gameChar_y - 35, 25, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 30, 15); // top half of body
        ellipse(gameChar_x + 10, gameChar_y - 40, 26, 5); //right arm
        ellipse(gameChar_x + 23, gameChar_y - 40, 5, 8); //right hand

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character ears
        ellipse(gameChar_x + 8, gameChar_y - 66, 8, 11); // right ears

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x - 5, gameChar_y - 65, 10, 15);
        fill(0)
        ellipse(gameChar_x - 5, gameChar_y - 65, 5, 10);

        //character mouth
        ellipse(gameChar_x - 5, gameChar_y - 54, 5, 8);
        noStroke();

    } else if (isRight && isFalling) {
        // add your jumping-right code
        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x + 10, gameChar_y - 40, 26, 5); //right arm

        //character hands
        ellipse(gameChar_x + 23, gameChar_y - 40, 5, 8); //right hand

        //character legs
        ellipse(gameChar_x + 7, gameChar_y - 18, 25, 8); //right leg
        ellipse(gameChar_x + 18, gameChar_y - 18, 6, 8); //right feet

        //character body
        ellipse(gameChar_x - 10, gameChar_y - 18, 25, 8); //left legs
        ellipse(gameChar_x - 20, gameChar_y - 18, 6, 8); //left feet
        ellipse(gameChar_x, gameChar_y - 35, 25, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 30, 15); // top half of body
        ellipse(gameChar_x - 10, gameChar_y - 40, 26, 5); //left arm
        ellipse(gameChar_x - 23, gameChar_y - 40, 5, 8); //left hand

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character ears
        ellipse(gameChar_x - 8, gameChar_y - 66, 8, 11); // left ears

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x + 5, gameChar_y - 65, 10, 15);
        fill(0)
        ellipse(gameChar_x + 5, gameChar_y - 65, 5, 10);

        //character mouth
        ellipse(gameChar_x + 5, gameChar_y - 54, 5, 8);
        noStroke();

    } else if (isLeft) {

        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x - 10, gameChar_y - 40, 26, 5); //left arm

        //character hands
        ellipse(gameChar_x - 23, gameChar_y - 40, 5, 8); //left hand

        //character legs
        push();
        translate(gameChar_x - 7, gameChar_y - 18);
        rotate(radians(-45));
        ellipse(0, 0, 25, 8); //right leg
        pop();
        push();
        translate(gameChar_x - 16, gameChar_y - 10);
        rotate(radians(-45));
        ellipse(0, 0, 6, 8); //right foot
        pop();

        //character body
        ellipse(gameChar_x, gameChar_y - 13, 8, 25); //left legs
        ellipse(gameChar_x, gameChar_y - 2, 8, 6); //left feet
        ellipse(gameChar_x, gameChar_y - 35, 25, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 30, 15); // top half of body
        ellipse(gameChar_x, gameChar_y - 30, 5, 26); //right arm
        ellipse(gameChar_x, gameChar_y - 18, 5, 8); //right hand

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character ears
        ellipse(gameChar_x + 8, gameChar_y - 66, 8, 11); // right ears

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x - 5, gameChar_y - 65, 10, 15);
        fill(0)
        ellipse(gameChar_x - 5, gameChar_y - 65, 5, 10);

        //character mouth
        ellipse(gameChar_x - 5, gameChar_y - 54, 5, 3);
        noStroke();

    } else if (isRight) {
        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x + 10, gameChar_y - 40, 26, 5); //right arm

        //character hands
        ellipse(gameChar_x + 23, gameChar_y - 40, 5, 8); //right hand

        //character legs
        // rotate the right leg and feet 45 degrees around their center points
        // to make them diagonal
        push();
        translate(gameChar_x + 7, gameChar_y - 18);
        rotate(radians(45));
        ellipse(0, 0, 25, 8); //right leg
        pop();
        push();
        translate(gameChar_x + 16, gameChar_y - 10);
        rotate(radians(45));
        ellipse(0, 0, 6, 8); //right foot
        pop();

        //character body
        ellipse(gameChar_x, gameChar_y - 13, 8, 25); //right legs
        ellipse(gameChar_x, gameChar_y - 2, 8, 6); //right feet
        ellipse(gameChar_x, gameChar_y - 35, 25, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 30, 15); // top half of body
        ellipse(gameChar_x, gameChar_y - 30, 5, 26); //left arm
        ellipse(gameChar_x, gameChar_y - 18, 5, 8); //left hand

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character ears
        ellipse(gameChar_x - 8, gameChar_y - 66, 8, 11); // left ears

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x + 5, gameChar_y - 65, 10, 15);
        fill(0)
        ellipse(gameChar_x + 5, gameChar_y - 65, 5, 10);

        //character mouth
        ellipse(gameChar_x + 5, gameChar_y - 54, 5, 3);
        noStroke();

    } else if (isFalling || isPlummeting) {
        // add your jumping facing forwards code
        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x - 17, gameChar_y - 48, 5, 26); //left arm
        ellipse(gameChar_x + 17, gameChar_y - 48, 5, 26); //right arm

        //character hands
        ellipse(gameChar_x - 17, gameChar_y - 58, 5, 8); //left hand
        ellipse(gameChar_x + 17, gameChar_y - 58, 5, 8); //right hand

        //character legs
        ellipse(gameChar_x - 7, gameChar_y - 18, 25, 8); //right leg
        ellipse(gameChar_x + 7, gameChar_y - 18, 25, 8); //left leg
        ellipse(gameChar_x - 18, gameChar_y - 18, 6, 8); //right feet
        ellipse(gameChar_x + 18, gameChar_y - 18, 6, 8); //left feet

        //character body
        ellipse(gameChar_x, gameChar_y - 35, 30, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 38, 15); // top half of body

        //character ears
        ellipse(gameChar_x + 9, gameChar_y - 66, 8, 11); // right ears
        ellipse(gameChar_x - 9, gameChar_y - 66, 8, 11); // left ears

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x, gameChar_y - 65, 10, 10);
        fill(0)
        ellipse(gameChar_x, gameChar_y - 65, 5, 5);

        //character mouth
        ellipse(gameChar_x, gameChar_y - 54, 5, 8);
        noStroke();

    } else {
        // add your standing front facing code
        //alien colour
        fill(108, 196, 23);
        stroke(0);

        //character arms
        ellipse(gameChar_x - 17, gameChar_y - 30, 5, 26); //left arm
        ellipse(gameChar_x + 17, gameChar_y - 30, 5, 26); //right arm

        //character hands
        ellipse(gameChar_x - 17, gameChar_y - 18, 5, 8); //left hand
        ellipse(gameChar_x + 17, gameChar_y - 18, 5, 8); //right hand

        //character legs
        ellipse(gameChar_x - 7, gameChar_y - 13, 8, 25); //right legs
        ellipse(gameChar_x + 7, gameChar_y - 13, 8, 25); //left legs
        ellipse(gameChar_x - 7, gameChar_y - 2, 8, 6); //left feet
        ellipse(gameChar_x + 7, gameChar_y - 2, 8, 6); //right feet

        //character body
        ellipse(gameChar_x, gameChar_y - 35, 30, 30); //bottom half of body
        ellipse(gameChar_x, gameChar_y - 40, 38, 15); // top half of body

        //character ears
        ellipse(gameChar_x + 9, gameChar_y - 66, 8, 11); // right ears
        ellipse(gameChar_x - 9, gameChar_y - 66, 8, 11); // left ears

        // character head
        ellipse(gameChar_x, gameChar_y - 60, 20, 30);

        //character eyes
        fill(113, 24, 196);
        ellipse(gameChar_x, gameChar_y - 65, 10, 10);
        fill(0)
        ellipse(gameChar_x, gameChar_y - 65, 5, 5);

        //character mouth
        ellipse(gameChar_x, gameChar_y - 54, 5, 3);
        noStroke();
    }
    
    stroke(0);
    // Set the font size to 32 pixels
    textSize(32);

    // Set the font to "Impact"
    textFont("Impact");

    // Set the shadow position relative to the text
    textLeading(2);
    textAscent(-4);

    // Draw a blue rectangle as the background for the scoreboard
    fill(0, 0, 255);
    rect(cameraPosX + width - 280, 20, 250, 60);

    // Draw a white rectangle as the border for the scoreboard
    fill(255, 255, 255);
    rect(cameraPosX + width - 285, 25, 255, 70);

    // Set the text alignment and baseline to center the text within the rectangle
    textAlign(CENTER, CENTER);

    // Set the text color.
    fill(255, 165, 0);

    // Draw the score in the center of the rectangle
    text("Score: " + gameScore, cameraPosX + width - 160, 60);
    noStroke();



    // draw game over graphic
    if (gameOver) {

        textAlign(CENTER); // center the text horizontally and vertically
        // Create a gradient color for the text.
        fill(255, 0, 0, 100);
        fill(0, 0, 255, 100);
        textSize(40); // set the font size to 40 pixels
        // Set the stroke and stroke weight for the shadow.
        stroke(0, 0, 0);
        strokeWeight(1);

        // Draw the "Game Over" text at the center of the screen.
        text("Game Over", cameraPosX + width / 2 + 4, height / 2 + 4);
        noStroke();

        // Set the stroke and stroke weight for the text.
        stroke(255, 0, 0);
        strokeWeight(1);

        // Draw the "Game Over" text at the center of the screen.
        text("Game Over", cameraPosX + width / 2, height / 2);
        noStroke();
    }

    // draw level complete graphic
    if (levelComplete) {
        // Create a gradient color for the text.
        fill(255, 0, 0, 100);
        fill(0, 0, 255, 100);
        textAlign(CENTER); // center the text horizontally and vertically
        textSize(40); // set the font size to 40 pixels
        // Set the stroke and stroke weight for the shadow.
        stroke(0, 0, 0);
        strokeWeight(1);
        text("Level complete", cameraPosX + width / 2 + 4, height / 2 + 4); // draw the text at the center of the screen
        noStroke();
        stroke(255, 0, 0);
        strokeWeight(1);
        text("Level complete", cameraPosX + width / 2, height / 2); // draw the text at the center of the screen
        noStroke();
    }



    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here


    // If the character is moving to the left and is not plummeting, move the character to the left and animate the character's movement
    if (isLeft && !isPlummeting) {
        gameChar_x -= speed;
        noStroke();

    }

    // If the character is moving to the right and is not plummeting, move the character to the right and animate the character's movement
    if (isRight && !isPlummeting) {
        gameChar_x += speed;
        noStroke();
    }


    // If the game character is above the ground, apply the force of gravity to make the character fall towards the ground
    if (gameChar_y < floorPos_y) {
        gameChar_y += gravity;
        isFalling = true;
    } else {
        isFalling = false;
    }


    // If the character has reached the flag pole, set the flagpole.isReached flag to true, set the levelComplete flag to true,
    // and cancel other states (i.e. moving left/right, falling, plummeting, jumping) so that the character stays at the flagpole
    if (dist(gameChar_x, gameChar_y, flagpole.x_pos, flagpole.y_pos) < 15) {
        flagpole.isReached = true;
        levelComplete = true;

        // cancel other states
        gameChar_x = flagpole.x_pos;
        gameChar_y = flagpole.y_pos;
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;
        jumpHeight = 0;
        noStroke();
    }

    // For each canyon, check if the character's x position is within the range of the canyon and if the character is on the ground
    // If the character is within the range of the canyon and on the ground, set the isPlummeting flag to true and apply gravity to make the character fall
    for (var i = 0; i < canyons.length; i++) {
        if (gameChar_x > canyons[i].x_pos && gameChar_x < canyons[i].x_pos + canyons[i].width - 7 && gameChar_y >= floorPos_y) {
            isPlummeting = true;
            gameChar_y += gravity;
            noStroke();

        }

        // detect when the character is plummeting & If the character is plummeting, sets the gameOver to true
        if (isPlummeting) {
            console.log("true")
            gameOver = true;
        }
    }
    
    noStroke();
    // End the camera translation
    pop();

}


function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.

    //open up the console to see how these work
    console.log("keyPressed: " + key);
    console.log("keyPressed: " + keyCode);

    if (gameOver) {
        // return from the function early if the game is over
        return;
    }

    //character turns left
    if (key == "a" || key == "ArrowLeft" && !isPlummeting) { // when either the "a" or the"Arrow left" is pressed the character turning left animation is activated.
        isLeft = true;

        //character turns right
    } else if (key == "d" || key == "ArrowRight" && !isPlummeting) { // when either the "D" or the"arrow right" is pressed the character turning right animation is activated.
        isRight = true;
    }

    //character jump
    //when the the space bar is pressed the character's position y is decreased, so that the character is above ground. Another if statement is added which adds the amount decreased from the character y position, so that the character in air it does not double jump.
    if (keyCode == "32") {
        gameChar_y -= jumpHeight;
        if (isFalling || isPlummeting) {
            gameChar_y += jumpHeight;
        }
    }
}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.

    console.log("keyReleased: " + key);
    console.log("keyReleased: " + keyCode);

    if (key == "a" || key == "ArrowLeft") //if the directions key "a" or "arrow left" are released the animation for turning  left is deactivated and character returns to normal stance 
    {
        isLeft = false;
    } else if (key == "d" || key == "ArrowRight") //if the directions key "d" or "arrow right" are released the animation for turning right is deactivated and character returns to normal stance 
    {
        isRight = false;
    }
}
