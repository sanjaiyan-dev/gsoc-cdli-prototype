



# 📱 CDLI Mobile Prototype – GSoC 2026

👋 **Hello! Welcome to my prototype for the Cuneiform Digital Library Initiative (CDLI) mobile app.** 

This repository serves as my proof-of-concept for Google Summer of Code 2026. My goal here wasn't just to fetch data and put it on a screen, but to design a robust, modern mobile architecture that feels as buttery-smooth and intuitive as the apps we use every day (like Twitter or Instagram). 

I wanted to ensure that researchers, historians, and enthusiasts interacting with CDLI's massive library of artifacts get an uncompromising, modern mobile experience. 

---

## 🏗️ Architecture & Technical Philosophy

To push the boundaries of performance, I bypassed standard Expo Go and opted for a full **Expo Development Build (v55)**. This gave me the freedom to integrate native modules and leverage the cutting-edge of the React ecosystem:

*   **The New Architecture & React Compiler:** Enabled out-of-the-box to provide automatic, intelligent memoization. This results in naturally smooth performance without the clutter of manual `useMemo` or `useCallback` hooks.
*   **Concurrent React:** I experimented with React's new `<Activity>` component to efficiently hide, restore, and suspend the UI and internal state of its children—something that will be incredibly useful for complex artifact rendering in the final app. I also used `useDeferredValue` for intelligent debouncing, ensuring search inputs remain highly responsive even when querying large datasets.
*   **NativeWind:** For clean, scalable, and highly maintainable utility-first styling.

## ⚡ Core Features

### 1. Social-Media-Grade Data Fetching
Handling large datasets requires smart networking. I implemented **TanStack React Query** (`useInfiniteQuery`) to power the data layer.
*   **How it feels:** Exactly like scrolling through your favorite social feed. It loads the next page only when you reach the bottom.
*   **Under the hood:** It handles scroll restoration, parallel fetching, aggressive deduplication, and degrades gracefully on poor network connections. 

### 2. High-Performance Lists & Masonry Layout
Rendering thousands of artifacts can easily cause dropped frames. To prevent this, I used **FlashList v2**, which aggressively recycles views for a massive performance boost. 
* For the artifacts feed, I built a **Masonry layout**. Since artifact images and descriptions vary in height, this stacks them seamlessly like a stone wall, maximizing screen real estate and looking visually stunning.

### 3. Media & UX Polish
A professional app is defined by its micro-interactions.
*   **Tactile Feedback:** Integrated `expo-haptics` to give users a subtle, luxurious vibration when they reach the end of a list.
*   **Image Caching:** Used `expo-image` (leveraging Glide on Android) for smart image caching, ensuring memory overhead stays low even when loading dozens of high-res artifact photos.
*   **Ergonomics:** Added `hitSlop` to interactive elements to comfortably expand touch targets without messing up the visual layout.

---

## 📂 Project Structure

The codebase is organized to be highly modular and scalable, following the new Expo Router file-based routing paradigms:

```text
├── api/          # Custom hooks for TanStack Query API integration
├── app/          # Main routing pages (Expo Router v3+ file-based routing)
├── components/   # Reusable UI elements (Buttons, Masonry List, Cards, etc.)
└── store/        # Jotai atoms for lightweight, frictionless global state
```

---

## 🌐 A Quick Note on the Data (API)

*For demonstration purposes, I hooked this prototype up to the live `/articles` and `/artifacts` endpoints from [https://cdli.earth](https://cdli.earth).* 

I sincerely apologize if these aren't the exact endpoints intended for the final GSoC project context! I simply needed live, authentic data to genuinely test the architecture, caching, and masonry layouts. Seeing real cuneiform tablets populate the app was the best way to ensure the UI handles real-world text and image dimensions.

---

## 🚀 Future Additions (Roadmap for the Final App)

While this prototype focuses on core architecture and UI, I have big plans for the final GSoC build:
1.  **Offline Support (`react-native-mmkv`):** I plan to add lightning-fast local storage so researchers can save their favorite artifacts for offline viewing with minimal memory overhead.
2.  **Seamless Sharing (`expo-share`):** Adding native share sheets so users can quickly text, email, or post links to specific tablets and translations directly from the app.

---

## 🛠️ How to Run Locally

Since this utilizes an Expo Development Build (with native modules like FlashList and Expo Image), you will need to run it as a dev build rather than through standard Expo Go.

```bash
# 1. Clone the repository
git clone https://github.com/sanjaiyan-dev/gsoc-cdli-prototype.git

# 2. Install dependencies
npm install

# 3. Prebuild and run on your preferred platform
npx expo run:android 
# OR
npx expo run:ios
```

---
*Thank you to the CDLI mentors for reviewing my proposal and prototype. I'm incredibly excited about the possibility of bringing this project to life this summer!*
