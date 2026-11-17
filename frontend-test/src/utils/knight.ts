
import { KNIGHT_MOVES } from "../constants/chess";
import type { Position } from "../types/chess";

export function isValidKnightMove(
  current: Position,
  target: Position,
  rows: number,
  columns: number
): boolean {
  const rowDiff = target.row - current.row;
  const colDiff = target.col - current.col;

  const isKnightMove = KNIGHT_MOVES.some(
    ([rowOffset, colOffset]) =>
      rowDiff === rowOffset && colDiff === colOffset
  );

  const isWithinBounds =
    target.row >= 0 &&
    target.row < rows &&
    target.col >= 0 &&
    target.col < columns;

  return isKnightMove && isWithinBounds;
}

