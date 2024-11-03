import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

const useFetchTraining = () => {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "entrenamiento"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRutinas(usersList);
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error("Error al obtener documentos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return { rutinas, loading, error };
};

export default useFetchTraining;