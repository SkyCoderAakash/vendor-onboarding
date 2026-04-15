# Vendor Onboarding Application

A 3-step vendor onboarding form with validation, file uploads, and Redux persistence.

## Tech Stack

- React 18 + TypeScript + Vite
- React Hook Form + Zod
- Redux Toolkit + Redux Persist
- IndexedDB (idb)
- TailwindCSS

## Features

- 3-step form with Next/Previous navigation
- Form validation per step
- Async dropdowns with loading states
- File upload with IndexedDB persistence
- Redux Persist (data survives page refresh)
- Progress indicator
- Responsive design
- Final submission with JSON preview

## Installation

```bash
npm install
npm run dev
Project Structure
text
src/
├── components/
│   ├── common/      # FormBuilder, Input, FileUpload, ProgressBar
│   └── form/        # Step1, Step2, Step3
├── config/          # steps.config.ts
├── hooks/           # useCachedDropdown.ts
├── pages/           # Onboarding.tsx
├── schemas/         # step1Schema, step2Schema, step3Schema
├── services/        # api.service.ts, indexedDB.service.ts
├── store/           # Redux store, slices, hooks
└── types/           # form.types.ts
How It Works
Form Flow
Step 1: Company & Contact info

Step 2: Address & Bank details

Step 3: Services & Declaration

Submit: JSON preview & success message

Data Persistence
Form data saved in Redux with Redux Persist

Files stored in IndexedDB, file IDs in Redux

Dropdown options cached after first load

Assumptions
Browser supports IndexedDB

File limits: 5MB images, 10MB documents

Mock API delay: 500ms