type SquareProps = {
  isKnight: boolean;
  isLight: boolean;
  isValidMove: boolean;
  onClick: () => void;
};

function Square({
  isKnight,
  isLight,
  isValidMove,
  onClick,
}: SquareProps) {
  const classNames = [
    "square",
    isLight ? "light" : "dark",
    isKnight ? "knight" : "",
    isValidMove ? "valid-move" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
    >
      {isKnight && <span>K</span>}
    </button>
  );
}

export default Square;

