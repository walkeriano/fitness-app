import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; // Asegúrate de importar la configuración de Firebase

const useUserTraining = () => {
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTraining = async () => {
      setLoading(true);
      try {
        // Obtén el perfil del usuario desde localStorage
        const savedUserProfile = localStorage.getItem("userProfile");
        if (!savedUserProfile) {
          throw new Error("Perfil de usuario no encontrado en localStorage.");
        }

        const userProfile = JSON.parse(savedUserProfile);
        const { objetivoFisico, nivel, genero } = userProfile;

        if (!objetivoFisico) {
          throw new Error(
            "El campo 'objetivoFisico' no está presente en el perfil de usuario."
          );
        }

        if (!nivel) {
          throw new Error(
            "El campo 'nivel' no está presente en el perfil de usuario."
          );
        }

        if (!genero) {
          throw new Error(
            "El campo 'genero' no está presente en el perfil de usuario."
          );
        }

        // Hacer una consulta en la colección "entrenamiento" para buscar el documento con
        // - "nombre" igual a objetivoFisico
        // - "cantidad" igual a comidasXdia
        const entrenamientoRef = collection(db, "entrenamiento");
        const q = query(
          entrenamientoRef,
          where("nombre", "==", objetivoFisico),
          where("nivel", "==", nivel), // Nuevo filtro
          where("genero", "==", genero)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const trainingDoc = querySnapshot.docs[0].data(); // Tomamos el primer documento que coincida
          setTrainingData(trainingDoc);
        } else {
          throw new Error(
            "No se encontró ningún documento de entrenamiento con esos criterios."
          );
        }
      } catch (err) {
        console.error("Error al obtener los datos de entrenamiento:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTraining();
  }, []); // Solo se ejecuta cuando el componente se monta

  return { trainingData, loading, error };
};

export default useUserTraining;
