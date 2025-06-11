# Entertainment Web App (Next.js + Supabase)

> Discover, search, and bookmark movies and TV shows. Now with secure login, personalized content, and dynamic Supabase integration.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3)

## Project Overview

**Entertainment Web App** is a modern, mobile-first application that allows users to explore movies and TV shows, search content, and bookmark their favorites. Rebuilt with **Next.js App Router** and integrated with **Supabase** for authentication and dynamic data handling, each user gets a personalized experience. Bookmarked movies and series are securely stored per user. The UI is clean, fast, and responsive — focused on accessibility and user engagement.

## Features

- **Authentication with Supabase**  
  Users can sign up, log in, and securely access their own bookmark list.

- **Dynamic Data from Supabase**  
  Movies and TV shows are fetched in real-time from a hosted Supabase database.

- **Personalized Bookmarks**  
  Each authenticated user has a private list of bookmarked movies and series.

- **Mobile-First Design**  
  Layout and components are optimized for mobile usage and scale up responsively.

- **Context-Based Global State**  
  State is managed with `useContext` and `useState` without external libraries.

- **Next.js App Routing**  
  Page navigation is handled with the new App Router structure (`/app` directory).

- **Toast Notifications**  
  Real-time feedback for bookmarking actions using `react-hot-toast`.

## Application Pages

- **Login / Sign Up**: Entry point where users create or access their accounts.

![image](https://github.com/user-attachments/assets/dbbad4c9-af82-4100-bffa-22496f2f9e78)

- **Homepage**: Trending titles and personalized recommendations.

![image](https://github.com/user-attachments/assets/642c602d-5694-4362-85bd-403d5a3b7cbb)

- **Movies**: All movie-type entries.

![image](https://github.com/user-attachments/assets/93cbb517-1802-4ca3-a4c6-0e41358168cf)

- **TV Series**: Filtered list of TV series.

![image](https://github.com/user-attachments/assets/ed75e82c-313b-4d3e-85b8-b7a2554c3af3)

- **Bookmarks**: Items the current user has bookmarked.

![image](https://github.com/user-attachments/assets/394b845c-6ad9-4856-acdb-2bc500107a28)

## Technologies Used

- **Next.js (App Router)**
- **Supabase (Auth + Database)**
- **React (useState, useContext)**
- **CSS3**
- **react-hot-toast**

## Live Demo

You can view the deployed project here:  
[https://entertainment.gayedinc.com/homepage](https://entertainment.gayedinc.com/homepage)

## Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/gayedinc/entertainment-web-app.git
```

### 2. Navigate to the Directory

```bash
cd entertainment-web-app
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Set Up Environment Variables

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_anon_key
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

App will run at [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
app
├─ (auth)                 # Authentication routes
│  ├─ login
│  │  └─ page.js          # Login screen
│  ├─ signup
│  │  └─ page.js          # Sign up screen
├─ (main)                 # Protected routes (requires auth)
│  ├─ homepage
│  │  └─ page.js          # Homepage (trending + recommended)
│  ├─ movies
│  │  └─ page.js          # Movies listing page
│  ├─ series
│  │  └─ page.js          # TV Series listing page
│  ├─ bookmarks
│  │  └─ page.js          # Bookmarked items page
│  ├─ layout.js           # Shared layout for authenticated pages
│  └─ page.js             # Redirects to homepage
├─ layout.js              # Root layout
├─ page.js                # Default export page (redirects to login or homepage)
├─ favicon.ico

assets
└─ css
   ├─ main.css            # Main app styles
   └─ reset.css           # CSS reset styles

components                # Reusable UI components
├─ AuthForm.js
├─ BookMarkedMovies.js
├─ Header.js
├─ LogoutModal.js
├─ Movies.js
├─ Recommended.js
├─ Svg.js
└─ TvSeries.js

context                   # React context files
├─ BookmarkContext.js     # Global state for bookmarks
├─ DataContext.js         # Application-wide data
└─ UserContext.js         # User authentication context

public
├─ data                   # Static fallback JSON data (if needed)
└─ img                    # App assets and icons (e.g. logo.svg)

supabase
├─ client.js              # Supabase client instantiation
├─ middleware.js          # Middleware to protect routes
├─ server.js              # Server-side helpers (optional)
└─ supabaseClient.js      # Supabase client logic

.env.local                # Environment variables (Supabase credentials)
README.md
jsconfig.json
next.config.mjs
.gitignore
package.json
eslint.config.mjs
```

## License

This project is open source and available under the [MIT License](LICENSE).
