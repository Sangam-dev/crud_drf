import { useState } from "react";

export default function AddItem({ onAdd }) {
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      alert("enter value");
      return;
    }

    const success = await onAdd(trimmed);
    if (success) {
      setInput("");
    }
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
