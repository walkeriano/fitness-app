import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const useUserProfile = (user) => {
  const [userProfile, setUserProfile] = useState(null);
  const [calculatedData, setCalculatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

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

    const saveToLocalStorage = (profile, calculated) => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("calculatedData", JSON.stringify(calculated));
    };

    const fetchUserProfile = async () => {
      const localData = getLocalStorageData();
      if (localData && isMounted) {
        setUserProfile(localData.userProfile);
        setCalculatedData(localData.calculatedData);
        setLoading(false);
        return;
      }

      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && isMounted) {
            console.log("Datos obtenidos desde Firebase");
            const profileData = userDoc.data();

            const convertedData = {
              peso: parseFloat(profileData.peso) || 0,
              estatura: parseFloat(profileData.estatura) * 100 || 0,
              edad: parseInt(profileData.edad, 10) || 0,
              genero: profileData.genero,
              nivel: profileData.nivel,
              objetivoFisico: profileData.objetivoFisico,
            };

            console.log('Datos después de la conversión:', convertedData);

            setUserProfile(profileData);

            const calculatedValues = calculateCaloriesAndMacros(convertedData);
            setCalculatedData(calculatedValues);

            saveToLocalStorage(profileData, calculatedValues);
          } else if (isMounted) {
            console.error(
              "No se encontró el documento del usuario en Firestore"
            );
          }
        } catch (error) {
          console.error(
            "Error al obtener el perfil del usuario desde Firestore:",
            error
          );
          if (isMounted) setError("Error al cargar los datos del perfil.");
        }
      }

      if (isMounted) setLoading(false);
    };

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const calculateCaloriesAndMacros = (data) => {
    const { peso, estatura, edad, genero, objetivoFisico, nivel } = data;

    let bmr;
    if (genero && genero.toLowerCase() === "masculino") {
      bmr = 88.362 + 13.397 * peso + 4.799 * estatura - 5.677 * edad;
    } else if (genero && genero.toLowerCase() === "femenino") {
      bmr = 447.593 + 9.247 * peso + 3.098 * estatura - 4.33 * edad;
    } else {
      console.error("Género no especificado o incorrecto.");
      return null;
    }

    // Aquí modificamos el factor de actividad basado en el campo `nivel`
    let actividadFactor;
    switch (nivel) {
      case "iniciado":
        actividadFactor = 1.55; // Nivel "iniciado" obtiene un factor de 1.55
        break;
      case "intermedio":
        actividadFactor = 1.725; // Nivel "intermedio" obtiene un factor de 1.725
        break;
      case "avanzado":
        actividadFactor = 1.9; // Nivel "avanzado" obtiene un factor de 1.9
        break;
      default:
        // Si el campo `nivel` no es válido, se establece un factor por defecto (puedes cambiarlo según lo necesites)
        console.error(
          "Nivel de actividad no válido. Usando valor por defecto de 1.55."
        );
        actividadFactor = 1.55;
        break;
    }

    let tdee = bmr * actividadFactor;

    // Ajuste del TDEE según el objetivo físico
    switch (objetivoFisico) {
      case "definición":
        tdee *= 0.85;
        break;
      case "masa muscular":
        tdee *= 1.15;
        break;
      case "recomposicion corporal":
        break;
      default:
        console.error("Objetivo físico no especificado o incorrecto.");
        break;
    }

    // Cálculo de macronutrientes
    const proteinas = peso * 1.8;
    const grasas = (tdee * 0.3) / 9;
    const carbohidratos = (tdee - (proteinas * 4 + grasas * 9)) / 4;

    // Calorías por macronutriente
    const proteinasCalorias = proteinas * 4; // Calorías de proteínas
    const grasasCalorias = grasas * 9; // Calorías de grasas
    const carbohidratosCalorias = carbohidratos * 4; // Calorías de carbohidratos

    return {
      bmr: bmr.toFixed(2),
      tdee: tdee.toFixed(2),
      proteinas: proteinas.toFixed(2),
      grasas: grasas.toFixed(2),
      carbohidratos: carbohidratos.toFixed(2),
      proteinasCalorias: proteinasCalorias.toFixed(2),
      grasasCalorias: grasasCalorias.toFixed(2),
      carbohidratosCalorias: carbohidratosCalorias.toFixed(2),
    };
  };

  return { userProfile, calculatedData, loading, error };
};

export default useUserProfile;
