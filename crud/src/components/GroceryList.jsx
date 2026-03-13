import GroceryItem from "./GroceryItem";

export default function GroceryList({ items, setItems }) {
  return (
    <ul>
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          item={item}
          setItems={setItems}
        />
      ))}
    </ul>
  );
}
