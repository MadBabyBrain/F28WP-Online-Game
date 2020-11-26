# F28WP-Online-Game
- Group Localhost:3000's Web programming (2020 - Year 2 Semester 1) coursework

# installs
- npm install bcrypt
- npm install body-parser
- npm install dotenv
- npm install express
- npm install jsonwebtoken
- npm install mongoose
- npm install morgan
- npm install socket.io

# How to run
Requirements
- node.js
- the git reposiorty
- MongoDB - if you want to store the data locally

Download the repository
- Do this option only if wanting to store data locally and not on our database
Create/edit the `.env` file in the folder
In the `.env` add:
`JWT_TOKEN="[YOUR SECRET]"
DB_HOST="[MONGODB CONNECTION STRING]"`

where:
-[YOUR SECRET] is a string, such as "f38nj-fk923" or "secret"
-[MONGODB CONNECTION STRING] can be found if you installed MongoDB locally and looks something like this
`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false` or if you have an MongoDB atlas account
then you can set up a database on the cloud and get a string that looks something like this
`mongodb+srv://[name]:[password]@[name].jbitk.mongodb.net/[name]?retryWrites=true&w=majority`

Run the .bat executable.
This will start the server on `localhost` with the port `3000`

The urls to access the game are
`/home` - signup/login/play as guest
`/game` - the game


# How to play
Requirements
- 2 players or more
- an internet connection

Controls
Use the `W`, `A`, `S` and `D` keys to move your character around the lobby and game room
To choose an option (`Rock`, `Paper` or `Scissors`) in the game room you must get your character within the circle
note that it only selects the option once you are within the circle boundries and aren't moving

Mechanics
As stated previously, get your character on a circle, that is labeled, before the time runs out.
The game stores the last chosen option as you final choice once the time ends.
This means that if you change your mind and not make it in time, your last option will be selected.
There is a 10 second calculating period between rounds.

If you win you will stay in the room and move onto the next round.
If you lose, an alert will be displayed and you will be kicked out of the current game session/room

# Scoring points
To score a point you have to win a tournament. This also requires you to have an account and be logged in
The scoreboard _isn't_ ordered, and just displays a username and their score

# Known Issues
- the game room will reach the end of the time and after 10 seconds will not do anything - to fix this either reload the server or refresh the page (progress will be lost)
- the character will not appear in the game room, this includes not being able to move - to fix this either reload the server or refresh the page (progress will be lost)
- a player sprite will not be rendered in the lobby - this usually isn't a game breaking bug, either refresh page or ignore it
- malformed token issue - refresh the server, this is usually due to the token being undefined, make sure you are logged in before playing the game
- server crash if someone leaves during the game - refresh server
- ghost character/duplicats - usually ins't a game breaking bug, but you can refresh the server and make sure to disconnect and reconnect everyone on the server

# Contacts/owners/creaters/contributors
- db105@hw.ac.uk - DBartmann7
- dc111@hw.ac.uk - MadBabyBrain
- jmd9@hw.ac.uk - Jakubyte
- nh65@hw.ac.uk - NevinHarmjanz1
- rs239@hw.ac.uk - Sailfin103
