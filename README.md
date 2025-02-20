# EventHub

A web application for attending, managing and organizing events. Built using Next.js and TypeScript.

## Contents

- [EventHub](#eventhub)
  - [Contents](#contents)
  - [Project Overview](#project-overview)
    - [Core MVP Requirements](#core-mvp-requirements)
    - [EventHub Features Summary](#eventhub-features-summary)
  - [Installation and Setup](#installation-and-setup)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Cloudinary Setup](#cloudinary-setup)
    - [Database Setup](#database-setup)
    - [Authentication Setup](#authentication-setup)
    - [Graphics and Images](#graphics-and-images)
  - [Development](#development)
  - [Testing](#testing)
  - [Hosting the project](#hosting-the-project)

---

## Project Overview

This is a freelance project developed for Tech Returners. The project scope was to create an MVP (Minimum Viable Product) Events platform.

### Core MVP Requirements

The MVP requirements provided by Tech Returners were:

- Display a list of events for users to browse.
- Allow users to sign up for an event.
- Allow users to add events to their Google Calendar after signing up.
- Enable staff members to sign in to create and manage events.

### EventHub Features Summary

**Technical Features:**

- Role based access control (RBAC)
- Auth.js login (Google, Github, Credentials)
- The site is fully responsive for desktop and mobile devices
- All forms are validated on front and back end for security
- Server actions that are tested thoroughly with vitest (high test coverage)

**User Features:**

- Modern landing page with dynamically displayed events
- Users can mark their attendance on events
- Users can add events to their Google Calendar after signing up (regardless of their initial sign in provider)
- Users can browse events by category and date
- Users can access the dashboard to see their future and past events
- Users can search for events by name
- Users can search for an event by name or description using an autocomplete search bar

**Admin Features:**

- Admin Dashboard to see events curated by the admin, profile information and a settings tab (settings not implemented in the MVP)
- Event creation using an intuitive form with drag and drop interface for image upload
- Event editing utilising a populated version of the create event form for quick edits
- Event deletion functionality (2 step deletion process to prevent accidental deletion)

## Installation and Setup

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dudleyspence/EventHub.git
   cd EventHub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

### Environment Variables

there is 4 .env files for this project:
create all 4 of the bellow .env files at the project root.

`.env`:

```bash
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

`.env.development`, `.env.test`, `.env.production`:

Choose the email and password for your initial admin login

```bash
DATABASE_URL=
ADMINEMAIL=
ADMINPASSWORD=
```

### Cloudinary Setup

EventHub relies on **Cloudinary** for image hosting. If you plan to run this project, you’ll need:

1. **Cloudinary Account**

   - Sign up for a free account at [cloudinary.com](https://cloudinary.com/).

2. **Create an Upload Preset**

   - In your Cloudinary dashboard, go to **Settings -> Upload**.
   - Create a new unsigned **Upload Preset**.
   - Copy the preset name.

3. **Environment Variables**
   - In your `.env` file, store your Cloud Name and Upload Preset, for example:
     ```bash
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
     ```
   - The application will use these environment variables to upload images.

---

### Database Setup

1. Create MySQL databases for development and testing environments

- I recommend local hosting for test and dev databases as this is much faster.
- Create a production database using a hosting provider of your choice (i used railway)
  **Environment Variables**

  - In your `.env.development`, `.env.test`, `.env.production` files, store your databaseURLs, for example:
    ```bash
    DATABASE_URL=
    ```

2. Run the following commands to set up and seed the databases:

```bash
# Setup databases
npm run setup:dev
npm run setup:test

npm run reset:prod
npm run setup:prod

# Seed databases with initial data
npm run seed:dev
npm run seed:test

# If you want to seed the production db
npm run seed:prod
```

### Authentication Setup

1. Set up OAuth credentials for Google and GitHub authentication:

   - Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth App in [GitHub Developer Settings](https://github.com/settings/developers)

2. Add the following environment variables to your `.env` file:

   ```bash
   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # GitHub OAuth
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret

   # NextAuth Secret
   # Generate a secure random string for this value
   NEXTAUTH_SECRET=your-nextauth-secret-key
   ```

3. Configure the OAuth callback URLs in Google Cloud Console and GitHub:
   - Google callback: `http://localhost:3000/api/auth/callback/google` (development)
   - GitHub callback: `http://localhost:3000/api/auth/callback/github` (development)
   - Update callback URLs for production domain when deploying

### Graphics and Images

- Essestial branding is in the `public/brand` folder
- Graphics for the loading states and headings are in the `public/graphics` folder

these can be chaged and updated as needed by swapping out the files using the same file names.

---

## Development

```bash
npm run dev
```

## Testing

Run the following commands to run the tests and coverage:

```bash
npm run test
```

```bash
npm run coverage
```

## Hosting the project

Create an account with a hosting provider. I strongly recomment using Vercel for this project as it is very easy to use and has a free tier and works seamlessly with Next.js.

Once you have created an account and connected your GitHub repository

before you deploy the project, you will need to update the environment variables on your project settings
for this you will need to use all variables in both the `.env` and `.env.production` files.

once you have updated the environment variables, you can deploy the project.

once deployed, you can access the project at the URL provided by Vercel.
