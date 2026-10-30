# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two co-primary audiences, ranked equally:

- **Prospective students** at Tecnológico de Monterrey (any major, any semester) deciding whether to apply through Candidates, the team's annual recruiting program. They arrive curious, often with no robotics experience, and need to see what the team does, what each role involves, and how to join.
- **Sponsors and donors**: companies and individuals deciding whether to fund the team with money, sponsorship packages or in-kind goods (flights, materials). They need credibility: real results, real robots, and a clear way to get in touch.

Secondary: the robotics competition community, current members and alumni (the member directory and the "Legacy" roster serve them).

## Product Purpose

RoBorregos is the robotics representative team of Tecnológico de Monterrey, Campus Monterrey, founded in 2015. The site exists to recruit new members and to win sponsorship, by showing the team's robots, people and competition record. Success means Candidates applications and sponsor contact requests.

Mission (existing copy): create a community that integrates students, teachers, alumni, companies, institutions and society to promote the development of robotics in Mexico. Vision (existing copy): inspire future generations of the robotics community in Latin America.

## Positioning

A student-run team that designs, builds and programs its own robots for national and international competitions (TMR, RoboCup, RoboCup @Home, IEEE LARC), and also teaches openly: free classes, workshops and open-source code. It began when four students won Rescue Maze at TMR 2015 and became the first Mexican team in the RoboCup Jr. Rescue Maze top 10.

## Operating Context

- Recruiting runs yearly through Candidates: weekly classes (programming, electronics, mechanics), a team build, and an internal tournament. Roles: Programmer, Electronics, Mechanics, Marketing.
- Applications and sponsor contact go through forms that post to PHP endpoints (`sendJoinUsEmail`, `sendContactUsEmail` in `src/scripts/apiScripts.js`) behind invisible reCAPTCHA. Donations link to the Tec services catalog.
- Member data is synced automatically from an external platform into `src/data/members.json` via pull requests; other content lives in `src/data/*.json`.
- Member profiles are deep-linkable with `/members?name=First%20Last`.

## Capabilities and Constraints

- Stack: Create React App (react-scripts 5), React 16, react-router-dom v5. Installing dependencies needs `npm install --legacy-peer-deps`.
- Routes to keep: `/`, `/about`, `/projects`, `/members`, `/candidates`, `/support-us`.
- Language: English site-wide; the Support Us page has an ES/EN toggle and must keep full Spanish copy.
- In progress on another branch (not in this fork yet): a donors leaderboard on Support Us (`src/data/donors.json`).

## Brand Commitments

- Name: RoBorregos. Logo: the ram mark with varsity-style block wordmark (`src/images/header.png`, `white_logo.png`, `small_logo.png`).
- Team jerseys are black and royal blue.
- Binding direction from the user for this redesign: no flashy colors and nothing that reads as "vibecoded"/AI-generated; prioritize animation quality and overall design craft.

## Evidence on Hand

- Timeline: 46 dated milestones from March 2015 to June 2023 with photos (`src/data/timeline.json`, `src/images/about/timeline/`).
- Members: 110 profiles (28 active, 82 legacy) with photos, roles, skills tags, GitHub/LinkedIn (`src/data/members.json`, `src/images/members/`).
- Projects: 4 flagship projects, 7 competition teams, 4 community projects with photos (`src/data/projects.json`, `src/images/projects/`).
- Sponsors: Tecnológico de Monterrey, 3D Factory, Altium, GitHub (`src/data/sponsors.json`, logos in `src/images/sponsors/`); three sponsorship packages with bilingual benefits.
- Photography: 18 team/competition photos (`src/images/home/carousel/`), Candidates photos (learn/hack/succeed), role photos, support-type photos.
- Videos: "Why are we RoBorregos?" (YouTube `LT7QiBrgZ4w`), "What is Candidates?" (`Iec50DS8R9Y`), three class playlists.
- **Absences:** no results data after 2023 — do not claim newer achievements. No testimonials, member counts beyond the data, press quotes or sponsor endorsements — do not fabricate them.

## Product Principles

1. Show, don't claim: lead with real robots, real people and dated results from the data.
2. Serve both audiences on every key page: a clear path to apply and a clear path to sponsor.
3. Openness is part of the identity: classes, code and knowledge are shared freely.
4. Generational continuity: legacy members and history are as much a part of the team as the current roster.
5. Content stays data-driven so the automated member sync and JSON edits keep working.
