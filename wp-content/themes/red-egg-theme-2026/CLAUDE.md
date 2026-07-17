# CLAUDE.md — Red Egg Marketing Theme (2026 Rebuild)

This file provides project context for Claude Code. It is read automatically at the start of every conversation in this repo.

## Project Overview

Custom WordPress theme for Red Egg Marketing (redeggmarketing.com). Built with custom Gutenberg blocks (React-based), Webpack, and SCSS. No block.json — blocks are registered inline via `registerBlockType()` in each block's `index.js`.

## Theme Architecture

```
red-egg-theme-2026/
├── functions.php              # Theme setup, hooks, requires
├── header.php / footer.php    # Template chrome
├── style.css                  # Compiled from SCSS (don't edit directly)
├── blocks.editor.css          # Compiled editor styles (don't edit directly)
├── inc/                       # PHP includes
│   └── custom-endpoints.php   # REST API endpoints
├── img/                       # Theme images, SVGs, icons
├── js/                        # Compiled frontend JS
└── support/                   # ⬅ Development workspace
    ├── blocks/                # Gutenberg block source files
    │   └── index.js           # Master entry — imports all blocks
    ├── components/            # Shared React components (Padding.js, Margin.js)
    ├── scss/                  # SCSS source
    │   ├── style.scss         # Master entry → ../../style.css
    │   ├── editor.scss        # Editor entry → ../../blocks.editor.css
    │   ├── _variables.scss    # Design tokens, colors, fonts, mixins
    │   ├── _base.scss         # Global resets
    │   └── _spacing.scss      # Padding/Margin utility classes
    ├── front-end.js           # Frontend entry — imports dynamic block frontends
    ├── assets/js/             # Webpack output
    ├── blocks.php             # PHP block registration
    ├── webpack.config.js
    └── package.json
```

## Build Commands

```bash
cd support/
npm install
npm run dev     # webpack --mode development --watch
npm run build   # webpack --mode production
```

## PHP Conventions

- **Theme slug**: `red-egg`
- **Function prefix**: `red_egg_` (e.g., `red_egg_theme_setup()`, `red_egg_theme_scripts()`)
- **Block names**: `red-egg-block/block-name`
- **Short array syntax**: Always `[]` not `array()`
- **Hook pattern**: Define function, then `add_action()` / `add_filter()` immediately below
- **Require pattern**: Group at bottom of `functions.php` with docblock comments
- **REST endpoints**: Live in `inc/custom-endpoints.php`, namespace `red-egg/v2`
- **Escaping**: Use `esc_html__()`, `esc_url()`, `esc_attr()`. Text domain is `red-egg`
- **Dynamic blocks**: `render_callback` builds HTML via string concatenation (`$block_content .= '<div>...'`), not output buffering
- **ACF**: Guard with `if (function_exists('get_field'))`, use `'options'` for site-wide settings

## Gutenberg Block Conventions

### Block File Structure
```
support/blocks/block-name/
├── index.js          # Block registration
├── edit.js           # Editor component
├── save.js           # Save/frontend markup
├── frontend.js       # (optional) Frontend-only React rendering
└── _style-block.scss # Block-specific styles
```

### Block Registration (index.js)
- Import from `wp.*` globals, NOT `@wordpress/*` packages:
```js
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
```
- `apiVersion: 2`
- Attributes defined inline (no block.json)
- Category: `'layout'`
- Icon: WordPress Dashicon string

### Edit Component (edit.js)
- Destructure from `wp.*` globals at top of file
- **Arrow function components** with PascalCase names
- `useBlockProps()` with className matching the block's CSS class
- Wrap return in `<Fragment>` with `<InspectorControls>` for sidebar
- Clone objects before mutating: `JSON.parse(JSON.stringify(obj))`
- All blocks include Padding and Margin inspector controls:
```js
import Padding, { getPaddingClasses } from '../../components/Padding';
import Margin, { getMarginClasses } from '../../components/Margin';
```

### Save Component (save.js)
- `useBlockProps.save()` for save context
- Static markup only — no event handlers, no state
- Use `<RichText.Content>` for saved rich text

### Frontend JS (frontend.js)
- For blocks needing client-side interactivity (API calls, sliders)
- Uses `wp.element` render() to hydrate a root element
- Uses `wp.apiRequest()` for REST API calls, not `fetch()` directly

## REST API Endpoints

| Endpoint | Callback | Used By |
|----------|----------|---------|
| `/red-egg/v2/case-studies` | `red_egg_return_case_studies` | Case Studies Slider |
| `/red-egg/v2/reviews` | `red_egg_return_reviews` | Testimonials |
| `/red-egg/v2/resources` | `red_egg_return_resources` | Insights |

