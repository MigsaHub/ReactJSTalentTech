import { useState } from "react";
import { FormProduct } from "./FormProduct";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const FormProductContainer = () => {
  //estado inicial del formulario
  const [datosForm, setDatosForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const numericFields = ["price", "stock"];

    const newValue = numericFields.includes(name)
      ? value === ""
        ? ""
        : Number(value)
      : value;

    setDatosForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    setLoading(true);

    //section para subir imagen a Imgbb
    const apiKey = "bdbb099e6856f557523717589e4e5805"; // Reemplaza con tu API key de Imgbb
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        console.log("Imagen subida con éxito:", data.data.url);

        const productWithImage = {
          ...datosForm,
          image: data.data.url,
        };

        //end section subir imagen a Imgbb

        // Guardar el producto en Firestore
        const productRef = collection(db, "productos nacionales");
        await addDoc(productRef, productWithImage);

        alert("¡Producto guardado con éxito!");

        //reset form
        setDatosForm({
          title: "",
          description: "",
          price: 0,
          stock: 0,
          category: "",
        });

        setImage(null);
      } else {
        throw new Error("Error al subir la imagen:", data.error.message);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Error al subir la imagen. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProduct
      datosForm={datosForm}
      loading={loading}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
    />
  );
};
