---
version: 1
slug: "src-app-js"
primary_target: "src/App.js"
related_targets: ["src/redesign"]
---

## Scope

Whole site (all six routes) for RoBorregos. Visitor mode: Persuade. Co-primary visitors: prospective Tec students (action: apply to Candidates) and sponsors (action: contact / become a sponsor). Proof: real dated results, robots, roster and photos from `src/data` only; nothing after 2023 is claimed.

## Direction contract

THESIS: The site is a RoboCup Rescue Maze field seen from above; the visitor explores it tile by tile, as the team's first robot did in 2015. It refuses the category default of photo hero plus rounded card grid plus logo marquee.

OWN-WORLD: Cool field-white floor #F3F4F1, true black #000 for hole tiles, walls and type, silver checkpoint tiles #B9BDC3 reserved for the two primary actions, jersey royal blue #1F4FD1 only for "you are here", victim red #D7262E only for errors. Everything sits on one square tile module; sections are separated by wall bars with a doorway gap. Archivo throughout: expanded heavy cut for display, normal width for text. No gradients, glows, mono labels or rounded cards.

STORY: Visitors see a real competition team at work, read dated results and the roster, then reach a checkpoint tile: Apply to Candidates or Become a sponsor.

FIRST VIEWPORT: Wordmark top left; nav as a six-tile strip top right with the robot marker on the current tile. Below, a 12 by 6 tile field. Left five columns: headline "The robotics team of Tec de Monterrey." with a two-line subline. Right seven columns by four rows: team photo revealed tile by tile as the robot runs one exploration path from the entry tile. Bottom row: two silver checkpoint tiles, Apply to Candidates and Become a sponsor, where the path ends.

FORM: Rescue Maze field, position 5 of 7 on the ordered list; seed key a8785a04. Signature interaction: the robot marker moves between nav tiles on navigation (ease-in-out) and visited tiles stay mapped. Motion grammar: one load-time exploration run on Home only; everything else answers input (press scale 0.97, 150 to 250 ms ease-out, hover only on fine pointers, reduced motion draws the path statically). Raises: visited-page trail (HyperCard); filters dim rather than hide (event display); stats trace to dated rows (jacquard); checkpoint tile is the only primary-action frame (deco); one axis per page with sections as thresholds (Versailles).

USER PIN (after direction lock): the user asked for a continuously moving carousel of all sponsors directly under the home hero. It overrides the single-load-motion rule for that band only: linear, pauses on hover and focus, static under reduced motion.

USER PIN (dark mode): the whole site runs dark. Floor #111214, raised floor #1A1C1F, seams #2A2D31, light ink #ECEDEA for text and walls, pure black #000 hole tiles, silver checkpoints keep black text, royal blue #1F4FD1 for fills with #8AA6F5 for blue text and focus rings, error red #FF5C63. Logos render as light silhouettes.

USER PIN (no hero run): the home hero has no robot exploration run, trail or tile reveal; the photo shows immediately. The robot marker remains only in the nav and the About year rail.

BUILDER ADAPTATION (cites the no-hero-run pin; not a user request): the hero's black hole tile holds the dated origin story (March 2015, first place in Rescue Maze at TMR, from timeline.json) as the hero's proof point in place of the removed path ending; the two checkpoints sit in the row under the headline.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Donors leaderboard (on another branch) is not yet in this fork; Support Us must leave room for it.
