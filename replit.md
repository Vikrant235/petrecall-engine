# PetRecall

## Overview
PetRecall is an automated patient recall system for veterinary clinics. It helps reactivate "lost" patients by sending personalized vaccine reminders via email, with automated scheduling capabilities. The app uses a pay-per-booking model.

## Recent Changes
- 2026-02-06: Migrated from Lovable to Replit environment
  - Updated Vite config to use port 5000 and allow all hosts
  - Removed lovable-tagger plugin dependency from vite config

## Project Architecture
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: react-router-dom v6
- **State Management**: @tanstack/react-query
- **Auth**: Firebase (needs configuration)
- **Structure**:
  - `src/pages/` - Page components (Index, Login, Dashboard, NotFound)
  - `src/components/` - Reusable UI components
  - `src/components/ui/` - shadcn/ui primitives
  - `src/contexts/` - React contexts (AuthContext)
  - `src/hooks/` - Custom hooks
  - `src/lib/` - Utilities and Firebase config

## User Preferences
- None recorded yet

## Running the Project
- `npm run dev` starts the Vite dev server on port 5000
