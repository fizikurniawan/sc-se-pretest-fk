import { useState } from "react";
import Square from "./Square";
import type { Position } from "../types/chess";
import { isValidKnightMove } from "../utils/knight";

type BoardProps = {
  rows: number;
  columns: number;
};

function Board({ rows, columns }: BoardProps) {
  const [knightPosition, setKnightPosition] = useState<Position>({
    row: 0,
    col: 0,
  });

  function isValidMove(row: number, col: number) {
    return isValidKnightMove(
      knightPosition,
      { row, col },
      rows,
      columns
    );
  }

  function handleSquareClick(row: number, col: number) {
    if (!isValidMove(row, col)) {
      return;
    }

    setKnightPosition({ row, col });
  }

  return (
    <div className="board">
      {Array.from({ length: rows }).map((_, row) => (
        <div
          className="board-row"
          key={row}
          style={{
            gridTemplateColumns: `repeat(${columns}, 40px)`,
          }}
        >
          {Array.from({ length: columns }).map((_, col) => (
            <Square
              key={`${row}-${col}`}
              isKnight={
                knightPosition.row === row &&
                knightPosition.col === col
              }
              isLight={(row + col) % 2 !== 0}
              isValidMove={isValidMove(row, col)}
              onClick={() => handleSquareClick(row, col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
