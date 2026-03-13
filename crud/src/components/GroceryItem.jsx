export default function GroceryItem({ item, setItems }) {
  const toggleCheck = () => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, completed: !i.completed } : i
      )
    );
  };

  const removeItem = () => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const editItem = () => {
    const newTitle = prompt("Edit item:", item.title);
    if (newTitle !== null) {
      const trimmed = newTitle.trim();
      if (trimmed !== "") {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id ? { ...i, title: trimmed } : i
          )
        );
      } else {
        alert("Item cannot be empty");
      }
    }
  };

  return (
    <li
      className={item.completed ? "checked" : ""}
      onClick={toggleCheck}
    >
      <span className="item-text">{item.title}</span>

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
