import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const useUserProfile = (user) => {
  const [userProfile, setUserProfile] = useState(null);
  const [calculatedData, setCalculatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Verificación de montaje del componente

    // Función para obtener los datos de localStorage
    const getLocalStorageData = () => {
      const savedUserProfile = localStorage.getItem("userProfile");
      const savedCalculatedData = localStorage.getItem("calculatedData");

      if (savedUserProfile && savedCalculatedData) {
        console.log("Datos obtenidos desde localStorage");
        return {
          userProfile: JSON.parse(savedUserProfile),
          calculatedData: JSON.parse(savedCalculatedData),
        };
      }
      return null;
    };

    // Función para guardar datos en localStorage
    const saveToLocalStorage = (profile, calculated) => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("calculatedData", JSON.stringify(calculated));
    };

    const fetchUserProfile = async () => {
      // Primero, verifica si hay datos en localStorage
      const localData = getLocalStorageData();
      if (localData && isMounted) {
        setUserProfile(localData.userProfile);
        setCalculatedData(localData.calculatedData);
        setLoading(false);
        return;
      }

      // Si no hay datos en localStorage, o no son válidos, intenta obtener datos de Firebase
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && isMounted) {
            console.log("Datos obtenidos desde Firebase");
            const profileData = userDoc.data();

            const convertedData = {
              peso: parseFloat(profileData.peso) || 0,
              altura: parseFloat(profileData.altura) || 0,
              edad: parseInt(profileData.edad, 10) || 0,
              genero: profileData.genero,
              actividad: profileData.actividad,
              objetivoFisico: profileData.objetivoFisico,
            };

            setUserProfile(profileData);

            const calculatedValues = calculateCaloriesAndMacros(convertedData);
            setCalculatedData(calculatedValues);

            saveToLocalStorage(profileData, calculatedValues);
          } else if (isMounted) {
            console.error("No se encontró el documento del usuario en Firestore");
          }
        } catch (error) {
          console.error("Error al obtener el perfil del usuario desde Firestore:", error);
          if (isMounted) setError("Error al cargar los datos del perfil.");
        }
      }

      if (isMounted) setLoading(false);
    };

    fetchUserProfile(); // Ejecutar la función al montar el componente

    return () => {
      isMounted = false; // Limpiar en caso de desmontar el componente
    };
  }, []); // Elimina la dependencia de `user` en el array de dependencias

  const calculateCaloriesAndMacros = (data) => {
    const { peso, altura, edad, genero, actividad, objetivoFisico } = data;

    let bmr;
    if (genero && genero.toLowerCase() === "masculino") {
      bmr = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
    } else if (genero && genero.toLowerCase() === "femenino") {
      bmr = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * edad;
    } else {
      console.error("Género no especificado o incorrecto.");
      return null;
    }

    const actividadFactor = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      activo: 1.725,
      extra_activo: 1.9,
    };
    let tdee = bmr * (actividadFactor[actividad] || 1.2);

    switch (objetivoFisico) {
      case "definicion":
        tdee *= 0.85;
        break;
      case "masaMuscular":
        tdee *= 1.15;
        break;
      case "recomposicionCorporal":
        break;
      default:
        console.error("Objetivo físico no especificado o incorrecto.");
        break;
    }

    const proteinas = (peso * 1.8).toFixed(2);
    const grasas = ((tdee * 0.25) / 9).toFixed(2);
    const carbohidratos = ((tdee - (proteinas * 4 + grasas * 9)) / 4).toFixed(2);

    const proteinasCalorias = (proteinas * 4).toFixed(2);
    const grasasCalorias = (grasas * 9).toFixed(2);
    const carbohidratosCalorias = (carbohidratos * 4).toFixed(2);

    return {
      bmr: bmr.toFixed(2),
      tdee: tdee.toFixed(2),
      proteinas,
      grasas,
      carbohidratos,
      proteinasCalorias,
      grasasCalorias,
      carbohidratosCalorias,
    };
  };

  return { userProfile, calculatedData, loading, error };
};

export default useUserProfile;