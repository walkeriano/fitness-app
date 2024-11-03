import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; // Asegúrate de importar la configuración de Firebase

const useUserTraining = () => {
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Verificación de montaje del componente

    // Función para obtener los datos de entrenamiento desde localStorage
    const getLocalStorageTrainingData = () => {
      const savedTrainingData = localStorage.getItem("trainingData");
      if (savedTrainingData) {
        console.log("Datos de entrenamiento obtenidos desde localStorage"); // Seguimiento en consola
        return JSON.parse(savedTrainingData);
      }
      return null;
    };

    // Función para guardar datos de entrenamiento en localStorage
    const saveTrainingDataToLocalStorage = (training) => {
      localStorage.setItem("trainingData", JSON.stringify(training));
    };

    const fetchUserTraining = async () => {
      setLoading(true);

      // Verifica si ya existen datos en localStorage
      const localData = getLocalStorageTrainingData();
      if (localData && isMounted) {
        setTrainingData(localData);
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
        const { objetivoFisico, nivel, genero } = userProfile;

        if (!objetivoFisico || !nivel || !genero) {
          throw new Error("Faltan campos requeridos en el perfil de usuario.");
        }

        // Consulta en la colección "entrenamiento" en Firebase
        const entrenamientoRef = collection(db, "entrenamiento");
        const q = query(
          entrenamientoRef,
          where("nombre", "==", objetivoFisico),
          where("nivel", "==", nivel),
          where("genero", "==", genero)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const trainingDoc = querySnapshot.docs[0].data(); // Tomamos el primer documento que coincida
          if (isMounted) {
            console.log("Datos de entrenamiento obtenidos desde Firebase"); // Seguimiento en consola
            setTrainingData(trainingDoc);
            saveTrainingDataToLocalStorage(trainingDoc); // Guarda los datos en localStorage
          }
        } else {
          throw new Error(
            "No se encontró ningún documento de entrenamiento con esos criterios."
          );
        }
      } catch (err) {
        console.error("Error al obtener los datos de entrenamiento:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserTraining(); // Ejecutar la función al montar el componente

    return () => {
      isMounted = false; // Limpiar en caso de desmontar el componente
    };
  }, []); // Solo se ejecuta cuando el componente se monta

  return { trainingData, loading, error };
};

export default useUserTraining;