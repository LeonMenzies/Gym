# OrganizationStation

Personal multi-purpose utility app. Local-first, no backend required.

## Modules

| Tab | Description |
|-----|-------------|
| **Timer** | Gym rest timer + guided stretch routines with haptic cues |
| **To-Do** | Simple task list with completion tracking |
| **Recipes** | Personal recipe book with ingredients and steps |
| **Notes** | Typed blocks — text notes, movies/TV tracker, subscriptions, key-value store |
| **Settings** | Light/dark theme, metric/imperial units |

## Tech Stack

- **React Native 0.81** + **Expo SDK 54**
- **TypeScript** (strict)
- **Zustand** — state management with AsyncStorage persistence
- **React Navigation 7** — bottom tabs + native stack
- **@expo/vector-icons** — SimpleLineIcons

## Project Structure

```
mobile-frontend/
├── src/
│   ├── screens/          # One folder per module
│   ├── store/            # Zustand stores
│   ├── navigation/       # Tab + stack navigators
│   ├── components/       # Shared UI components
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Helpers and constants
├── assets/               # Icons and images
└── app.json              # Expo config
```

## Running Locally

```bash
cd mobile-frontend

# Start dev server
npx expo start

# Type check
npx tsc --noEmit

# Run tests
npx jest
```

## Deploying

After every coding session, run all three steps:

```bash
# 1. Commit
git add <files> && git commit -m "..."

# 2. Push
git push

# 3. OTA update (iOS)
cd mobile-frontend && CI=1 npx eas update --branch production --platform ios --message "..."
```

## Data

All data is stored locally via AsyncStorage — no accounts, no server, no sync.
