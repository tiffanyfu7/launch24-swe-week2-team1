# Spotify Extension Harmony 🎵
Description: A Spotify extension that allows users to message each other and post to forums. <br>
Authors: 

## Table of Contents
1. Installation
2. Features

### Installation
To run our app follow these steps

1. Clone the repo<br></br>
<code>git clone {repo url}</code><br></br>
2. Run the frontend code<br></br>
<code>cd frontend/SpotifyExtensionApp</code><br></br>
<code>npm install</code><br></br>
<code>npm run dev</code>
2. Run the backend code <br></br>
<code>cd backend</code><br></br>
<code>npm install</code><br></br>
<code>npm install dotenv cors express cookie-parser request firebase</code><br></br>
<code>npm start</code>

In the backend folder add these files
#### .env
Create an .env following this template
Retrieve Client Secret and Client ID by registering an app with 
<a href="https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app">
Spotify for Developers </a>

<code>CLIENT_ID = {Client ID}
CLIENT_SECRET = {Client Secret}
</code>

#### permissions.json
Set up a project with Firebase to setup permissions.json file
1. Go to <a href=https://console.firebase.google.com/>Firebase Console </a>
2. Choose "Add Project"
3. Create a Firestore Database
4. Add Web App to Firebase Project
5. Go to Project Settings and Generate New Private Key
<code>{
    "type": {type},
    "projectId": {project ID},
    "private_key_id": {private Key ID},
    "private_key": {private key},
    "client_email": {client email},
    "client_id": {client ID},
    "auth_uri": {auth URI},
    "token_uri": {token URI},
    "auth_provider_x509_cert_url": {auth provider},
    "client_x509_cert_url": {cert URL},
    "universe_domain": "googleapis.com"
}</code>

### Features
1. Sign In to Spotify on Landing Page (WIP)
2. Find all Users on Discover Page (WIP)
3. Chat with Other Users in Inbox (WIP)
4. View and Post to Discussion Forums (WIP)
5. View Profiles of All Users (WIP)
6. User Profiles Display Users Top Songs, Top Artists, and Active Discussion Forums (WIP)
- Ability To Toggle Between Public and Private Profile
- Ability to Display or Hide Top Songs, Artists, and Discussion Forums Categories
7. View Your Saved Songs, Artists, and Albums in the Library (WIP)
- See your Tops Songs over Different Periods of Time

### Tutorial
Log In with Your Spotify Account Information
Use the Navigation Bar to View Different Pages
View Your Profile by clicking on the Top Rightside Icon on Discover Page
View Other Users Profiles and Message them by clicking on the Message button
See All Conversations and Chat with Specific Users by clicking on a card in Inbox
View Discussion Forums surrounding popular Albums on Spotify
See Artist Message and Like or Reply to a Specific Discussion
Toggle Between Your Saved Songs, Artists, and Albums and Sort by Top Listens in The Library

### Credits
Authors: Tiffany Fu, Pine, Abhinav, Anna, Anh
This project was completed as a part of Forge Launch SWE Training. Special Thanks to TA's Simon Anderson, and Byron Richards, and Alum Instructor Mitch Gillin. 
