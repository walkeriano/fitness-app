import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../firebase-config";

const useFetchInfoproductos = () => {
  const [infoproductos, setInfoproductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "infoproductos"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setInfoproductos(usersList);
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error("Error al obtener documentos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Función para eliminar un infoproducto y su imagen de Storage
  const deleteInfoproducto = async (id, imageUrl) => {
    try {
      if (imageUrl) {
        // Crear referencia de la imagen en Firebase Storage a partir de la URL
        const imageRef = ref(storage, imageUrl);

        // Eliminar la imagen de Firebase Storage
        await deleteObject(imageRef);
        console.log("Imagen eliminada de Firebase Storage");
      }

      // Eliminar el documento de Firestore
      await deleteDoc(doc(db, "infoproductos", id));
      console.log("Documento eliminado de Firestore");

      // Actualizar el estado para reflejar el cambio en la interfaz
      setInfoproductos((prev) => prev.filter((producto) => producto.id !== id));
    } catch (err) {
      console.error("Error al eliminar el infoproducto o la imagen:", err);
      setError("Error al eliminar infoproducto o imagen");
    }
  };

  return { infoproductos, loading, error, deleteInfoproducto };
};

export default useFetchInfoproductos;