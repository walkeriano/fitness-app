import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";

const useFetchAlimentacion = () => {
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "alimentacion"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDietas(usersList);
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error("Error al obtener documentos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  return { dietas, loading, error };
};

export default useFetchAlimentacion;