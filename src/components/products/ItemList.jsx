import Item from "./Item";
function ItemList({ products }) {
  return (
    <>
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </>
  );
}
export default ItemList;
