# Supono Backend Task

## Overview

This repository contains a backend service built with Node.js that provides user authentication, image processing, and integrates with Firebase and Cloudinary. The service allows for generating users, signing in, and processing images with different quality effects.

## Project Structure

The project is organized as follows:

```
src/
  - config/
     - CloudinaryConfiguration.ts
  - controllers/
     - ImageController.ts
  - middleware/
     - authMiddleware.ts
  - models/
     - User.ts
  - routes/
     - index.ts
  - services/
     - CloudinaryService.ts
     - firestoreService.ts
     - userService.ts
  - types/
     - index.d.ts
  - utils/
     - index.d.ts
  - index.ts
firebase.json
postman_collection.json
Dockerfile
README.md
```

- **config**: Contains Cloudinary configuration for managing images.
- **controllers**: Includes logic for processing HTTP requests (e.g., handling image operations).
- **middleware**: Contains middleware for authentication.
- **models**: Defines the User model.
- **routes**: Contains API route definitions.
- **services**: Contains business logic for interacting with Cloudinary, Firestore, and user management.
- **types**: TypeScript definition files.
- **utils**: Utility functions.
- **index.ts**: The entry point of the application.

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

```

PORT=3000

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_message_sender_id
FIREBASE_APP_ID=your_app_id

CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## Firebase Credentials

To use Firebase services in this project, you will need to generate your own Firebase service account credentials. You can follow these steps to create the necessary credentials:

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Navigate to "Project Settings" > "Service Accounts."
4. Click "Generate New Private Key" to download the `firebase.json` configuration file.
   
Once downloaded, place the file in the root directory of the project. It should have the following format:

```json
{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
  "client_email": "your_service_account_email",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_client_x509_cert_url",
  "universe_domain": "googleapis.com"
}
```

**Note**: For security reasons, never commit your `firebase.json` file to public repositories.

## Installation

To get started, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/supono-backend-task.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` template and fill in the required variables.

4. Run the application:

   ```bash
   npm run dev
   ```

   This will start the server on `http://localhost:3000`.

## Docker Setup

To run the application inside a Docker container, follow these steps:

1. Build the Docker image:

   ```bash
   docker build --no-cache -t supono-backend .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 3000:3000 supono-backend > /dev/null 2>&1
   ```

## Postman Collection

A Postman collection is included in the repository to help you test the API. You can import the collection from the `postman_collection.json` file.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

