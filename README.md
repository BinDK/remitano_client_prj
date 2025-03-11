# YouTube Video Sharing Platform - Frontend

## Introduction

This is the React frontend for the YouTube video sharing platform. The application allows users to register, login, share YouTube videos, and receive real-time notifications when new videos are shared. This repository contains the React frontend that communicates with the Rails backend API.

## Key Features

- User registration and authentication
- YouTube video sharing
- Viewing shared videos
- Real-time notifications via ActionCable WebSockets (receive notifications only upon successful video creation)
- Responsive UI built with React and Tailwind CSS

## Prerequisites

- Node.js 18+
- npm 9+
- React 19.0+
- Rails backend API running (see backend repository)

## Installation & Configuration

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd remitano-client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=http://<your_be_url>:<your_be_port>/api/v1
   REACT_APP_CABLE_URL=ws://<your_be_url>:<your_be_port>/cable
   ```

## Running the Application

1. Start the development server
   ```bash
   $ npm start
   ```

2. Access the application at `http://localhost:3001`

3. Build for production
   ```bash
   $ npm run build
   ```

## Docker Deployment

1. Build the Docker image
   ```bash
   $ docker build -t youtube-video-sharing-client .
   ```

2. Run the container
   ```bash
   $ docker run -p 3001:80 -e REACT_APP_API_URL=http://host.docker.internal:3000 \                                  ─╯
      -e REACT_APP_CABLE_URL=ws://host.docker.internal:3000/cable \
      --name video-sharing-be youtube-video-sharing-client:local
   ```
## Dokku Deployment( A Heroku-like on your own server)
Please following this [documentation](https://dokku.com/docs/getting-started/installation/) for how to deploy with dokku :rocket:
### The steps below is the deployment with my homelab
### Prerequisites
- On your local machine
```bash
$ gem install dokku-cli
```

### Steps
```bash
# On your host
$ dokku apps:create "app-name"
$ dokku domains:add "app-name" "domain-name.com"
$ dokku letsencrypt:set "app-name" email "your@email.com"
$ dokku letsencrypt:enable "app-name"
# On local machine
$ git remote add dokku dokku@your-domain:app-name
$ dokku config:set REACT_APP_CABLE_URL=value ... and other environment variables could be found in ,env.example
$ git push dokku main

DONE
```

## Usage

### Authentication

The application uses cookie-based authentication with the backend API.

### Sharing Videos

1. Login to your account
2. Navigate to the "Share a video" page
3. Enter a YouTube URL
4. Submit the form

The application will send the URL to the backend, which will extract the video metadata from [OpenGraph](https://ogp.me/). Upon successful processing, a notification is broadcast to all connected users.

### Notifications

Real-time notifications are implemented using ActionCable WebSockets. When a user successfully shares a new video, all connected users will receive a notification with the video title and the user who shared it.

### Common Issues

1. **API Connection Error**
   - Ensure the backend API is running
   - Verify the `REACT_APP_API_URL` in your `.env` file

2. **WebSocket Connection Issues**
   - Check that the backend ActionCable server is running
   - Verify the `REACT_APP_CABLE_URL` in your `.env` file

3. **Authentication Problems**
   - Clear browser cookies and local storage
   - Ensure CORS is properly configured on the backend

4. **Build Issues**
   - Try clearing the npm cache: `npm cache clean --force`
   - Delete the `node_modules` folder and run `npm install` again
