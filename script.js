/* global to be able to modify in console */
var game = {}

document.addEventListener("DOMContentLoaded", function() {
  
  var PREFIX = btoa("Cheater :(\n\n")
  var VERSION_DELIM = '|'
  var version = ""
  
  document.getElementById('btnLoad').onclick = function() {
    console.log("load game");
    var rawString = document.getElementById('textbox').value;
    if (rawString.length > 0) {
      var split = rawString.split(VERSION_DELIM);
      version = split[0];
      var encoded = split[1].replace(/\s+/g, '');
      encoded = encoded.substring(PREFIX.length);
      encoded = LZString.decompressFromBase64(encoded);
      game = JSON.parse(encoded);
      
      // clear generated ui
      var uiContainer = document.getElementById('generated-ui');
      uiContainer.innerHTML = '';
      
      // generate new ui
      for (var unit in game.unittypes) {
        var div = document.createElement('div');
        var text = document.createTextNode(unit);
        var input = document.createElement('input');
        input.value = game.unittypes[unit];
        input.name  = unit
        input.addEventListener('input', function (evt) {
          console.log(this.name, this.value)
          game.unittypes[this.name] = this.value
        });
        
        div.appendChild(text);
        div.appendChild(input);
        uiContainer.appendChild(div);
        
        
      }
    }
  };
  
  document.getElementById('btnSave').onclick = function() {
    console.log("save game", game);
    var gameStr = JSON.stringify(game);
    var encoded = LZString.compressToBase64(gameStr);
    var rawString = version + VERSION_DELIM + PREFIX + encoded;
    document.getElementById('textbox').value = rawString;
  };
  
});