## Design Tokens

### Colors
```scss
$gray:        #424042;   // Primary text, borders, buttons
$red:         #DC2035;   // Accent, links, CTA highlights
$peach:       #F79E83;   // Hero background, insight cards
$navy:        #024D69;   // Numbered list background
$eggshell:    #F2ECE5;   // Contact section background
$purple:      #A89AAE;   // Testimonials background
$magenta:     #E32E6D;
$orange:      #F68633;
$gold:        #F6B319;   // Star ratings
$dark-purple: #91288D;
$white:       #FFFFFF;
```

### Typography
| Mixin | Font | Weight | Desktop (px) | Mobile (px) |
|-------|------|--------|-------------|------------|
| `@include hero-h1` | Poppins | 600 | 88/108 | 44/54 |
| `@include primary-h1` | Poppins | 700 | 50/60 | 34/44 |
| `@include primary-h2` | Poppins | 700 | 37/47 | 25/35 |
| `@include primary-h3` | Poppins | 700 | 25/35 | 18/28 |
| `@include h3-caps` | Poppins | 700 | 25/35 ls:5px | 18/28 ls:5px |
| `@include primary-h4` | Poppins | 500 | 22/34 | 17/26 |
| `@include h4-sup` | Poppins | 500 | 22/34 ls:5px | 17/26 ls:2px |
| `@include body-text` | Figtree | 300 | 20/30 | 18/28 |
| `@include button-text` | Poppins | 500 | 17/25 | 16/23 |
| `@include gray-button` | Full button mixin with hover state |

### Breakpoints
```scss
$large-width:      1400px;
$med-width:        1200px;
$med-small-width:  1080px;
$small-med-width:  875px;
$small-width:      768px;   // Primary mobile/desktop breakpoint
$form-width:       641px;
$xs-width:         414px;
```

### Layout
```scss
$max-cont-w:           1428px;
$site-padding:         150px;    // Desktop
$site-padding-mobile:  30px;     // Mobile
$default-border-radius: 8px;
$button-border-radius:  50px;
```

## SCSS Conventions

- **Mobile-first**: Always `@media screen and (min-width: $breakpoint)`
- **Nest media queries** inside the selector they modify
- **Units**: `rem` for spacing/margins/padding, `px` for widths/border-radius/fixed dimensions
- **No CSS custom properties** — use SCSS variables only
- **No BEM** — use descendant selectors scoped to block root class (`.hero .block-wrapper h2`)
- **Block styles**: Scope to root class, use `.block-wrapper` as inner container
- **Flexbox** for layout: `display: flex` with `flex-wrap`, `align-items`, `justify-content`
- **Per-block styles**: `support/blocks/block-name/_style-block.scss`
- **Global styles**: `support/scss/` with underscore-prefixed partials

### Standard block SCSS structure:
```scss
.block-name {
    position: relative;
    padding-top: $default-section-padding-top;
    padding-bottom: $default-section-padding-bottom;

    .block-wrapper {
        @include block-wrapper;
    }

    // Block-specific styles...

    &.no-padding-top { padding-top: 0; }
    &.no-padding-bottom { padding-bottom: 0; }
    &.no-margin-top { margin-top: 0; }
    &.no-margin-bottom { margin-bottom: 0; }
}
```

## Homepage Blocks (in page order)

1. **Hero** (`red-egg-block/hero`) — Peach bg, hero heading, CTA, egg images
2. **Columns Group** (`red-egg-block/columns-group`) — Image + content two-column
3. **Text Cards Grid** (`red-egg-block/text-cards-grid`) — 3 service cards with repeater
4. **Numbered List** (`red-egg-block/numbered-list`) — Navy bg, 01/02/03 items
5. **Case Studies Slider** (`red-egg-block/case-studies-slider`) — Dynamic, has frontend.js
6. **Testimonials** (`red-egg-block/testimonials`) — Dynamic, purple bg + egg pattern
7. **Insights** (`red-egg-block/insights`) — Dynamic, peach blog cards
8. **Contact Section** (`red-egg-block/contact-section`) — Dynamic render callback, form shortcode support

## Build Tooling

- **Webpack** (not wp-scripts)
- **Babel** with `@babel/preset-env` + `@babel/preset-react`
- **SCSS** via `sass-loader` + `postcss-loader` (autoprefixer) + `mini-css-extract-plugin`
- **Externals**: `lodash` (provided by WordPress)
- **Editor script deps**: `['wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor', 'wp-block-editor', 'wp-dom-ready', 'wp-api-request', 'lodash']`

