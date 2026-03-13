import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import GroceryList from "./GroceryList";

export default function GroceryApp() {
  const [items, setItems] = useState([]);
  const API_URL = "http://localhost:8000/api/items/";

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to load items from API:", error);
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

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
