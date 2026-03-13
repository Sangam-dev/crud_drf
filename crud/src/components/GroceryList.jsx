import GroceryItem from "./GroceryItem";

export default function GroceryList({ items, onUpdate, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
