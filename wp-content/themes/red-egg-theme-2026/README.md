# Red Egg Marketing – WordPress Theme (2026 Rebuild)

Custom WordPress theme for [Red Egg Marketing](https://redeggmarketing.com), built with Gutenberg blocks, Webpack, and SCSS.

## Tech Stack

- **WordPress** with custom Gutenberg blocks (React-based, `wp.*` globals)
- **Webpack** for JS/SCSS compilation
- **SCSS** with mobile-first responsive breakpoints
- **Poppins** (headings) + **Figtree** (body) via Google Fonts
- **REST API** integration for dynamic content blocks

## Theme Structure

```
red-egg-theme/
├── functions.php                  # Theme setup, enqueues, requires
├── style.css                      # Compiled (do not edit directly)
├── blocks.editor.css              # Compiled editor styles
├── header.php / footer.php        # Template chrome
├── inc/
│   └── custom-endpoints.php       # REST API endpoints
├── img/                           # Theme images, icons, eggs
├── js/                            # Compiled frontend JS
└── support/                       # Development workspace
    ├── blocks/                    # Gutenberg block source files
    │   ├── index.js               # Master block entry point
    │   ├── hero/
    │   ├── columns-group/
    │   ├── text-cards-grid/
    │   ├── numbered-list/
    │   ├── case-studies-slider/
    │   ├── testimonials/
    │   ├── insights/
    │   └── contact-section/
    ├── components/                # Shared React components
    │   ├── Padding.js
    │   └── Margin.js
    ├── scss/                      # SCSS source
    │   ├── style.scss             # Master stylesheet entry
    │   ├── editor.scss            # Editor stylesheet entry
    │   ├── _variables.scss        # Design tokens, mixins
    │   ├── _base.scss             # Global resets
    │   └── _spacing.scss          # Utility classes
    ├── front-end.js               # Frontend entry point
    ├── assets/js/                 # Webpack output
    ├── blocks.php                 # Block registration (PHP)
    ├── webpack.config.js
    └── package.json
```

## Homepage Blocks

| # | Block | Type | Description |
|---|-------|------|-------------|
| 1 | Hero | Static | Peach background, hero heading, description, CTA, egg images |
| 2 | Columns Group | Static | Two-column image + content with section label, heading, CTA |
| 3 | Text Cards Grid | Static | Service cards (Branding, Websites, Marketing) with repeater |
| 4 | Numbered List | Static | Navy background, numbered items (01, 02, 03) |
| 5 | Case Studies Slider | Dynamic | Pulls from `red_egg_return_case_studies` REST endpoint |
| 6 | Testimonials | Dynamic | Pulls from `red_egg_return_reviews` REST endpoint |
| 7 | Insights | Dynamic | Pulls from `red_egg_return_resources` REST endpoint |
| 8 | Contact Section | Dynamic | Eggshell background, contact info, form (shortcode support) |

## Design Tokens

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gray | `#424042` | Primary text, borders, buttons |
| Red | `#DC2035` | Accent, links, CTA highlights |
| Peach | `#F79E83` | Hero background, insight cards |
| Navy | `#024D69` | Numbered list background |
| Eggshell | `#F2ECE5` | Contact section background |
| Purple | `#A89AAE` | Testimonials background |
| Gold | `#F6B319` | Star ratings |
| White | `#FFFFFF` | Cards, form fields |

### Typography
| Style | Font | Weight | Desktop | Mobile |
|-------|------|--------|---------|--------|
| Hero H1 | Poppins | 600 | 88/108 | 44/54 |
| H1 | Poppins | 700 | 50/60 | 34/44 |
| H2 | Poppins | 700 | 37/47 | 25/35 |
| H3 | Poppins | 700 | 25/35 | 18/28 |
| H4 | Poppins | 500 | 22/34 | 17/26 |
| Body | Figtree | 300 | 20/30 | 18/28 |

### Breakpoints
| Name | Width |
|------|-------|
| `$large-width` | 1400px |
| `$med-width` | 1200px |
| `$med-small-width` | 1080px |
| `$small-med-width` | 875px |
| `$small-width` | 768px |
| `$form-width` | 641px |
| `$xs-width` | 414px |

## Getting Started

```bash
# Navigate to the support directory
cd support/

# Install dependencies
npm install

# Development (watch mode)
npm run dev

# Production build
npm run build
```

### Webpack Output

| Entry | Output | Description |
|-------|--------|-------------|
| `blocks/index.js` | `assets/js/editor.blocks.js` | All block editor registrations |
| `front-end.js` | `assets/js/main.js` | Frontend interactivity (sliders, API) |
| `scss/style.scss` | `../../style.css` | Compiled theme stylesheet |
| `scss/editor.scss` | `../../blocks.editor.css` | Compiled editor stylesheet |

## Block Development

Each block follows this structure:

```
support/blocks/block-name/
├── index.js          # Block registration
├── edit.js           # Editor component
├── save.js           # Save/frontend markup
├── frontend.js       # (optional) Frontend React rendering
└── _style-block.scss # Block-specific styles
```

### Conventions
- Block names: `red-egg-block/block-name`
- Import from `wp.*` globals, not `@wordpress/*` packages
- Arrow function components with PascalCase names
- Clone objects with `JSON.parse(JSON.stringify())` before mutating
- All blocks include `Padding.js` and `Margin.js` inspector controls
- SCSS uses mobile-first `min-width` media queries with `$variables`

## REST API Endpoints

Dynamic blocks fetch data from custom endpoints registered in `inc/custom-endpoints.php`:

| Endpoint | Callback | Used By |
|----------|----------|---------|
| `/red-egg/v2/case-studies` | `red_egg_return_case_studies` | Case Studies Slider |
| `/red-egg/v2/reviews` | `red_egg_return_reviews` | Testimonials |
| `/red-egg/v2/resources` | `red_egg_return_resources` | Insights |

## Image Assets Required

The following images need to be placed in the theme `img/` directory:

- `red_egg.png` / `white_egg.png` – Hero egg images
- `egg_pattern.png` – Testimonials background pattern
- `egg-logo-mark-white.png` – Logo mark for numbered list section
- `divider.png` – Decorative scratch divider
- `icon-email-white.svg` – Contact email icon
- `icon-phone-white.svg` – Contact phone icon
- `icon-location-white.svg` – Contact location icon

## License

Proprietary – Red Egg Marketing. All rights reserved.
