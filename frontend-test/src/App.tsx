import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);

  const [inputRows, setInputRows] = useState("8");
  const [inputColumns, setInputColumns] = useState("8");

  const [boardVersion, setBoardVersion] = useState(0);


  function handleDimensionChange(
    value: string,
    setter: (value: string) => void
  ) {

    // Only allow integers between 1 and 100
    if (value !== "" && (!/^\d+$/.test(value) || Number(value) > 100)) {
      return;
    }

    setter(value);
  }

  function isValidDimension(value: string): boolean {
    const number = Number(value);

    return (
      value.trim() !== "" &&
      Number.isInteger(number) &&
      number >= 1 &&
      number <= 100
    );
  }

  function handleGenerateBoard() {
    if (
      !isValidDimension(inputRows) ||
      !isValidDimension(inputColumns)
    ) {
      return;
    }

    setRows(Number(inputRows));
    setColumns(Number(inputColumns));
    setBoardVersion((version) => version + 1);
  }

  return (
    <main className="app">
      <h1>Chess Lonely Knight</h1>

      <section className="controls">
        <div className="field">
          <label htmlFor="rows">Row</label>
          <input
            id="rows"
            type="text"
            inputMode="numeric"
            value={inputRows}
            onChange={(event) =>
              handleDimensionChange(event.target.value, setInputRows)
            }
          />
        </div>

        <div className="field">
          <label htmlFor="columns">Column</label>
          <input
            id="columns"
            type="text"
            inputMode="numeric"
            value={inputColumns}
            onChange={(event) =>
              handleDimensionChange(event.target.value, setInputColumns)
            }
          />
        </div>

        <button onClick={handleGenerateBoard}>
          Generate Board
        </button>
      </section>

      <Board
        key={boardVersion}
        rows={rows}
        columns={columns}
      />
    </main>
  );
}

export default App;

