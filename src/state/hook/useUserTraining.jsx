import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; 

const useUserTraining = () => {
  const [trainingData, setTrainingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    
    const getLocalStorageTrainingData = () => {
      const savedTrainingData = localStorage.getItem("trainingData");
      if (savedTrainingData) {
        console.log("Datos de entrenamiento obtenidos desde localStorage"); 
        return JSON.parse(savedTrainingData);
      }
      return null;
    };


    const saveTrainingDataToLocalStorage = (training) => {
      localStorage.setItem("trainingData", JSON.stringify(training));
    };

    const fetchUserTraining = async () => {
      setLoading(true);

      const localData = getLocalStorageTrainingData();
      if (localData && isMounted) {
        setTrainingData(localData);
        setLoading(false);
        return;
      }

      try {
        const savedUserProfile = localStorage.getItem("userProfile");
        if (!savedUserProfile) {
          throw new Error("Perfil de usuario no encontrado en localStorage.");
        }

        const userProfile = JSON.parse(savedUserProfile);
        const { objetivoFisico, nivel, genero } = userProfile;

        if (!objetivoFisico || !nivel || !genero) {
          throw new Error("Faltan campos requeridos en el perfil de usuario.");
        }

        const entrenamientoRef = collection(db, "entrenamiento");
        const q = query(
          entrenamientoRef,
          where("nombre", "==", objetivoFisico),
          where("nivel", "==", nivel),
          where("genero", "==", genero)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const trainingDoc = querySnapshot.docs[0].data(); 
          if (isMounted) {
            console.log("Datos de entrenamiento obtenidos desde Firebase"); 
            setTrainingData(trainingDoc);
            saveTrainingDataToLocalStorage(trainingDoc);
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

    fetchUserTraining(); 

    return () => {
      isMounted = false; 
    };
  }, []); 

  return { trainingData, loading, error };
};

export default useUserTraining;