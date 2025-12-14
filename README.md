# Stranger Things Neon Portfolio

A cinematic, immersive developer portfolio inspired by **Stranger Things**.(AI / ML Engineer), this site features a dual-theme system that toggles between the "Normal World" (Red/Hawkins) and the "Upside Down" (Blue), complete with particle effects, glitch animations, and a retro-synth aesthetic.

## ⚡ Features

- **Dual-Theme System**: Seamlessly switch between **Normal (Red)** and **Upside Down (Blue)** modes. The entire UI (colors, glows, particles, navbar brand) reacts dynamically.
- **Cinematic Animations**:
  - WebGL Lightning & Fog effects.
  - Floating "Dust Mote" particles (Snowfall/Ash).
  - Glitch text and neon flicker effects.
  - Scroll-triggered entry animations using **Framer Motion**.
- **Interactive Components**:
  - **Typewriter Terminal**: Retro code-typing effect for bio.
  - **Portal Loader**: A dramatic "Stranger Things" style intro sequence.
  - **Responsive Theme Switch**: A sliding toggle button adapting to mobile and desktop.
  - **Glassmorphism Cards**: Modern frosted glass UI elements.
- **Fully Responsive**: Optimized layouts for mobile, tablet, and desktop screens.
- **EmailJS Integration**: Functional contact form ready for EmailJS connectivity.
- **Dynamic Data**: All portfolio content (projects, skills, exp) is managed via a single `content.js` file for easy updates.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D/Visuals**: Canvas API, WebGL (via custom shaders)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/stranger-things-portfolio.git
    cd stranger-things-portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

4.  **Build for production**:
    ```bash
    npm run build
    npm run preview
    ```

## 📝 Customization

### 1. Update Content
Edit **`src/data/content.js`** to change:
- **Hero Section**: Name, role, tagline.
- **About**: Bio, specializations.
- **Experience & Skills**: Job history, skill bars.
- **Projects**: Title, description, tags, links.
- **Certifications**: Issuer, year, links.

### 2. Images & Assets
- **Portrait**: Place your photo in `public/media/` and update the path in `content.js`.
  - *Tip*: Set `portraitUrl: null` in `content.js` to display the thematic "Signal Lost" placeholder card if you don't have a photo yet.
- **Resumes/Certificates**: Place PDF files in `public/Certificates/`.

### 3. Theme Colors
The theme colors are defined as CSS variables in **`src/index.css`**:
```css
/* Normal (Red) */
:root { --theme-r: 229; --theme-g: 9; --theme-b: 20; }

/* Upside Down (Blue) */
:root[data-theme="upside-down"] { --theme-r: 76; --theme-g: 201; --theme-b: 240; }
```
Change these RGB values to customize the primary colors of each theme.

## 📧 Contact Form Setup
The contact form uses **EmailJS**. To enable it:
1.  Sign up at [EmailJS](https://www.emailjs.com/).
2.  Update `src/components/sections/ContactSection.jsx` (or use environment variables) with your:
    - `service_id`
    - `template_id`
    - `public_key`
