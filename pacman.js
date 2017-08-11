// Setup initial game stats
var score = 0;
var lives = 2;
var  powerPellets=4;


// Define your ghosts here
var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
var Pinky = {
  menu_option: '3',
  name: 'Inky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

//stored the ghost objects in ghosts array.
var ghosts = [];
ghosts.push(Clyde);
ghosts.push(Pinky);
ghosts.push(Blinky);
ghosts.push(Inky);

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log("\n" + "powerPellets: " + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(q) Quit');

  if(Inky.edible===false){
    console.log('(1) Eat Inky' + "(inedible)" );
  }
  else if(Inky.edible===true){
    console.log('(1) Eat Inky' + "(edible)" );
  }

  if(Blinky.edible===false){
    console.log('(1) Eat Blinky' + "(inedible)" );
  }
  else if(Blinky.edible===true){
    console.log('(1) Eat Blinky' + "(edible)" );
  }

  if(Pinky.edible===false){
    console.log('(1) Eat Pinky' + "(inedible)" );
  }
  else if(Pinky.edible===true){
    console.log('(1) Eat Pinky' + "(edible)" );
  }

  if(Clyde.edible===false){
    console.log('(1) Eat Clyde' + "(inedible)" );
  }
  else if(clyde.edible===true){
    console.log('(1) Eat Clyde' + "(edible)" );
  }


  if (powerPellets > 0){
    console.log('(p) Eat Power-Pellet');
  }

  }

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet(){
  score += 50;
  for (var i=0; i<ghosts.length; i++){
    ghosts[i].edible=true;
    powerPellets -= 1;
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;

    case 'd':
      eatDot();
      break;

    case 'p':
    if(powerPellets <= 0){
      console.log('\nNo Power Pellets!');
    }
    else{
      eatPowerPellet();
    }
    break;

    default:
      console.log('\nInvalid Command!');
  }
}

//function to eat ghosts here.
function eatGhost(ghost){
  if(ghost.edible!=true){
    lives-=1;
    CheckifGameOver();
    //also check if lives zero so can end the game .
    console.log('\n' + ghost.name + "of colour" + ghost.colour + "kills Pac-Man");
  }
  else if(ghost.edible!=false){
    console.log('\n' + ghost.name + "of colour" + ghost.colour + "eaten by Pac-Man");
      score += 200;
      ghost.edible=false;
  }
}


function CheckifGameOver(){
  if(lives < 0){
    process.exit();
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
