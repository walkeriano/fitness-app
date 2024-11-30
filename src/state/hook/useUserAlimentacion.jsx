import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; 

const useUserAlimentacion = () => {
  const [alimentacionData, setAlimentacionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    
    const getLocalStorageAlimentacionData = () => {
      const savedAlimentacionData = localStorage.getItem("alimentacionData");
      if (savedAlimentacionData) {
        console.log("Datos de alimentación obtenidos desde localStorage"); 
        return JSON.parse(savedAlimentacionData);
      }
      return null;
    };

    
    const saveAlimentacionDataToLocalStorage = (alimentacion) => {
      localStorage.setItem("alimentacionData", JSON.stringify(alimentacion));
    };

    const fetchUserAlimentacion = async () => {
      setLoading(true);

      
      const localData = getLocalStorageAlimentacionData();
      if (localData && isMounted) {
        setAlimentacionData(localData);
        setLoading(false);
        return;
      }

      try {
        
        const savedUserProfile = localStorage.getItem("userProfile");
        if (!savedUserProfile) {
          throw new Error("Perfil de usuario no encontrado en localStorage.");
        }

        const userProfile = JSON.parse(savedUserProfile);
        const { objetivoFisico, comidasXdia, genero } = userProfile;

        if (!objetivoFisico || !comidasXdia || !genero) {
          throw new Error("Faltan campos requeridos en el perfil de usuario.");
        }

        
        const alimentacionRef = collection(db, "alimentacion");
        const q = query(
          alimentacionRef,
          where("nombre", "==", objetivoFisico),
          where("comidas", "==", comidasXdia),
          where("genero", "==", genero)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const alimentacionDoc = querySnapshot.docs[0].data(); 
          if (isMounted) {
            console.log("Datos de alimentación obtenidos desde Firebase"); 
            setAlimentacionData(alimentacionDoc);
            saveAlimentacionDataToLocalStorage(alimentacionDoc); 
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

    fetchUserAlimentacion(); 

    return () => {
      isMounted = false; 
    };
  }, []);

  return { alimentacionData, loading, error };
};

export default useUserAlimentacion;