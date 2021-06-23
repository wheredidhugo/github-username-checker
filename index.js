const fetch = require("node-fetch");
const fs = require("fs");
//const prompt = require("prompt-sync")({ sigint: true });

function getRandomString(length) {
  var randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function writeName(name) {
  fs.appendFile("users.txt", name + ", ", function (err) {
    if (err) return console.log(err);
    console.log(name + "> users.txt");
  });
}

// **to be continued l8tr**!

/*let x = 0;
var lettersUsername = "";
while (x < 199) {
  const lettersUsernamePrompt = prompt(
    "How many letters do you want your username to be? "
  );
  if (typeof lettersUsernamePrompt === "number") {
    console.log("This isn't a number, try again.");
  } else if (lettersUsernamePrompt > 39) {
    console.log(
      "You can have a maximum of 39 letters in your username, try again."
    );
  } else {
    x = 199;
    lettersUsername = lettersUsernamePrompt;
  }
}*/

// add lettersUsername to RandomString

//for (let i = 0; i < 999; i++) {
  function fetchNames() {
    var RandomString = getRandomString(3);
    fetch("https://api.github.com/users/" + RandomString)
      .then((res) => res.json())
      .then((json) => {
        if (json.login === undefined) {
          console.log(RandomString + " isn't taken");
          writeName(RandomString);
          i = 1000;
        } else {
          console.log(RandomString + " is taken");
        }
      });
  }
  setInterval(fetchNames, 3000);
//}
