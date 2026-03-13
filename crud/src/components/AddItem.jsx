import { useState } from "react";

export default function AddItem({ onAdd, isSaving }) {
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    if (isSaving) return;
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
        disabled={isSaving}
      />
      <button onClick={handleAdd} disabled={isSaving}>
        {isSaving ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
