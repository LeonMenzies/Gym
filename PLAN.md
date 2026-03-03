# App Rewrite Plan

## What We're Building

A personal multi-purpose utility app. Local-first, no backend required for core features.

---

## Modules

### 1. Timer (Gym + Stretch)
- Rest timer (existing) — circular visual countdown, preset durations
- Stretch timer — guided holds with audio/haptic cues, inspired by Bend app
  - Configurable hold duration, number of reps, rest between reps
  - Visual + haptic feedback at transitions

### 2. To-Do List
- Simple task list with categories/tags
- Persistent locally via AsyncStorage
- Mark complete, delete, reorder

### 3. Recipe Book
- Store personal recipes with ingredients + steps
- Searchable, categorised (breakfast, dinner, etc.)
- Local storage only

### 4. Notes
- Freeform markdown-style notes
- Title + body, searchable
- Local storage

### 5. Settings
- Theme (light/dark)
- Units (metric/imperial)
- App-level preferences

---

## Architecture

### State Management
Replace Recoil with **Zustand** — simpler, less boilerplate, no Provider wrapping issues.

### Navigation
React Navigation bottom tabs with 5 tabs:
```
TabNavigator
├── Timer      (gym rest + stretch modes)
├── To-Do      (task list)
├── Recipes    (recipe book)
├── Notes      (freeform notes)
└── Settings
```

### Storage
AsyncStorage via a simple local storage service per module (no backend).

### Tech Stack
| Category     | Choice                           |
|--------------|----------------------------------|
| Framework    | React Native + Expo              |
| Language     | TypeScript                       |
| State        | Zustand (replace Recoil)         |
| Navigation   | React Navigation 7 (keep)        |
| Storage      | AsyncStorage (keep)              |
| Animations   | react-native-reanimated (keep)   |
| Icons        | expo/vector-icons                |

---

## Phased Rollout

### Phase 1 — Clean Slate (Now)
- [ ] Strip out backend auth, onboarding, API hooks
- [ ] Remove Recoil, replace with Zustand
- [ ] Set up new TabNavigator with 5 tabs (placeholder screens)
- [ ] Keep existing rest timer working

### Phase 2 — Timer Module
- [ ] Port rest timer to new architecture
- [ ] Add stretch timer mode (hold duration + reps)
- [ ] Haptic feedback at transitions

### Phase 3 — To-Do List
- [ ] CRUD tasks with local persistence
- [ ] Categories + completion state

### Phase 4 — Notes
- [ ] CRUD notes with title + body
- [ ] Search

### Phase 5 — Recipe Book
- [ ] CRUD recipes (title, ingredients, steps, category)
- [ ] Search + filter by category

### Phase 6 — Polish
- [ ] Consistent design system across modules
- [ ] Dark/light theme applied everywhere
- [ ] App icon + splash screen update

---

## What Gets Removed
- Backend integration (auth, onboarding, `/user/*` endpoints)
- 12-stage onboarding wizard
- Gym selection / workout generation stub
- Recoil atoms and RecoilRoot
- API hooks (useFetchApi, usePostApi)
- Apple Sign-In (can be added back later if needed)

---

## Key Files (Current → New)

| Current | Fate |
|---------|------|
| `src/screens/home/Home.tsx` | Replace with Timer screen |
| `src/screens/rest/` | Port to Timer module |
| `src/screens/auth/` | Delete |
| `src/screens/onboarding/` | Delete |
| `src/screens/settings/` | Simplify |
| `src/recoil/` | Delete → replace with `src/store/` (Zustand) |
| `src/navigation/AppNavigator.tsx` | Rewrite (no auth gating) |
| `src/navigation/TabNavigator.tsx` | Rewrite (5 tabs) |
| `src/hooks/useFetchApi.ts` | Delete |
| `src/hooks/usePostApi.ts` | Delete |
| `src/hooks/usePersistentUser.ts` | Replace with Zustand persist |
| `src/utils/OnboardingProvider.tsx` | Delete |
| `src/utils/StorageService.ts` | Keep + extend |
