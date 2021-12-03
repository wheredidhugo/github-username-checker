import requests
import string
import random
import os
import platform

def clConsole():
  if platform.system() == "Linux" or "Darwin":
    os.system('clear')
  else:
    os.system('cls')

clConsole()

success = None;

for x in range(999):
  print("How many letters do you want your usernames to be? ")
  lUsername = int(input())
  if lUsername > 39:
    print("You can have a maximum of 39 letters in your username, try again.")
  elif lUsername == 0:
    print("You can't have no username, try again.")
  else:
    break

def getRandomString(size=lUsername):
  return ''.join(random.choice(string.ascii_lowercase + string.digits) for i in range(size))

def writeName(name):
  f = open("users.txt", "a")
  f.write(name)
  f.write(", ")
  print(name, ">>> users.txt")
  f.close()

rLimit = requests.get('https://api.github.com/users/').headers['x-ratelimit-remaining']
rLimit = int(rLimit)

clConsole()

for i in range(rLimit):
  if rLimit == 0:
    print("Sorry, you have been ratelimited, try again later.")
    break;

  RandomString = getRandomString()
  r = requests.get('https://api.github.com/users/' + RandomString)
  jsonResponse = r.json()

  try: 
    if jsonResponse["message"] == "Not Found":
      print(RandomString, "isn't taken.")
      writeName(RandomString)
      break;
  except:
    if jsonResponse["login"] == RandomString:
      print(RandomString, "is taken.")
      rLimit = rLimit - 1; 
      success = 1;

if rLimit == 0:
  print("Sorry, you have been ratelimited, try again later.")
elif success == 1:
  print("Hooray! You have found a", lUsername, "letter name.")