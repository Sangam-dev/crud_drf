export default function GroceryItem({ item, onUpdate, onDelete }) {
  const toggleCheck = () => {
    onUpdate({ ...item, completed: !item.completed });
  };

  const removeItem = () => {
    onDelete(item.id);
  };

  const editItem = () => {
    const newTitle = prompt("Edit item:", item.title);
    if (newTitle !== null) {
      const trimmed = newTitle.trim();
      if (trimmed !== "") {
        onUpdate({ ...item, title: trimmed });
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
