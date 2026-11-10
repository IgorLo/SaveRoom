# Project dates and ordering implementation plan

> **For agentic workers:** Work through these tasks in order, checking each result before continuing.

**Goal:** Show first-commit dates, public project links, and a user-controlled order on Save Room.

**Architecture:** Keep optional creation dates and editorial order in the publication JSON. Use one pure catalog sorter for server rendering and client-side selection. Compose the selector and links from the installed Svelte ASCII UI components.

**Tech Stack:** SvelteKit, Svelte 5, TypeScript, Zod, Svelte ASCII UI 0.2.0, Vitest, Playwright.

**Spec:** User request in this chat on 2026-11-10, extending `docs/superpowers/specs/2026-11-05-save-room-design.md`.

## Tasks

- [x] Add failing catalog tests for optional dates, editorial order, newest-first date order, and undated projects last. Replace `publishedAt` with `createdAt` in the schema and content; use verified first-commit dates.
- [x] Add failing browser checks for the sort control, links, and HASCII rename. Add Svelte ASCII UI `Select`, update card and article metadata, and show only public GitHub links.
- [x] Use the current HASCII mark as the cover and move the article to `/projects/hascii/` without preserving the old URL. Update publishing documentation.
- [x] Run format, lint, type, content, unit, build, and browser checks. Inspect desktop and mobile layouts, then push to `main` and verify GitHub and Vercel.
