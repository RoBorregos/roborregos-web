---
name: RoBorregos
description: The robotics team of Tec de Monterrey, drawn as a RoboCup Rescue Maze field seen from above, at night.
colors:
  floor: "#111214"
  floor-raised: "#1a1c1f"
  seam: "#2a2d31"
  ink: "#ecedea"
  ink-muted: "#b8bcc1"
  ink-faint: "#8c9198"
  hole: "#000000"
  on-hole: "#ecedea"
  on-hole-muted: "#a6abb1"
  checkpoint-silver: "#b9bdc3"
  checkpoint-silver-hi: "#d6d9dd"
  checkpoint-silver-lo: "#9599a0"
  here-blue: "#1f4fd1"
  here-blue-text: "#8aa6f5"
  victim-red: "#ff5c63"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.45rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1.2
rounded:
  none: "0px"
spacing:
  wall: "4px"
  xs: "6px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  gutter: "clamp(16px, 3vw, 40px)"
  tile: "calc(min(1320px, 100vw - 2 * clamp(16px, 3vw, 40px)) / 12)"
components:
  checkpoint:
    backgroundColor: "{colors.checkpoint-silver}"
    textColor: "{colors.hole}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "14px 18px 16px"
    height: "64px"
  button-wall:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "11px 18px"
    height: "48px"
  button-wall-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.floor}"
  button-wall-on-hole:
    backgroundColor: "transparent"
    textColor: "{colors.on-hole}"
    rounded: "{rounded.none}"
    padding: "11px 18px"
    height: "48px"
  switch-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "38px"
  switch-option-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.floor}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.none}"
    padding: "0 12px"
    height: "34px"
  chip-pressed:
    backgroundColor: "{colors.here-blue}"
    textColor: "#ffffff"
  input:
    backgroundColor: "{colors.floor-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 14px"
  nav-tile:
    backgroundColor: "{colors.floor}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.none}"
    padding: "0 16px 10px"
    width: "104px"
  nav-tile-here:
    backgroundColor: "{colors.floor-raised}"
    textColor: "{colors.ink}"
  hole-tile:
    backgroundColor: "{colors.hole}"
    textColor: "{colors.on-hole}"
    rounded: "{rounded.none}"
---

# Design System: RoBorregos

## Overview

**Creative North Star: "The Maze Field at Night"**

The site is a RoboCup Rescue Maze field seen from above, the arena where the team's first robot won in 2015. Everything sits on one square tile module: a 12-column field (6 columns under 820px) whose tile width is the field width divided by the column count. The floor is a dark, cool field (the shipped state is dark mode, by user decision), seams are hairlines between tiles, walls are light ink bars, hole tiles are true black, and the field's two kinds of marked tile carry meaning: silver checkpoint tiles are the only frame for the two primary actions (Apply to Candidates, Become a sponsor), and royal blue marks "you are here".

Density is editorial rather than dashboard: long single-axis pages, each section separated from the next by a wall with one doorway gap. Content is rows on the floor (dated results, roles, timeline entries) divided by seams and walls, not floating cards. Photography is real team and competition imagery, square-cropped to tiles. Type is Archivo throughout, its width axis doing the work a second family would: the expanded heavy cut for display, normal width for reading.

Motion answers input. A small top-down robot marker travels between nav tiles and down the About year rail; pages already visited stay mapped with a small silver dot. The only continuous motion is the user-pinned sponsor marquee on Home. There is no load-time hero run: the hero photo shows immediately.

**Key Characteristics:**
- One square tile module drives every column, gap and section padding.
- Square corners everywhere; borders are walls (2px to 4px light ink) or seams (1px).
- Silver checkpoint = primary action, blue = current location or selected state, red = error. Nothing else is colored.
- Archivo variable (wdth 62..125, wght 100..900), one family, width as the hierarchy axis.
- Dark field, light ink, logos rendered as light silhouettes.

## Colors

A near-monochrome night field with three functional marks, each holding exactly one meaning.

### Primary
- **Checkpoint Silver** (checkpoint-silver): the reflective checkpoint tile. Fills only the primary-action tiles (Apply, Become a sponsor, form submits) and always carries black text. Its lighter and darker siblings (checkpoint-silver-hi, checkpoint-silver-lo) are the inset bevel on those tiles; silver-lo also marks visited nav tiles.

### Secondary
- **Jersey Royal Blue** (here-blue): "you are here" and selection. Fills the current tile in the mobile map, the selected Candidates phase, pressed filter chips, the robot's heading wedge, and the input focus border. White text on it.
- **Signal Blue Text** (here-blue-text): blue as text and outline on the dark floor, where royal blue would be too dark to read: focus rings, the active year on the About rail, member role lines, the text caret.

### Tertiary
- **Victim Red** (victim-red): errors only. Invalid field borders, error messages, the failure toast mark.

