import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; // Asegúrate de importar la configuración de Firebase

const useUserAlimentacion = () => {
  const [alimentacionData, setAlimentacionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Verificación de montaje del componente

    // Función para obtener los datos de alimentación desde localStorage
    const getLocalStorageAlimentacionData = () => {
      const savedAlimentacionData = localStorage.getItem("alimentacionData");
      if (savedAlimentacionData) {
        console.log("Datos de alimentación obtenidos desde localStorage"); // Seguimiento en consola
        return JSON.parse(savedAlimentacionData);
      }
      return null;
    };

    // Función para guardar datos de alimentación en localStorage
    const saveAlimentacionDataToLocalStorage = (alimentacion) => {
      localStorage.setItem("alimentacionData", JSON.stringify(alimentacion));
    };

    const fetchUserAlimentacion = async () => {
      setLoading(true);

      // Verifica si ya existen datos en localStorage
      const localData = getLocalStorageAlimentacionData();
      if (localData && isMounted) {
        setAlimentacionData(localData);
        setLoading(false);
        return;
      }

      try {
        // Obtén el perfil del usuario desde localStorage
        const savedUserProfile = localStorage.getItem("userProfile");
        if (!savedUserProfile) {
          throw new Error("Perfil de usuario no encontrado en localStorage.");
        }

        const userProfile = JSON.parse(savedUserProfile);
        const { objetivoFisico, comidasXdia, genero } = userProfile;

        if (!objetivoFisico || !comidasXdia || !genero) {
          throw new Error("Faltan campos requeridos en el perfil de usuario.");
        }

        // Consulta en la colección "alimentacion" en Firebase
        const alimentacionRef = collection(db, "alimentacion");
        const q = query(
          alimentacionRef,
          where("nombre", "==", objetivoFisico),
          where("comidas", "==", comidasXdia),
          where("genero", "==", genero)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const alimentacionDoc = querySnapshot.docs[0].data(); // Tomamos el primer documento que coincida
          if (isMounted) {
            console.log("Datos de alimentación obtenidos desde Firebase"); // Seguimiento en consola
            setAlimentacionData(alimentacionDoc);
            saveAlimentacionDataToLocalStorage(alimentacionDoc); // Guarda los datos en localStorage
          }
        } else {
          throw new Error(
            "No se encontró ningún documento de alimentación con esos criterios."
          );
        }
      } catch (err) {
        console.error("Error al obtener los datos de alimentación:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserAlimentacion(); // Ejecutar la función al montar el componente

    return () => {
      isMounted = false; // Limpiar en caso de desmontar el componente
    };
  }, []); // Solo se ejecuta cuando el componente se monta

  return { alimentacionData, loading, error };
};

export default useUserAlimentacion;