## Figma Source Files

- Desktop: https://www.figma.com/proto/Fl5BVVyhYGn7QEU8vLw9Ba/Red-Egg-26-Mockup
- Mobile: https://www.figma.com/proto/645cGhfarOogOzc6tLqpNL/Red-Egg-26-Mobile

## Blob Decoration (GSAP MorphSVG)

The `BlobAnimation` component (`support/components/BlobAnimation.js`) renders a
decorative SVG blob that morphs between shapes via GSAP MorphSVG. Path data lives
in TWO places that must stay in sync: `BLOB_SHAPES` in the component (editor/save
output) and the `shapes` object in `support/js/blob-animation.js` (frontend morph
targets).

**Before wiring up ANY new/edited blob path, verify all shapes pass these checks**
(a stray straight line during the morph almost always traces back to one of them):

- **Equal anchor counts** — every shape must have the SAME number of cubic
  segments. Unequal counts force MorphSVG to inject points, which flatten a
  segment mid-tween.
- **No zero-length / degenerate segments** — design tools (Figma/Illustrator)
  often export a closed path whose last point sits exactly on the start, adding a
  zero-length closing line. Invisible when static, but it breaks the morph. The
  final cubic must end exactly on the M start point, closed with a single `Z`.
- **All absolute cubics** — normalize to `M … C … Z` (no relative/line commands)
  so structure is identical across shapes.
- **Phase-aligned** — all shapes should start at the same relative position
  (e.g. same angle from centroid) and share winding direction (CW), so mapped
  points travel minimal distances. Resampling to a high equal point count
  (~48) at equal arc-length is the most robust way to guarantee this.
- **Morph config** (`js/blob-animation.js`): `type:'rotational'`,
  `shapeIndex:'auto'`, `precision:5`, `origin:'50% 50%'`. Do NOT use invented
  options like `smooth:{}` (silently ignored). `map:'complexity'` only matters
  for unequal counts — omit it.

Quick sanity check with `svgpathtools`: `parse_path(d)` should report the same
count of `CubicBezier` for every shape, zero `Line` segments, and `isclosed()`.

Note: changing a blob path changes save-block markup, so existing blob-using
blocks (hero, service-list, etc.) will show a "block contains unexpected content"
notice until re-saved / recovered.

The blob bleeds outside its block by design (`overflow: visible`); do NOT try to
fix a straight edge with `overflow: hidden` on an ancestor — that clips the blob
into a rectangle AND (on a `position: sticky` ancestor chain) breaks stickiness.

## Editor Layout Overrides — Tech Debt (TODO)

Several blocks whose InnerBlocks lay out in a grid/flex (`feature-cards`,
`text-cards-grid`, `numbered-list`) rely on **editor-only CSS** in
`support/scss/editor.scss` that targets Gutenberg's internal wrappers:
`.block-content > .block-editor-inner-blocks > .block-editor-block-list__layout`.

Those wrapper class names are internal Gutenberg markup with **no stability
guarantee** — a future WP/Gutenberg release can rename or restructure them
and silently break the editor layout (frontend is unaffected; it uses the
block's own `.block-content` grid).

**Durable fix (do later):** switch each block's `edit.js` from plain
`<InnerBlocks/>` to `useInnerBlocksProps` spread onto the `.block-content`
element, e.g.

```js
const innerProps = wp.blockEditor.useInnerBlocksProps(
    { className: 'block-content' },
    { template, allowedBlocks }
);
// ...
<div className="block-wrapper"><div { ...innerProps } /></div>
```

Then the block children render as **direct** children of `.block-content`
(no `.block-editor-inner-blocks` / `__layout` wrappers), so the frontend
`.block-content { display:grid }` applies in the editor too — and the
matching `editor.scss` overrides + resets can be **deleted**. This is the
official API, so it survives Gutenberg updates.

Scope: 3 blocks. Recommended order — do `feature-cards` first as a pilot,
verify in the editor, then apply the same pattern to `text-cards-grid` and
`numbered-list`. ~20–30 min + a per-block visual check.

To find the current editor DOM for any block, inspect it in the editor and
grab the `.block-content` subtree (fastest way to write/verify the selector).

## General Principles

- Keep things practical and working. Don't over-abstract.
- HTML comments at closing divs: `</div><!-- .wrapper -->`
- Use third-party libraries from CDNs when appropriate (Swiper, GSAP, Fancybox) — register as named script handles with proper dependency chains
- Commented-out code is fine temporarily as reference
- ASCII art in source comments is encouraged
