# Implementation Plan: BRMW Editor UI/UX Pro Max Refactor

## Objective
Coordinate specialized agents to refactor the Editor Interface (Canvas surroundings) of the `brmodelo-web` application, applying the `ui-ux-pro-max` Glassmorphism design system. This will fix the current visual inconsistencies caused by the Tailwind integration and elevate the editor to a premium, modern, and professional look.

## 1. Project Planning & Architecture (`project-planner`)

- **Current State:** The Editor UI (`MenuBar`, `TopBar`, `Toolbar`, `PropertyPanel`, `StatusBar`) currently relies on legacy raw CSS classes. With the recent global Tailwind CSS injection, some of these styles are clashing or breaking, resulting in poor contrast (e.g., dark gray backgrounds with dark text), missing padding, and a lack of modern polish.
- **Proposed Architecture:** Remove the legacy CSS layout constraints from `index.css` and migrate all Editor UI components to utilize Tailwind CSS utility classes directly. We will strictly follow the generated `design-system/brmw-editor/MASTER.md`.
- **Target Aesthetic:** Glassmorphism, clean layouts, subtle borders (`border-slate-200`), distinct shadows (`shadow-sm`, `shadow-md`), and proper spacing (`p-2`, `gap-4`).

### Files to Modify:
- `src/index.css` (Clean up old `.menubar`, `.topbar`, `.toolbar`, `.panel-right` classes).
- `src/components/MenuBar.jsx` (Add glassmorphism background `bg-white/90 backdrop-blur`, fix dropdown menus with proper shadows and hover states).
- `src/components/TopBar.jsx` (Add consistent padding, update button hover states to `hover:bg-slate-100`, correct typography).
- `src/components/Toolbar.jsx` (Redesign tool buttons with rounded corners, subtle active states `bg-blue-50 text-blue-600`, and tooltips).
- `src/components/PropertyPanel.jsx` (Fix the background color to `bg-slate-50`, ensure text contrast is high `text-slate-900`/`text-slate-600`, style inputs and tabs modernly).
- `src/components/StatusBar.jsx` (Clean footer bar with subtle typography).

## 2. Implementation Steps (Phase 2 - Parallel Execution)

Once this plan is approved, the following agents will execute in parallel:

**Core UI/UX Polish (`frontend-specialist`, `frontend-design`):**
1. **CSS Cleanup:** Remove conflicted raw CSS from `index.css` to prevent layout bugs.
2. **Component Migration:** Refactor the 5 core Editor UI components using Tailwind CSS classes. Apply the specific constraints from the Pro Max Design System (e.g., `cursor-pointer` everywhere, stable hovers without jumping, SVG icons correctly sized).
3. **Contrast & Aesthetics:** Ensure light mode contrast ratios (4.5:1) are met, especially in the `PropertyPanel`. Use `border-slate-200` to separate panels clearly from the white canvas.

**Verification & Audit (`test-engineer`, `devops-engineer`):**
4. **Visual Testing:** Launch the browser agent to capture a full-screen screenshot of the newly styled editor.
5. **Quality Gate:** Confirm no layout shifts exist and hover states provide clear feedback.

---

**Do you approve this plan to modernize the Editor UI? (Y/N)**
