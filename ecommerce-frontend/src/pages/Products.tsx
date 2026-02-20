const Products = () => {
  const products = [
    {
      id: 1,
      brand: "Apple",
      name: "iPhone",
      model: "15 Pro",
      stock: 12,
      price: 1200,
    },
    {
      id: 2,
      brand: "Samsung",
      name: "Galaxy",
      model: "S24",
      stock: 8,
      price: 950,
    },
    {
      id: 3,
      brand: "Sony",
      name: "PlayStation",
      model: "5",
      stock: 5,
      price: 600,
    },
{
      id: 4,
      brand: "Papupit",
      name: "Papus",
      model: "7 Pro Max",
      stock: 5,
      price: 500,
    },
  ];

  return (
    <div className="products-container">
      <h1>Gestión de Productos</h1>

      <table className="products-table">
        <thead>
          <tr>
            <th>MARCA</th>
            <th>NOMBRE_PRODUCTO</th>
            <th>MODELO</th>
            <th>STOCK</th>
            <th>PRECIO</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.brand}</td>
              <td>{product.name}</td>
              <td>{product.model}</td>
              <td>{product.stock}</td>
              <td>${product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;