# Instructions - 03 - DOM Manipulation

In this tutorial we'll go through how to use JQuery to manipulate the document object model by building a fun game! All of our modifications will be made to script.js.

## 01: Use execute a function when the document is ready.
```
$( document ).ready(function() {
  console.log('ready');
});
```

## 02: Create our first event for mousemove
```
var gameArea;

$( document ).ready(function() {
  console.log('ready');

  gameArea = $("#game-area");

  gameArea.mousemove(function(event) {
    $("#mouse-pointer").css({ top: event.pageY - 16, left: event.pageX - 16 });
  });
});

```

## 03: Add something to the DOM
```
var gameArea;

$( document ).ready(function() {
  console.log('ready');

  init();

  gameArea = $("#game-area");

  gameArea.mousemove(function(event) {
    $("#mouse-pointer").css({ top: event.pageY - 16, left: event.pageX - 16 });
  });
});

var init = function() {
  $("#game-area").append('<h1 id="game-title">Sample jQuery</h1>');
}
```

## 04: Remove something from the DOM after a delay
```
var init = function() {
  $("#game-area").append('<h1 id="game-title">Sample jQuery</h1>');
  setTimeout(beginGame, 8500);
}

var beginGame = function() {
  $("#game-title").remove();
}
```

## 05: Create the colour changing background
```
var colours = ['#FF000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
var colourIndex = 0;
var randomColour = function() {
  colourIndex++;
  return colours[colourIndex % colours.length];
}
var beginGame = function() {
  $("#game-title").remove();

  setInterval(function() {
    $("#game-area").animate({ backgroundColor: randomColour() }, 250);
  }, 250);
}
```

## 06: Create the illuminati
```
var colours = ['#FF000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];
var colourIndex = 0;
var randomColour = function() {
  colourIndex++;
  return colours[colourIndex % colours.length];
}
var randomIlluminatiPosition = function() {
  return {
    left: Math.floor(Math.random() * (window.innerWidth - 150)) + "px",
    top: Math.floor(Math.random() * (window.innerHeight - 150)) + "px"
  }
}
var illuminatiNumber = 0;
var beginGame = function() {
  $("#game-title").remove();

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
  }, 2000)
}
```

## 07: Onclick event to kill the illuminati
Inside of $( document ).ready
```
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
gameArea.on("click", ".illuminati", function() {
  $(this).remove();
  gameArea.append(dankMemes[illuminatiNumber - 1]);
  illuminatiNumber--;
});
```

## 08: Make the boss show up
```
gameArea.on("click", ".illuminati", function() {
  // ...
  if (illuminatiNumber <= 0) {
    beginBossBattle();
  }
});
//...
var beginBossBattle = function() {
  gameArea.append('<img id="trump" src="http://www.donaldtrumpisanintergalacticwarlord.com/images/donald.png" />');
  for (var i = 0; i <= 4; i++) {
    $("#health-bar").append('<div class="health-tick"></div>');
  }
}
```

## 09: Decrease the bosses health using an advanced selector
Inside $( document ).ready
```
gameArea.on("click", "#trump", function() {
  $(".health-tick:first").remove();
});
```

## 10: Flash the Donald using chaining
```
gameArea.on("click", "#trump", function() {
  $(".health-tick:first").remove();
  flashTheDonald();
});
// ...
var flashTheDonald = function() {
  $("#trump")
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
}
```

## 11: Animate the Game Win State
```
gameArea.on("click", "#trump", function() {
  $(".health-tick:first").remove();
  flashTheDonald();
  if ($(".health-tick").length === 0) {
    donaldSaysGoodbye();
  }
});
// ...
var donaldSaysGoodbye = function() {
  gameArea.append('<img id="winner" src="http://i.imgur.com/kRnXEyw.png" />');
  $("#trump").animate({ marginTop: "300%" });
}
```
