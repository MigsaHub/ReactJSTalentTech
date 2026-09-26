import Item from "./Item";
import styles from "./ItemList.module.css";

function ItemList({ products }) {
  return (
    <div className={styles.itemList}>
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
}
export default ItemList;
