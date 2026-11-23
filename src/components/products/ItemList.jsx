import Item from "./Item";
import styles from "./ItemList.module.css";

function ItemList({ products, currentPage }) {
  return (
    <div className={styles.itemList}>
      {products.map((product) => (
        <Item key={product.id} {...product} currentPage={currentPage} />
      ))}
    </div>
  );
}
export default ItemList;
