import Item from "./Item";
import { Item as ItemType } from "../types";
import { useSpring, animated } from "react-spring";

interface ItemListProps {
  items: ItemType[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <animated.ul style={props}>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </animated.ul>
  );
};

export default ItemList;
