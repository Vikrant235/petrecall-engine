
# Login Page and Firebase Authentication Implementation

## Overview
This plan creates a dedicated login page with a proper email/password and Google sign-in form, fully integrated with Firebase Authentication. Users will only need to fill in their Firebase configuration values to make everything work.

## What Will Be Built

### 1. New Login Page (`/login`)
A clean, professional login page that includes:
- Toggle tabs at the top for "Login" and "Sign Up"
- Email input field
- Password input field
- Submit button ("Login" or "Create Account")
- Divider with "or" text
- "Continue with Google" button
- Link to switch between login and signup modes

### 2. Firebase Integration
The `AuthContext` will be updated to use real Firebase Authentication:
- Initialize Firebase app using the config from `firebase-config.js`
- `signInWithEmailAndPassword` for email login
- `createUserWithEmailAndPassword` for signup
- `signInWithPopup` with GoogleAuthProvider for Google login
- `onAuthStateChanged` listener for session persistence
- `signOut` for logout

### 3. Updated Navigation Flow
- "Client Login" button in Navbar and Hero CTA will navigate to `/login` page
- After successful login, user is redirected to `/dashboard`
- The onboarding modal will appear over the dashboard (as it currently does)

---

## Technical Details

### Files to Create

**`src/pages/Login.tsx`**
A new page component with:
- Tab toggle for Login/Sign Up modes
- Form with email and password fields using existing UI components
- Error message display for auth errors
- Loading state during authentication
- Google sign-in button
- Redirect to dashboard on successful auth

### Files to Modify

**`src/lib/firebase-config.js`**
- Add Firebase app initialization
- Add Firebase Auth initialization
- Export the auth instance for use in AuthContext

**`src/contexts/AuthContext.tsx`**
- Import Firebase Auth from the config
- Replace mock authentication with real Firebase methods:
  - `signInWithEmailAndPassword`
  - `createUserWithEmailAndPassword`
  - `signInWithPopup` (Google)
  - `signOut`
- Add `onAuthStateChanged` listener for session management
- Add new `signUp` and `signInWithEmail` functions to the context

**`src/components/Navbar.tsx`**
- Change "Client Login" button to use `navigate('/login')` instead of calling `signInWithGoogle` directly

**`src/components/HeroSection.tsx`**
- Change "Get Started with Google" button to use `navigate('/login')` instead of calling `signInWithGoogle` directly

**`src/App.tsx`**
- Add new route for `/login` page

---

## Login Page Design

```text
+------------------------------------------+
|                                          |
|          PetRecall Logo + Shield         |
|                                          |
|    +--------+    +-----------+           |
|    | Login  |    |  Sign Up  |           |
|    +--------+    +-----------+           |
|                                          |
|    +--------------------------------+    |
|    |  Email                         |    |
|    +--------------------------------+    |
|                                          |
|    +--------------------------------+    |
|    |  Password                      |    |
|    +--------------------------------+    |
|                                          |
|    +--------------------------------+    |
|    |         Login / Sign Up        |    |
|    +--------------------------------+    |
|                                          |
|           -------- or --------           |
|                                          |
|    +--------------------------------+    |
|    |  G  Continue with Google       |    |
|    +--------------------------------+    |
|                                          |
|    [Error messages appear here]          |
|                                          |
|         Back to Home link                |
|                                          |
+------------------------------------------+
```

---

## User Flow After Implementation

1. User visits landing page
2. Clicks "Client Login" or "Get Started with Google"
3. Redirected to `/login` page
4. Can choose to:
   - Enter email/password and click Login/Sign Up
   - Click "Continue with Google" for Google OAuth
5. On successful authentication, redirected to `/dashboard`
6. Onboarding modal appears (if first time)

---

## Setup Instructions (For You)

After this is implemented, you will need to:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use an existing one
3. Enable **Email/Password** authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
4. Enable **Google** authentication:
   - Go to Authentication > Sign-in method
   - Enable Google and configure
5. Add your domain to Authorized domains
6. Copy your Firebase config values and update `firebase-config.js`:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## Dependencies

Firebase SDK will need to be installed:
- `firebase` package (for Firebase Auth)

This is a standard npm package that will be added to the project.
