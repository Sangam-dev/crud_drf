import { useState } from "react";

export default function AddItem({ setItems }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") {
      alert("enter value");
      return;
    }

    const newItem = {
      id: Date.now(),
      text: input.trim(),
      checked: false,
    };

    setItems((prev) => [...prev, newItem]);
    setInput("");
  };

  return (
    <div className="items">
      <input
        type="text"
        placeholder="Add item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
