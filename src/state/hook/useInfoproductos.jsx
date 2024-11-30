import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config"; // Asegúrate de importar la configuración de Firebase

const useInfoproductos = () => {
  const [infoproductosData, setInfoproductosData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    
    const getLocalStorageInfoproductosData = () => {
      const savedInfoproductosData = localStorage.getItem("infoproductosData");
      if (savedInfoproductosData) {
        console.log("Datos de infoproductos obtenidos desde localStorage");
        return JSON.parse(savedInfoproductosData);
      }
      return null;
    };

   
    const saveInfoproductosDataToLocalStorage = (infoproductos) => {
      localStorage.setItem("infoproductosData", JSON.stringify(infoproductos));
    };

    const fetchInfoproductos = async () => {
      setLoading(true);

      
      const localData = getLocalStorageInfoproductosData();
      if (localData && isMounted) {
        setInfoproductosData(localData);
        setLoading(false);
        return;
      }

      try {
        
        const infoproductosRef = collection(db, "infoproductos");
        const querySnapshot = await getDocs(infoproductosRef);

        if (!querySnapshot.empty) {
          const infoproductos = querySnapshot.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(),
          }));

          if (isMounted) {
            console.log("Datos de infoproductos obtenidos desde Firebase");
            setInfoproductosData(infoproductos);
            saveInfoproductosDataToLocalStorage(infoproductos); 
          }
        } else {
          throw new Error("No se encontraron documentos en la colección 'infoproductos'.");
        }
      } catch (err) {
        console.error("Error al obtener los datos de infoproductos:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInfoproductos(); 

    return () => {
      isMounted = false; 
    };
  }, []); 

  return { infoproductosData, loading, error };
};

export default useInfoproductos;