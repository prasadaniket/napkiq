---
target: client/main/src/components/home/page.tsx
total_score: 34
p0_count: 0
p1_count: 1
timestamp: 2026-07-19T13-30-49Z
slug: client-main-src-components-home-page-tsx
---
# Design Critique: client/main/src/components/home/page.tsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Clear loading and selection states. |
| 2 | Match System / Real World | 4 | Natural terminology and logical flow. |
| 3 | User Control and Freedom | 4 | Simple navigation, easy exit/dismiss. |
| 4 | Consistency and Standards | 4 | Buttons and brand design are highly consistent. |
| 5 | Error Prevention | 3 | Good, but lacks API error fallback state. |
| 6 | Recognition Rather Than Recall | 4 | Logo and outlets are immediately recognizable. |
| 7 | Flexibility and Efficiency | 3 | Lacks keyboard controls for selection. |
| 8 | Aesthetic and Minimalist Design | 3 | Background is extremely loud, and title eyebrow uses AI scaffold. |
| 9 | Error Recovery | 2 | No feedback if the outlets list fails to load. |
| 10 | Help and Documentation | 3 | Minimal documentation/help, though not strictly required. |
| **Total** | | **34/40** | **Good** |

## Anti-Patterns Verdict

**LLM Assessment**:
The overall interface is clean, minimal, and fits a "warm luxury" brand with its dark red gradient background and floating glass-style buttons. However, the `Select Outlet` text is styled as a tiny uppercase tracked eyebrow (`text-[10px] uppercase tracking-[0.45em]`), which is a distinct AI generation scaffold tell. The glassmorphism on the non-selected buttons (`backdropFilter: 'blur(8px)'`) is functional for readability but borders on standard AI defaults.

**Deterministic Scan**:
The automated scanner (`detect.mjs`) ran successfully and returned no automated anti-pattern rules tripped (`[]`).

**Visual Overlays**:
No local live server injection was executed since the page was analyzed statically and via browser screenshot inspection.

## Overall Impression
A highly polished, mobile-friendly landing page with strong layout consistency and buttery-smooth tap animations. The primary opportunity is to improve text readability (contrast) against the vibrant red background and remove the AI-scaffold typography.

## What's Working
- **Tap Interaction**: Large touch targets (`h-[60px]`) with spring-based scale feedback feel very responsive and professional.
- **Visual Identity**: The logo presentation, brand subtitle, and dark-red aesthetic successfully convey a premium culinary identity.

## Priority Issues
- **[P1] Contrast & Readability**:
  - **Why it matters**: Low-opacity text elements (`text-white/60` and `text-white/40`) on the red background fail WCAG AA contrast rules (failing to meet 4.5:1), making them difficult to read outdoors or on low-end screens.
  - **Fix**: Elevate colors to solid white (`text-white`) or adjust opacity values to improve luminance contrast.
  - **Suggested command**: `/impeccable typeset`
- **[P2] AI Scaffold Eyebrow**:
  - **Why it matters**: The uppercase tracked "Select Outlet" eyebrow label is a generic AI design scaffold tell.
  - **Fix**: Modify the typographic hierarchy or style (e.g., lowercase or non-tracked serif font) to give it a more bespoke, high-end editorial feel.
  - **Suggested command**: `/impeccable typeset`
- **[P2] Lack of API Error Fallback**:
  - **Why it matters**: If the backend `/api/outlets` fails to respond, the page will endlessly show a blank container under the header, leaving the user stranded.
  - **Fix**: Render a clear, user-friendly error message with a "Retry" button on fetch failure.
  - **Suggested command**: `/impeccable harden`

## Persona Red Flags
- **Casey (Distracted Mobile User)**: The tiny low-contrast footer (`text-white/40 text-[11px]`) and eyebrow label (`text-white/60`) will be almost invisible in bright sunlight.
- **Riley (Deliberate Stress Tester)**: Simulated network failure leaves the user with a blank list and no way to retry, breaking the navigation flow.

## Minor Observations
- The animated background glow (`radial-gradient`) is a nice subtle touch but could be optimized to avoid layout paint cycles on lower-end mobile CPUs.
- The footer year is hardcoded to 2026; could use dynamic date initialization.

## Questions to Consider
- What if the red background was slightly deeper or had a darker vignette around the edges to make the text pop?
- Would a serif font for the headings (like Outfit or Playfair) enhance the "artisanal" brand voice?
