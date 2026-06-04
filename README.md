# Nael Quote Trainer

A browser game for practicing Nael deus Darnus's quote-to-mechanic calls from the FFXIV raid *The Unending Coils of Bahamut (Ultimate)*.

During the fight, Nael speaks a flavor line that tells you which mechanics resolve and in what order. This app drills that recognition: it shows you a random quote and you press the matching mechanics, in sequence, before the timer runs out.

## How to play

1. Press **Start**. A random quote appears in Nael's speech bubble.
2. Press the mechanic buttons (**In**, **Out**, **Stack**, **Spread**, **Tankbuster**) in the order the quote calls for, before the timer expires.
3. A wrong press or running out of time ends the round — press **Retry** for a new quote.
4. Clear the sequence and press **Next** when you're ready for another.

## Getting started

Requires [Node.js](https://nodejs.org/) 18+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # produce a production build in dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Features

- **Quote drill** — a random quote loads each round; the same quote never repeats twice in a row.
- **Instant-fail input** — each press is checked immediately; one wrong button (or a timeout) ends the round.
- **Countdown timer** — a depleting bar shows the time left to answer.
- **Adjustable answer time** — set it with a slider/number input, or use the presets: **Default (6s)** and **Caller (4s)**.
- **Tag filter** — quotes are tagged by fight phase; filter the practice pool to the phases you want to drill.
- **Cheatsheet** — view every quote alongside its correct mechanic sequence.
- **Hide progress slots** — an anti-crutch toggle that hides the sequence slots while you answer (the correct order is still revealed on a miss).
- **Dark mode** — light/dark theme toggle that remembers your choice and respects your system preference.
- **Main menu** — return to the menu from any point.

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) for dev server and bundling
- Plain CSS (CSS variables for theming)

## Project structure

```
src/
  App.jsx            # game state machine and layout
  config.js          # answer-time presets and bounds
  data/
    quotes.js        # the quotes and their correct mechanic sequences
    mechanics.js     # the five mechanic buttons
    tags.js          # tags derived from the quote data
  hooks/
    useCountdown.js  # reusable countdown timer
    useTheme.js      # light/dark theme with persistence
  components/        # NaelStage, Timer, Controls, Cheatsheet, FilterModal, …
```

## Adding or editing quotes

Quotes live in [`src/data/quotes.js`](src/data/quotes.js) as a list of objects:

```js
{
  "quote": "O hallowed moon, take fire and scorch my foes!",
  "correct_sequence": ["in", "stack"],
  "tags": ["nael"]
}
```

`correct_sequence` values must match the mechanic ids in `src/data/mechanics.js`. Any new tag added here automatically appears in the filter.
