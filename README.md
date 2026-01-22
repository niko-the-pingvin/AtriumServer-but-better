# Atrium Server
Atrium a defunct social vr game for playing games with friends, which has been cancelled due to leaks, etc.
<br>
This is the official server for Atrium which you may use for whatever you want, may that be education, messing around, etc.

## Components
The server is made with these main components:
<ul>
  <li>NodeJS (commonjs)</li>
  <li>ExpressJS</li>
  <li>EJS</li>
  <li>Mongoose/MongoDB</li>
  <li>bcrypt</li>
  <li>jsonwebtoken/JWT</li>
</ul>

## Features
For the public release of the repo there are some special features for ease of access due to things not being finished.
Found in /repofeatures.
<br>
<br>
These features may include:
<ul>
  <li>generateKey.js - npm run generate - to generate keys for your auth tokens to then put in your .env file</li>
  <li>createAccount.js - npm run createAccount - a slightly easier way to create your account on the DB without having to completely create it manually</li>
  <li>createGameconfig.js - npm run createAccount - a slightly easier way to create a gameconfig manually without having to completely create it manually, and also due to gameconfigs not working on the admin panel.</li>
</ul>

## Warnings:
<ul>
  <li>Variable capitalization is inconsistent, very bad at this.</li>
  <li>The server is not and will not be finished.</li>
  <li>Giving your account the "admin" role will give you permission to use the unfinished admin panel - /admin/login</li>
  <li>NO AI was used to create this server, if any help was required from making this it was documentation and stack overflow posts, lol.</li>
</ul>
