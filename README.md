# Music Upload App (React)
This project was bootstrapped with Create React App.

It allows users to upload, view, play, and delete songs via a Laravel backend API.

# Features
	•	Music Upload: Upload songs with a title and category selection (e.g., Pakistani, Indian).
	•	Audio Playback: Play songs directly in the browser using a responsive audio player.
    •	Category-wise Display: Display songs based on categories.
	•	Delete Songs: Ability to delete uploaded songs from the list.
    •	User-friendly UI: Simple and clean interface with responsive design.
	•	Private API Access: Secure communication with Laravel backend using API tokens.

## Getting Started with Create React App

Prerequisites

	•	Node.js (v14 or later)

	•	npm (v6 or later)

# Installation Command

npm install axios react-router-dom react-player bootstrap

## Available Scripts

In the project directory, you can run:



### `npm start`

Runs the app in development mode.

Open http://localhost:3000 to view it in the browser.

	•	The page will reload automatically on code changes.

	•	You may see any lint errors in the console.


### `npm run build`

Builds the app for production to the build folder.

	•	Optimizes the React build for best performance.

	•	Minifies the code and bundles files efficiently.

	•	Filenames include hashes for cache busting.

Your app is ready to be deployed.

More about deployment: React Deployment

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Note: This is a one-way operation. Once you eject, you can’t go back!

Running npm run eject will expose all configuration files (Webpack, Babel, ESLint, etc.) for full control, but removes Create React App’s simple setup.

You typically don’t need to eject unless you require advanced configurations.

Learn More
	•	React Documentation

	•	Create React App Documentation

Additional Resources

	•	Code Splitting

	•	Analyzing Bundle Size

	•	Making a Progressive Web App (PWA)

	•	Advanced Configuration

	•	Troubleshooting Build Issues

Features

	•	Upload songs with title and category.

	•	View a list of uploaded songs.

	•	Play audio files directly from the browser.

	•	Delete uploaded songs.

## Learn More

To explore and deepen your understanding of the technologies used in this project, check out the official documentation and resources below:

Official Documentation

	•	React.js — A JavaScript library for building user interfaces.
https://reactjs.org/docs/getting-started.html

	•	Create React App — Set up a modern React app by running one command.
https://create-react-app.dev/docs/getting-started

	•	Axios — Promise-based HTTP client for making API requests.
https://axios-http.com/docs/intro

	•	React Router DOM — Declarative routing for React applications.
https://reactrouter.com/en/main

	•	Bootstrap 5 — Popular CSS framework for responsive design and UI components.
https://getbootstrap.com/docs/5.0/getting-started/introduction

	•	Laravel API (Backend) — The backend API service is developed using Laravel.
https://laravel.com/docs/10.x

	•	React Player (Optional for advanced audio/video) — A React component for playing media from various sources.
https://www.npmjs.com/package/react-player

	•	React Howler (Optional for advanced audio controls) — React integration for Howler.js, an audio library.
https://www.npmjs.com/package/react-howler


### Installed Packages

	•	react
	•	react-dom
	•	react-router-dom
	•	axios
	•	bootstrap
	•	(Optional for Future) react-player or react-howler for advanced audio handling
    
## Future Plans

	1.	Audio Visualization:
	    •	Add waveform visualization while playing songs.
	2.	Search & Filter:
	    •	Search songs by title or category.
	    •	Filter songs based on popularity, recently added, etc.
	3.	Favorite Songs / Like Feature:
	    •	Allow users to like or favorite songs for quick access.
	4.	Comments & Ratings:
	    •	Users can comment on songs and rate them.
	5.	Admin Dashboard:
	    •	Manage songs, users, and categories via a dedicated admin panel.

## Backend (Laravel API) [Summary]

	•	Laravel Framework to handle API requests.
	•	File Storage for uploading and serving music files.
	•	Sanctum Authentication for secure access.
	•	CRUD APIs for managing songs (Create, Read, Delete).