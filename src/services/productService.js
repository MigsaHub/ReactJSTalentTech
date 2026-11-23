import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

//seteo de variables
const PRODUCTS_COLLECTION = "productos nacionales";
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const productsCollection = collection(db, PRODUCTS_COLLECTION);
export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((productDoc) => ({
    ...productDoc.data(),
    id: productDoc.id,
  }));
};

//CRUD
export const createProduct = async (product) => {
  const productDoc = await addDoc(productsCollection, product);
  return productDoc.id;
};

export const updateProduct = async (id, product) => {
  await updateDoc(doc(db, PRODUCTS_COLLECTION, id), product);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
};

//Upload with ImgBB

export const uploadProductImage = async (imageFile) => {
  if (!IMGBB_API_KEY) {
    throw new Error(
      "Falta configurar la variable de ambiente VITE_IMGBB_API_KEY.",
    );
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error?.message ?? "No se pudo subir la imagen a Imgbb.",
    );
  }

  return result.data.url;
};
