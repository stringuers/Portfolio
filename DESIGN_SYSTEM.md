# Portfolio Design System

## 🎨 Color Palette

### Primary Colors
- **Primary (Electric Cyan)**: `hsl(188 100% 55%)` - `#00e5ff`
  - Used for: Main brand color, CTAs, highlights, links
  - Feel: Techy, futuristic, energetic

- **Secondary (Deep Teal)**: `hsl(195 85% 42%)` - `#0ea5e9`
  - Used for: Secondary actions, accents, supporting elements
  - Feel: Professional, trustworthy, calm

- **Accent (Warm Amber)**: `hsl(38 92% 60%)` - `#f59e0b`
  - Used for: Special highlights, achievements, warm touches
  - Feel: Warm, inviting, attention-grabbing

### Neutral Colors
- **Background**: `hsl(220 45% 9%)` - `#0d1117` (Deep Navy)
- **Background 2**: `hsl(220 40% 12%)` - `#161b22`
- **Foreground**: `hsl(210 20% 98%)` - `#f8fafc` (Off-white)
- **Muted**: `hsl(220 25% 15%)`
- **Border**: `hsl(220 30% 18%)`

## 📐 Typography

### Font Families
- **Sans-serif**: Inter (system fallback)
- **Monospace**: JetBrains Mono (Fira Code fallback)
- **Display**: Inter (for headers)

### Type Scale
- **H1**: `clamp(2.5rem, 5vw, 4rem)` - Hero titles
- **H2**: `clamp(2rem, 4vw, 3rem)` - Section headers
- **H3**: `clamp(1.5rem, 3vw, 2rem)` - Subsection headers
- **Body**: `1rem` with `line-height: 1.7`

### Font Features
- Font smoothing: Antialiased
- Letter spacing: `-0.02em` for headers
- Font features: `"rlig" 1, "calt" 1`

## 🎭 Design Principles

### Visual Identity
- **Techy & Futuristic**: Electric cyan glows, glassmorphism
- **Clean & Minimal**: Generous whitespace, clear hierarchy
- **Warm & Trustworthy**: Amber accents, smooth transitions
- **Professional**: Consistent spacing, polished interactions

### Spacing System
- Base unit: `0.25rem` (4px)
- Common spacing: `0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem`
- Section padding: `py-24` (6rem vertical)

### Border Radius
- Default: `0.875rem` (14px)
- Cards: `var(--radius)`
- Buttons: `rounded-md` to `rounded-lg`

## ✨ Effects & Animations

### Glassmorphism
- Background: `bg-card/80 backdrop-blur-sm`
- Border: `border-border` with hover states
- Used in: Navigation, cards, modals

### Glows
- Primary glow: `shadow-glow-primary`
- Secondary glow: `shadow-glow-secondary`
- Accent glow: `shadow-glow-accent`

### Animations
- **Fade In**: `animate-fade-in` (0.6s ease-out)
- **Slide Up**: `animate-slide-up` (0.6s ease-out)
- **Float**: `animate-float (6s ease-in-out infinite)`
- **Gradient Shift**: `animate-gradient-shift` (8s ease infinite)

### Micro-interactions
- Hover scale: `hover:scale-[1.02]` to `hover:scale-110`
- Button press: `active:scale-95`
- Smooth transitions: `transition-all duration-300`

## 🧩 Component Library

### Buttons
- **Hero**: Gradient primary with glow on hover
- **Outline Glow**: Transparent with glowing border
- **Ghost**: Minimal hover state
- **Default**: Solid primary background

### Cards
- Background: `bg-card/80 backdrop-blur-sm`
- Border: `border-border` with hover states
- Hover: Scale and border color change
- Padding: `p-6` to `p-8`

### Navigation
- Sticky with glassmorphism
- Active section highlighting
- Smooth scroll behavior
- Mobile menu with slide animation

### Forms
- Inputs: `bg-background/50` with focus states
- Labels: Clear hierarchy
- Validation: Toast notifications
- Loading states: Spinner animations

## 📱 Responsive Design

### Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly targets (min 44x44px)

## 🎯 UX Improvements

### Visual Hierarchy
1. Clear section headers with gradient text
2. Consistent spacing between elements
3. Progressive disclosure of information
4. Strong contrast for readability

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Reduced motion support

### Performance
- CSS animations (GPU-accelerated)
- Lazy loading for images
- Optimized transitions
- Minimal JavaScript for animations

## 🚀 Implementation Notes

### CV Downloads
- Paths: `/cv/Cv_English.pdf` and `/cv/cv.pdf`
- Video support: Optional `videoUrl` prop
- Download triggers: Direct file download

### Scroll Animations
- Intersection Observer for performance
- Staggered animations for lists
- Trigger once by default

### Color Usage Guidelines
- Primary: Main actions, important elements
- Secondary: Supporting elements
- Accent: Special highlights, achievements
- Muted: Backgrounds, subtle elements

## 📝 Component Usage Examples

### Hero Section
- Large gradient text
- Animated typing effect
- CTA buttons with hover effects
- Social links with glassmorphism

### Project Cards
- Featured badge for important projects
- Hover scale and glow effects
- Tag system with color coding
- Action buttons with icons

### Experience Timeline
- Vertical timeline with gradient line
- Alternating card layout
- Icon-based categorization
- Achievement lists

### Skills Visualization
- Progress bars with color coding
- Category icons
- Hover interactions
- Proficiency percentages

---

**Last Updated**: 2025
**Designer**: AI Assistant
**Status**: Production Ready

