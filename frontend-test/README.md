# Chess Lonely Knight

Pre-interview frontend test — a chess board with a single knight. Built with Vite + React + TypeScript.

## Features

- Board rendered from user-defined dimensions (rows × columns)
- Two components: `Board` (grid + state) and `Square` (single cell)
- Exactly one knight, shown as a bold red **K**
- Knight starts at the top-left corner `(0,0)`
- Only the 8 legal knight moves are allowed:
  - right 2 / up 1, right 2 / down 1
  - left 2 / up 1, left 2 / down 1
  - right 1 / up 2, right 1 / down 2
  - left 1 / up 2, left 1 / down 2
- Hover behavior:
  - invalid square → red background
  - valid move → green background
  - current knight square → red background
- Click on an invalid square → knight does not move
- Click on a valid square → knight moves there
- **Generate Board** rebuilds the board from the row/column inputs and resets the knight to `(0,0)`
- Row/column inputs accept integers only, from 1 to 100

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig*.json
├── eslint.config.js
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx              # controls: row/column inputs + generate button
    ├── App.css
    ├── index.css
    ├── setupTests.ts        # jest-dom matchers
    ├── test-globals.d.ts    # Vitest matcher type augmentation
    ├── components/
    │   ├── Board.tsx        # grid, knight state, move handling
    │   └── Square.tsx       # single square
    ├── constants/
    │   └── chess.ts         # KNIGHT_MOVES
    ├── types/
    │   └── chess.ts         # Position, BoardSize
    ├── utils/
    │   ├── knight.ts        # isValidKnightMove
    │   └── __tests__/
    │       └── knight.test.ts
    └── __tests__/
        ├── App.test.tsx
        └── Board.test.tsx
```

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |

## Tests

Tests use **Vitest** with **jsdom** and **@testing-library/react**.

- `src/utils/__tests__/knight.test.ts` — unit tests for `isValidKnightMove`:
  all 8 valid L-moves, non-knight patterns, out-of-bounds, small boards
- `src/__tests__/Board.test.tsx` — component tests for `Board`:
  square/row count, knight marker, `valid-move` highlighting,
  move on valid click, no move on invalid click, highlight update after moving
- `src/__tests__/App.test.tsx` — component tests for `App`:
  default 8×8 board, controls rendering, integer-only input,
  values above 100 rejected, invalid dimensions ignored,
  board regenerated on valid input

```bash
npm run test:run
```

Current status: **29 tests passing**.

## Notes

- App source code was not modified to add tests — tests are additive only.
- `vitest.config.ts` mirrors `vite.config.ts` and adds a `jsdom` test environment.
- `src/test-globals.d.ts` augments Vitest's `Assertion` type with jest-dom matchers
  so `tsc -b` (used by `npm run build`) also type-checks the test files.
