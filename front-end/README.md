# Vanilla SPA with Google Auth

A single page application built with vanilla JavaScript that implements Google Authentication.

## Project Structure

\`\`\`
vanilla-spa-google-auth/
├── index.html              # Main HTML file
├── css/                    # CSS styles
│   ├── styles.css          # Main stylesheet
│   └── notification.css    # Notification component styles
├── js/                     # JavaScript files
│   ├── app.js              # Main application file
│   ├── auth.js             # Authentication logic
│   ├── router.js           # SPA routing
│   ├── utils.js            # Utility functions
│   └── pages/              # Page-specific JavaScript
│       ├── contact.js      # Contact page functionality
│       └── dashboard.js    # Dashboard page functionality
└── assets/                 # Static assets
    └── favicon.ico         # Favicon
\`\`\`

## Setup Instructions

1. **Google OAuth Setup:**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Create an OAuth 2.0 Client ID
   - Add your domain to the authorized JavaScript origins
   - Replace `YOUR_GOOGLE_CLIENT_ID` in the HTML file with your actual client ID

2. **Running the Application:**
   - Host these files on a web server
   - Open the application in your browser

## Features

- Client-side routing
- Google authentication
- Protected dashboard route
- Persistent login state
- Responsive design
- Form handling
- Notification system
