// Here we initialize all of our functions that we use on events.

// Here I declare the variable "gameArea" in global scope so that any function
// can use it.
var gameArea;

// This is triggered once all of the resources of the page are loaded. This is
// a good place to put any code you want to execute on page load as well as
// define jQuery events.
$( document ).ready(function() {
  // You're able to store jQuery selectors in variables so that you can just
  // use a variable later on.
  gameArea = $("#game-area");

  // I've defined a function called "init" later on. This calls it to start
  // the game.
  init();

  // Remember that if an element is dynamically created, like the illuminati
  // were, you can't simply call "click" on a selector for it. You need to apply
  // the on event to one of its parent elements that was already present in the
  // DOM upon page load. The secon argument of the "on" method is the selector
  // for the element for which you'd like the event to trigger.
  gameArea.on("click", ".illuminati", function() {
    $(this).remove();
    gameArea.append(dankMemes[illuminatiNumber - 1]);
    illuminatiNumber--;
    if (illuminatiNumber <= 0) {
      hereComeDatBoi();
    }
  });
  var dankMemes = [
    '<img class="dank-meme" src="https://media.giphy.com/media/rHuBz74fk4Pio/giphy.gif" style="bottom: 0; left: 0; height: 50px; width: 100%" />',
    '<img class="dank-meme" src="http://i.giphy.com/5xtDaryppd5NqQMgT4I.gif" style="bottom: 0; left: 10px; height: 200px" />',
    '<img class="dank-meme" src="http://38.media.tumblr.com/5882c6c9333f86f0e89d025613ea1cde/tumblr_morqfbJ8WO1swgfzvo1_400.gif" style="top: 0; left: 10px; height: 200px" />',
    '<img class="dank-meme" src="https://49.media.tumblr.com/ec3360df3027215180db3795c5c5e069/tumblr_nm6cjahjur1upa971o1_400.gif" style="left: 5px; top: 300px; height: 200px" />',
    '<img class="dank-meme" src="https://49.media.tumblr.com/903f36e0c00d37804a68a7052f6016a0/tumblr_n68kahGOHq1r8uffzo1_500.gif" style="top: 0; right: 10px; height: 200px; " />',
    '<img class="dank-meme" src="https://67.media.tumblr.com/2dfc3369827df9b981e111d7fd8fc732/tumblr_mvemcyarmn1rslphyo1_400.gif" style="bottom: 0; right: 10px; height: 200px" />',
    '<img class="dank-meme" src="https://secure.static.tumblr.com/ccd404c43ab57850186913d05df596ce/iiwkks0/b2Wo165yn/tumblr_static_tumblr_static_3delx5lyom68wk4s8cos4o00s_640.gif" style="right: 0; bottom: 300px; height: 200px; transform: translateX(80px) rotate(-90deg)" />',
    '<img class="dank-meme" src="http://vignette4.wikia.nocookie.net/someordinarygamers/images/a/a1/Sanic.gif/revision/latest?cb=20150624143958" style="top: 0; right: calc(50% - 100px); height: 200px" />'
  ];

  // Here's an example of using the event object that comes as a parameter of an
  // event. In this case, "event" contains "pageX" and "pageY" which can be used
  // to get the current position of the mouse.
  gameArea.mousemove(function(event) {
    $("#mouse-pointer").css({ top: event.pageY - 16, left: event.pageX - 16 });
  });

  // Hide the default pointer
  gameArea.css({ cursor: 'none' });

  gameArea.on("click", "#datboi", function() {
    $(".health-tick:first").remove();
    flashDatBoi();

    // The length property will tell you how many elements exist that correspond
    // with a specific selector.
    if ($(".health-tick").length === 0) {
      thereGoesDatBoi();
    }
  });
});

// THIS GETS EXECUTED FIRST!!!!!!!!!!!!!!!!!!!!!!
var init = function() {
  $("#game-area").append('<h1 id="game-title">Welcome to the Game of the Century</h1>');
  // This is the setTimeout function. It's default in JavaScript, so you don't
  // need jQuery to use it. This essentially says "Execute the funtion
  // 'beginGame' after 3 seconds."
  setTimeout(beginGame, 3000);
};

// Helper functions for "begin game"
var colours = ['#FF000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
var colourIndex = 0;
var randomColour = function() {
  colourIndex++;
  return colours[colourIndex % colours.length];
};
var randomIlluminatiPosition = function() {
  return {
    left: Math.floor(Math.random() * (window.innerWidth - 150)) + "px",
    top: Math.floor(Math.random() * (window.innerHeight - 150)) + "px"
  }
};

// THIS HAPPENS SECOND!!!!!!!!!!!!!!!!!!!!
var illuminatiNumber = 0;
var beginGame = function() {
  $("#game-title").remove();
  // Set interval is like setTimeout, except it will trigger its provided
  // once each interval. In this case, it executes an animate every 250
  // milliseconds.
  setInterval(function() {
    $("#game-area").animate({ backgroundColor: randomColour() }, 250);
  }, 250);
  var illuminati = [];
  for (var i = 0; i <= 7; i++) {
    $("#game-area").append('<img class="illuminati" id="illuminati' + i + '" src="https://www.dropbox.com/s/w2l0zxom6vw32co/illuminati.png?raw=1" />');
    var curIlluminati = $('#illuminati' + i);
    curIlluminati.css(randomIlluminatiPosition());
    illuminati[i] = curIlluminati;
    illuminatiNumber++;
    curIlluminati.animate(randomIlluminatiPosition(), 2000);
  }

  setInterval(function() {
    illuminati.forEach(function(pyrimid) {
      pyrimid.animate(randomIlluminatiPosition(), 2000);
    });
  }, 2000);
};

var hereComeDatBoi = function() {
  gameArea.append('<img id="datboi" src="http://i.imgur.com/0X2Qfk9.gif" />');
  for (var i = 0; i <= 4; i++) {
    $("#health-bar").append('<div class="health-tick"></div>');
  }
};

var flashDatBoi = function() {
  // Here's an example of chaining. This simply says, "Take 0 ms to hide Dat Boi,
  // then wait 100 ms, then take 0 ms to show Dat Boi, and so on."
  $("#datboi")
    .hide(0)
    .delay(100)
    .show(0)
    .delay(100)
    .hide(0)
    .delay(100)
    .show(0)
    .delay(100)
    .hide(0)
    .delay(100)
    .show(0);
};

var thereGoesDatBoi = function() {
  gameArea.append('<img id="winner" src="http://i.imgur.com/kRnXEyw.png" />');
  $("#datboi").animate({ marginTop: "300%" });
};