### Neutral
- **Night Floor** (floor): page background and sticky bars.
- **Raised Floor** (floor-raised): the current nav tile, hovered rows, inputs, photo placeholders, the Support Us contact band.
- **Seam** (seam): 1px tile seams, row dividers, chip outlines, the field grid drawn behind the hero and page heads.
- **Wall Ink** (ink): text and walls. Section thresholds, nav and controls rules, button and input outlines, the selected half of switches.
- **Muted Ink** (ink-muted): secondary reading text (leads, descriptions, inactive nav labels).
- **Faint Ink** (ink-faint): dates, counts, placeholders, small print, the scrollbar thumb.
- **Hole Black** (hole): hole tiles. The footer, the Home hero's origin-story tile, the Candidates and Members closing bands, video wells.
- **On-Hole Ink / Muted** (on-hole, on-hole-muted): text inside hole tiles.

### Named Rules
**The One Meaning Rule.** Silver means "act here", blue means "you are here / selected", red means "something is wrong". Never use one of them for decoration or for a different meaning.

**The Checkpoint Scarcity Rule.** A screen carries at most the two primary actions as checkpoint tiles (plus a form's submit). Every other action is a wall-outline button or a text link.

## Typography

**Display Font:** Archivo at width 125 (with system-ui, sans-serif)
**Body Font:** Archivo at normal width (same fallback)

**Character:** One variable family stretched to its widest, heaviest cut for headings, like field markings stencilled on the floor, and relaxed to normal width for reading. Numbers are tabular site-wide so dates and counts align in rows.

### Hierarchy
- **Display** (800, width 125, clamp(2.5rem, 6vw, 5.75rem), 0.95, -0.035em, balanced wrap): page titles in the page head, max about 16ch. The Home hero uses a smaller clamp(2.2rem, 4.6vw, 4.6rem) to fit five tiles.
- **Headline** (800, width 125, clamp(2rem, 4vw, 3.4rem), 1, -0.03em): section titles and closing-band calls. Same cut is reused at fixed sizes for year labels on About and package names on Support Us.
- **Title** (700, width 112, clamp(1.2rem, 1.6vw, 1.45rem), 1.15): row and tile titles, checkpoint labels, flagship and role names.
- **Lead** (400, clamp(1.05rem, 1.3vw, 1.25rem), 1.5, muted ink, max 58ch): the paragraph under a display or headline.
- **Body** (400, 17px, 1.55, tabular figures, max 66ch for secondary body): reading text.
- **Label** (600 to 650, 0.875rem to 0.95rem): buttons, form labels, nav tiles, dates, counts. Sentence case, no tracking, no uppercase.

### Named Rules
**The Width Axis Rule.** Hierarchy comes from Archivo's width and weight axes, never from a second family. Expanded (wdth 112 to 125) is for headings and tile labels only; reading text stays at normal width.

**The Plain Label Rule.** Labels are sentence case at normal tracking. No monospace, no uppercase micro-labels, no small text set above a heading.

## Layout

The field is `min(1320px, 100vw - 2 x gutter)` wide and centered; the gutter is clamp(16px, 3vw, 40px). One tile is the field width over 12 columns (6 columns at 820px and below, where the wall also thins to 3px and the nav to 64px). Columns, image widths and gaps are written in tiles (2-tile date column, 3-tile thumbnail, 0.3-tile gaps), so everything scales together.

Pages run on one vertical axis. Sections pad one tile above and 1.25 tiles below, and are separated by a **threshold**: a full-width wall bar with a one-tile doorway gap in its second tile. Page heads are a walled frame drawn over the seam grid, holding the display title, the lead, and up to two checkpoints. Content inside sections is laid out as rows on the floor (results, work, timeline, ways to help, side projects) or as seam-divided grids (roles, teams, roster). Closing bands are hole tiles in full-bleed black.

The Home hero is a tile grid with seams visible: headline in the left five columns, photo across the right seven, two checkpoints in the row under the headline, and a black hole tile holding the dated origin story, with light-ink wall segments drawn over the grid in an SVG overlay.

Responsive: below 960px the nav strip becomes a "Map" button that opens a full-screen 2-column tile map; below 820px multi-column rows stack, the About year rail becomes a horizontal sticky scroller, and sheets dock to the bottom.

## Elevation & Depth

The field is flat. Depth comes from tone (floor, raised floor, hole black) and from walls, not shadows. Two exceptions exist and both are physical: the checkpoint tile's inset bevel, and the modal sheet lifting off a dimmed field.

### Shadow Vocabulary
- **Checkpoint bevel** (`box-shadow: inset 0 1px 0 #d6d9dd, inset 0 -2px 0 #9599a0`): the slight relief of a reflective checkpoint tile. Checkpoints only.
- **Sheet lift** (`box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8)` over a `rgba(0,0,0,0.72)` scrim): application and member-profile sheets only.
- **Focus halo** (`box-shadow: 0 0 0 3px rgba(31,79,209,0.25)` with a royal-blue border): focused inputs and the member search.

### Named Rules
**The Flat Field Rule.** Nothing on the floor casts a shadow. Separate surfaces with a wall, a seam or a tone step.

## Shapes

Every corner is square (0px radius), including inputs, chips, toasts, sheets and photos. The form language is the tile and the wall: walls are light-ink strokes at 2px (controls, rows, grids) or the 4px wall token (nav bottom, page-head frame, sheet frame, thresholds); seams are 1px. Photos are cropped into tile-proportioned frames (1:1, 3:2, 4:5) with `object-fit: cover`. Icons are 24-unit stroke icons with square caps and mitred joins. The robot marker is a top-down chassis built from rectangles: silver wheels, raised-floor body, blue heading wedge.

## Components

### Buttons
- **Checkpoint (primary):** a silver tile with black text, label bottom-left and an arrow bottom-right, minimum 64px tall (72px in page heads, 96px in closing bands), at least three tiles wide where space allows. Inset bevel per Elevation. Press scales to 0.97 over 160ms ease-out; on fine pointers a single light glint sweeps across the tape on hover (700ms).
- **Wall button (secondary):** transparent with a 2px light-ink outline, 48px tall (38px small), label weight 650. Hover on fine pointers inverts to an ink fill with floor text; press scales to 0.97. On hole tiles the outline and text use on-hole ink.
- **Icon button:** a 42px square with the same 2px wall; same hover inversion, press 0.94.
- **Text link:** weight 650, underlined (1.5px, offset 0.22em), with a trailing arrow icon.

### Chips and Switches
- **Segmented switch:** options share one 2px ink outline with 2px ink dividers, 38px tall, flush with no gaps; the pressed option inverts to an ink fill. Used for the member status filter and the Support Us ES/EN toggle.
- **Filter chip:** 34px, 1.5px seam outline, muted text; hover lifts the outline to ink; pressed fills royal blue with white text. Filtered-out roster entries dim to 18% and greyscale instead of disappearing.
- **Tag:** skill tags on profiles, a 1.5px seam outline, no fill.

### Cards / Containers
There are no floating cards. Containers are tiles on the field:
- **Rows:** grid rows divided by 1px seams under a 2px ink top wall.
- **Seam grids:** roles, teams and packages sit in cells divided by seams or 2px walls, padding about 12px to 24px.
- **Hole tiles:** black bands and tiles with on-hole text, for the footer, closing calls and the Home origin story.
- **Sheets:** a floor panel framed by a 4px ink wall, max 960px wide, fading in at 200ms and rising 12px at 260ms; bottom-docked on small screens.

### Inputs / Fields
- **Style:** 2px ink outline, raised-floor fill, light text, square, 12px by 14px padding; labels sit above at 0.875rem weight 650.
- **Focus:** border turns royal blue with a 3px translucent blue halo; other focusable elements get a 3px signal-blue outline, offset 2px.
- **Error:** border and message in victim red. Checkboxes use royal blue as the accent color.

### Navigation
A sticky bar on the floor with a 4px ink wall underneath. The wordmark (inverted to light) sits left; on the right a strip of six nav tiles divided by seams, each at least 104px wide. The current tile lifts to the raised floor with full ink text; visited tiles show a 6px silver-lo square. The robot marker rides the strip's bottom edge and drives to the current tile (460ms, ease-in-out), turning to face its direction of travel. Below 960px the strip collapses to a "Map" button opening a 2-column tile map where the current page is a royal-blue tile with the robot on it.

### Sponsor Marquee (signature, user-pinned)
Directly under the Home hero, all sponsor logos run in a continuous linear loop (32s) inside seam-divided three-tile cells. Logos render as light silhouettes (greyscale, inverted to about 93% at 72% opacity, full opacity on hover). The loop pauses on hover and on keyboard focus, and becomes a static, horizontally scrollable row under reduced motion.

### Year Rail (signature)
On About, a sticky rail of years beside the timeline, on a 2px ink spine. The robot marker drives down the rail to the active year (420ms, ease-in-out); the active year is signal blue and bolder. On small screens it becomes a horizontal sticky scroller with the robot inline beside the active year.

## Do's and Don'ts

### Do:
- **Do** size columns, gaps and padding in tiles so the field stays on one module.
- **Do** separate sections with a threshold wall with one doorway, and rows with 1px seams.
- **Do** frame the two primary actions (Apply to Candidates, Become a sponsor) and form submits as silver checkpoint tiles with black text, and nothing else.
- **Do** use royal blue only for "you are here" and selection, signal blue for blue text and focus, red only for errors.
- **Do** keep motion responsive to input: press scale 0.97, 150 to 250ms ease-out state changes, hover effects only on fine pointers, and every animation reduced to near zero under reduced motion.
- **Do** render partner logos as light silhouettes on the dark field.
- **Do** dim filtered items rather than hiding them.

### Don't:
- **Don't** round corners; every radius is 0.
- **Don't** add drop shadows, glows or decorative gradient fills to anything on the floor (the checkpoint bevel, its glint and the sheet lift are the only depth effects).
- **Don't** introduce a second typeface, monospace labels, uppercase micro-labels or small text above headings.
- **Don't** use any accent color outside its one meaning, or add new hues.
- **Don't** add load-time choreography or autoplaying motion; the sponsor marquee is the single continuous loop.
