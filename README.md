# TA_GA
The goal is develop two projects:

Project 1. Client or player
Project 2. Server or game
The "player" is a project whose tasks are the following:

STEP 1. Start the game (calling a known start endpoint)
STEP 2. Show all the options received from the server on console. The server will send all the information that the client needs for the the following requests.
STEP 3. Read the option selected by the player and perform a new request to the server 
STEP 4. Go to STEP 2 until the game ends.
TIP: you can use the library "request" from yarn.
TIP: you can use "readline" for getting user inputs (https://nodejs.org/api/readline.html)
The "game" is a project whose tasks are the following:

It must have an endpoint for starting the game.
It must have all the endpoints needed for performing all the actions that the game needs. Please try to use well the HTTP verbs and status codes. For each request the server must return hypermedia information with the next options that the player can choose.
You can use postgres for storing data if your game needs saving information. 

Something to think about:

There can be simultaneous players playing at the same time.
Our server is stateless (you don't have sessions on the server)