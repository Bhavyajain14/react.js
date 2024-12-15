import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItems,
  setItems,
}) {
  const [sortBy, setSortBy] = useState("packed");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function clearList() {
    const confirm = window.confirm(
      "Are you sure you want to delete all the items?"
    );
    if (confirm) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order </option>
          <option value="description">Sort by description </option>
          <option value="packed">Sort by packed starts </option>
        </select>

        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}
