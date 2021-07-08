const fetch = require("node-fetch");
const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

let x = 0;
var lUsername = "";
while (x < 999) {
  const lUsernameP = prompt(
    "How many letters do you want your usernames to be? "
  );
  function isNumeric(num) {
    return !isNaN(num);
  }
  if (isNumeric(lUsernameP) === true) {
    if (lUsernameP > 39) {
      console.log(
        "You can have a maximum of 39 letters in your username, try again."
      );
    } else {
      x = 1000;
      lUsername = lUsernameP;
    }
  } else {
    console.log("This isn't a number, try again.");
  }
}

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

function fetchNames() {
  var RandomString = getRandomString(lUsername);
  fetch("https://api.github.com/users/" + RandomString)
    .then((res) => res.json())
    .then((json) => {
      if (json.message === undefined) {
        console.log(RandomString + " isn't taken");
        writeName(RandomString);
      } else if (json.message === "Not Found") {
        console.log(RandomString + " isn't taken");
        writeName(RandomString);
      } else {
        console.log("You are ratelimited, try again later.");
      }
    });
}
setInterval(fetchNames, 3000);
