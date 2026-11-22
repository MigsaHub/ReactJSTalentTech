export const FormProduct = ({
  datosForm,
  loading,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={datosForm.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={datosForm.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={datosForm.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={datosForm.stock}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={datosForm.category}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Imagen:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};
