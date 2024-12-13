import { useState } from "react";
const useItems = () => {
  const [items, setItems] = useState<string[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addItem = (item: string) => {
    setItems((prevItems) => [...prevItems, item]);
    setItemCount((prevCount) => prevCount + 1);
  };

  return {
    items,
    itemCount,
    addItem,
  };
};

export default useItems;
