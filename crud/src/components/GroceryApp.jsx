import { useState } from "react";
import AddItem from "./AddItem";
import GroceryList from "./GroceryList";

export default function GroceryApp() {
  const [items, setItems] = useState([]);

  return (
    <div className="container">
      <div className="Groccery-app">
        <h2>
          Groccery list <img src="./images/icon.png" alt="icon" />
        </h2>

        <AddItem setItems={setItems} />
        <GroceryList items={items} setItems={setItems} />
      </div>
    </div>
  );
}
