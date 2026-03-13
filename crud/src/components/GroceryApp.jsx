import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import GroceryList from "./GroceryList";

export default function GroceryApp() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api/items/";

  const createItem = async (title) => {
    setError("");
    setIsSaving(true);
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
      setError("Unable to add item. Please try again.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateItem = async (updatedItem) => {
    setError("");
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
      setError("Unable to update item. Please try again.");
      return false;
    }
  };

  const deleteItem = async (itemId) => {
    setError("");
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
      setError("Unable to delete item. Please try again.");
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      if (isMounted) {
        setIsLoading(true);
        setError("");
      }
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
        if (isMounted) {
          setError("Unable to load items. Please refresh the page.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
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

        {isLoading && <p className="status">Loading items...</p>}
        {!isLoading && !error && items.length === 0 && (
          <p className="status">No items yet. Add your first.</p>
        )}
        {error && <p className="error">{error}</p>}

        <AddItem onAdd={createItem} isSaving={isSaving} />
        <GroceryList
          items={items}
          onUpdate={updateItem}
          onDelete={deleteItem}
        />
      </div>
    </div>
  );
}
