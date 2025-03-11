# Music Upload API (Laravel)

This is the backend API built with Laravel to support a React.js-based Music Upload App. It provides RESTful endpoints for uploading, fetching, streaming, and deleting audio files.

# Features

	•	Upload music files with title and category.
	•	Store music metadata and files securely.
	•	Fetch and list uploaded songs via API.
	•	Stream and play audio files directly.
	•	Delete songs and manage the music library.
	•	File validation and secure storage management.

# Technologies Used

	•	Laravel 10+ (PHP 8.1+)
	•	MySQL/MariaDB for database
	•	RESTful API architecture
	•	Laravel Storage for file handling
	•	Validation and file security
	•	Migrations and Eloquent ORM

# Installation

Prerequisites
	•	PHP 8.1 or later
	•	Composer
	•	MySQL


# Steps
	1.	Clone the repository:

git clone https://github.com/NasirSultan/Rhombix-Frontend/tree/backendmusic
cd music-upload-api

	2.	Install dependencies:

composer install

	3.	Copy and configure .env file:

cp .env.example .env

Update database credentials and other environment settings inside the .env file.
	4.	Generate application key:

php artisan key:generate

	5.	Run database migrations:

php artisan migrate

	6.	(Optional) Link storage for public access:

php artisan storage:link

	7.	Serve the application:

php artisan serve

API will be available at http://127.0.0.1:8000.

## API Endpoints
	•	GET /api/songs — List all uploaded songs
	•	POST /api/songs — Upload a new song (with file upload)
	•	GET /api/songs/{id} — Get song details or stream song
	•	DELETE /api/songs/{id} — Delete a song

Note: API accepts JSON requests and file uploads via multipart/form-data.

# Security

	•	Input validation for file types, size, and metadata.
	•	Secure file storage with hashed filenames.

# Learn More
	•	Laravel Documentation
	•	Eloquent ORM
	•	Migrations
	•	File Storage
	•	Routing
	•	Validation

# Future Enhancements

	•	Song categories and filtering.
	•	Pagination support for listing songs.
	•	Search functionality.
	•	Admin panel for upload management.

