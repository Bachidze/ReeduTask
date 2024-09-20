import React from 'react';

interface ShowSelectedProps {
  selectedColor: string;
  showColors: boolean;
  colors: string[];
  handleColorSelect: (color: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  catchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  toggleShowColors:any
}

export default function ShowSelected({
  selectedColor,
  showColors,
  colors,
  handleColorSelect,
  handleSubmit,
  catchInput,
  input,
  toggleShowColors
}: ShowSelectedProps) {
  return (
    <>
      <button
          className="text-[30px]"
          onClick={toggleShowColors}
          aria-label={showColors ? "Hide color selection" : "Show color selection"}
        >
          {showColors ? "Hide Color Selection" : "+"}
        </button>

        {selectedColor && (
          <div style={{ backgroundColor: selectedColor, fontSize: "19px" }}>
            <h2>Selected Color: {selectedColor}</h2>
          </div>
        )}

        {showColors && (
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                style={{ backgroundColor: color }}
                className="p-2 rounded-md"
                aria-label={`Select ${color}`}
              >
                {color}
              </button>
            ))}
          </div>
        )}

        {selectedColor && (
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              type="text"
              placeholder="Enter Txt"
              onChange={catchInput}
              className="border-2"
              aria-label="Enter todo text"
            />
            <button type="submit">Add Todo</button>
          </form>
        )} 
    </>
  );
}
