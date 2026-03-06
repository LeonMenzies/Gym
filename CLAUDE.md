# CLAUDE.md — Project Instructions

## Project Overview
**OrganizationStation** — personal multi-purpose React Native app (Expo). Local-first, no backend. Modules: Timer (gym + stretch), To-Do, Recipes, Notes, Settings.

## Directory
All app code lives in `mobile-frontend/`. The `backend/` directory is legacy and not in use.

## Tech Stack
- **React Native** 0.81+ with **Expo** 54
- **TypeScript** — strict mode
- **Zustand** — state management (replaced Recoil)
- **React Navigation 7** — navigation
- **AsyncStorage** — local persistence
- **react-native-reanimated** — animations

## Architecture Rules

### State
- Use **Zustand** stores in `src/store/`. One store per module (e.g. `timerStore.ts`, `todoStore.ts`).
- Persist stores with `zustand/middleware` `persist` + AsyncStorage.
- No Recoil. No Redux.

### Navigation
- Root is `TabNavigator` — no auth gating, no onboarding.
- 5 tabs: Timer, Todo, Recipes, Notes, Settings.
- Use `@react-navigation/native-stack` for nested stacks within tabs.

### Storage
- All data stored locally via AsyncStorage.
- No API calls, no backend, no auth.

### File Structure
```
mobile-frontend/src/
├── components/       # Shared UI components
├── navigation/       # Navigators only (no business logic)
├── screens/          # One folder per module
│   ├── timer/
│   ├── todo/
│   ├── recipes/
│   ├── notes/
│   └── settings/
├── store/            # Zustand stores
├── hooks/            # Shared custom hooks
├── types/            # Shared TypeScript types
└── utils/            # Helpers, constants, storage service
```

### Naming Conventions
- Files: PascalCase for components/screens (e.g. `TimerScreen.tsx`)
- Files: camelCase for stores, hooks, utils (e.g. `timerStore.ts`, `useTimer.ts`)
- No `.js` files — TypeScript only
- Screens suffix: `Screen` (e.g. `TodoScreen.tsx`)
- Stores suffix: `Store` (e.g. `todoStore.ts`)

### Components
- Shared components in `src/components/` — keep generic and unstyled enough to reuse
- Screen-specific components live in the screen's folder
- No inline styles — use `StyleSheet.create()` or a theme object

### Theme
- Theme values come from the settings Zustand store
- Provide theme via a `useTheme()` hook that reads from the store
- Support light + dark mode

## Commands

```bash
# Start dev server
cd mobile-frontend && npx expo start

# iOS
cd mobile-frontend && npx expo run:ios

# Android
cd mobile-frontend && npx expo run:android

# Type check
cd mobile-frontend && npx tsc --noEmit

# Install packages
cd mobile-frontend && npm install <package>
```

## Working Process

### Deploying After Changes
After every coding session, **always** do all three steps without waiting to be asked:
1. `git add <changed files> && git commit -m "..."` — commit with a descriptive message
2. `git push` — push to GitHub
3. `cd mobile-frontend && CI=1 npx eas update --branch production --platform ios --message "..."` — publish OTA update

Never skip the EAS update. The commit message and EAS message should match.

### Task Tracking
- For any non-trivial task (3+ steps), use the **TaskCreate/TaskUpdate/TaskList** tools to maintain a live task list
- Mark tasks `in_progress` before starting, `completed` when done — keep the list current so progress is always visible
- Update task status continuously, not just at the end

### Tackling Bugs / Complex Problems
- Before diving in, **read the project brief** — check `CLAUDE.md` and `memory/MEMORY.md` for known crash history, past fixes, and architectural context
- Check `MEMORY.md` crash history section first; the bug may have been seen before
- Write out a short diagnosis plan (what you know, what you'll check) before making changes

## Do Not
- Do not add backend calls or API hooks
- Do not add auth / login flows
- Do not re-introduce Recoil
- Do not add onboarding screens
- Do not create files unless necessary — prefer editing existing ones
- Do not over-engineer — keep it simple and local-first
