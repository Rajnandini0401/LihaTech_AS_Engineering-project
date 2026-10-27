# AGENTS.md - Project Guidelines & Coding Standards

## 1. Project Overview & Business Scope
**Company**: A S Engineering Work  
**Location**: Jakhinwadi, Tal. Karad, Dist. Satara, Maharashtra – 415539  
**Mobile**: +91 9850444542  
**Email**: asengineeringwork1@gmail.com  
**GSTIN**: 27KOSPS1009P1ZY  
**Specialization**: High-precision stainless steel manufacturing (SS Rings, Flanged Bushings, Submersible Pump Sleeves, Seamless Pipes, and Custom Machined Industrial Components).  
**Core Value Proposition**: Micro tolerances (±0.005mm), certified materials (SS 304, 316, 316L, 202 J4), in-house precision lathe, shearing, bending, and rolling workshop facility.

---

## 2. Tech Stack & Architecture
- **Frontend Core**: Vanilla HTML5, Vanilla CSS3 (Custom Design System with CSS Variables), ES6 JavaScript.
- **Third-Party Libraries**: Swiper.js (Sliders & 3D Coverflow), FontAwesome 6 (Icons), Google Fonts (Outfit & Inter).
- **Backend / Dev Server**: Node.js static server (`npx -y serve client -p 5173` for dev / Express server in `/server`).

---

## 3. Design System & Aesthetics
- **Color Palette**:
  - `Dark Navy Hero / Dark BG`: `#070D18`, `#0F172A`
  - `Primary Blue`: `#0F62FE` (Hover: `#0043CE`)
  - `Accent Orange`: `#F97316` (Hover: `#EA580C`)
  - `Body Text`: `#475569`, `#94A3B8`
  - `Light Background`: `#F8FAFC`
- **Typography**:
  - Headings: `'Outfit', sans-serif`
  - Body: `'Inter', sans-serif`
- **Visual Style**: Glassmorphism, 3D perspective transforms on cards, vibrant gradient badges, smooth micro-animations.

---

## 4. Key Page Layout Highlights
- `client/index.html`:
  - **Cinematic Hero**: Full-screen video background, centered tagline, title, compact CTA buttons, and flush bottom metrics bar.
  - **About Section**: 2x2 feature card grid, 15+ years badge, 3D hover tilt workshop image card.
  - **3D Coverflow Product Slider**: Interactive Swiper carousel showcasing 5 main SS product lines with grade badges & RFQ triggers.
  - **12-Step S-Wave Manufacturing Pipeline**: Dynamic SVG path animation (`client/js/swave-pipeline.js`) tracing step-by-step production flow from 1 to 12.
- `client/products.html`:
  - Integrated **Real Product Showcase** Swiper slider in top hero banner.
  - Detailed product grid with technical specifications & RFQ buttons.

---

## 5. Coding & Workflow Guidelines
- **Responsive Layout**: Ensure all elements scale seamlessly across Desktop, Laptop, Tablet, and Mobile views.
- **Single-Screen Hero**: Maintain the hero section within viewport bounds (`calc(100vh - headerHeight)`) for single-screen visual impact.
- **Accuracy**: Retain technical terms (±0.005mm micro tolerances, SS 304/316/316L, Jindal certified steel, Jakhinwadi Satara).
- **Clean Structure**: Keep CSS modularized in `client/css/style.css` and JavaScript organized in `client/js/`.
