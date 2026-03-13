import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import GroceryList from "./GroceryList";

export default function GroceryApp() {
  const [items, setItems] = useState([]);
  const API_URL = "http://localhost:8000/api/items/";

  const createItem = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
      }

      const data = await response.json();
      setItems((prev) => [...prev, data]);
      return true;
    } catch (error) {
      console.error("Failed to create item:", error);
      return false;
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      const response = await fetch(`${API_URL}${updatedItem.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedItem.title,
          completed: updatedItem.completed,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update item: ${response.status}`);
      }

      const data = await response.json();
      setItems((prev) =>
        prev.map((item) => (item.id === data.id ? data : item))
      );
      return true;
    } catch (error) {
      console.error("Failed to update item:", error);
      return false;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}${itemId}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
      }

      setItems((prev) => prev.filter((item) => item.id !== itemId));
      return true;
    } catch (error) {
      console.error("Failed to delete item:", error);
      return false;
    }
  };

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

        <AddItem onAdd={createItem} />
        <GroceryList
          items={items}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />
      </div>
    </div>
  );
}
