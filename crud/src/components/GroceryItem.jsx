export default function GroceryItem({ item, setItems }) {
  const toggleCheck = () => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, checked: !i.checked } : i
      )
    );
  };

  const removeItem = () => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const editItem = () => {
    const newText = prompt("Edit item:", item.text);
    if (newText !== null) {
      const trimmed = newText.trim();
      if (trimmed !== "") {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, text: trimmed } : i
          )
        );
      } else {
        alert("Item cannot be empty");
      }
    }
  };

  return (
    <li
      className={item.checked ? "checked" : ""}
      onClick={toggleCheck}
    >
      <span className="item-text">{item.text}</span>

      <span
        className="edit"
        onClick={(e) => {
          e.stopPropagation();
          editItem();
        }}
      >
        ✎
      </span>

      <span
        className="remove"
        onClick={(e) => {
          e.stopPropagation();
          removeItem();
        }}
      >
        &times;
      </span>
    </li>
  );
}
