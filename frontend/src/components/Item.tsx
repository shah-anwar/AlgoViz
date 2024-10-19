import React from "react";
import { Item as ItemType } from "../types";

interface ItemProps {
  item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <li>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </li>
  );
};

export default Item;
