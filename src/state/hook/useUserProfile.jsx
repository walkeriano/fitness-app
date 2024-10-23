import { useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../auth/auth-context";
import { db } from "../../../firebase-config";

const useUserProfile = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto de autenticación
  const [userProfile, setUserProfile] = useState(null);
  const [calculatedData, setCalculatedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Variable para verificar si el componente sigue montado

    // Función para obtener los datos de localStorage
    const getLocalStorageData = () => {
      const savedUserProfile = localStorage.getItem("userProfile");
      const savedCalculatedData = localStorage.getItem("calculatedData");

      if (savedUserProfile && savedCalculatedData) {
        console.log("Datos obtenidos desde localStorage"); // Log cuando los datos provienen de localStorage
        return {
          userProfile: JSON.parse(savedUserProfile),
          calculatedData: JSON.parse(savedCalculatedData),
        };
      }
      return null; // Si no hay datos en localStorage
    };

    // Función para guardar datos en localStorage
    const saveToLocalStorage = (profile, calculated) => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem("calculatedData", JSON.stringify(calculated));
    };

    const fetchUserProfile = async () => {
      // Primero verificar si hay datos en localStorage
      const localData = getLocalStorageData();
      if (localData && isMounted) {
        // Si hay datos en localStorage, utilizarlos y evitar la petición a Firebase
        setUserProfile(localData.userProfile);
        setCalculatedData(localData.calculatedData);
        setLoading(false); // Ya que tenemos los datos, no hay necesidad de cargar más
        return;
      }

      // Si no hay datos en localStorage, hacer la petición a Firebase
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Referencia al documento del usuario
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && isMounted) {
            console.log("Datos obtenidos desde Firebase"); // Log cuando los datos provienen de Firebase
            const profileData = userDoc.data();

            // Convertir solo los campos necesarios a números
            const convertedData = {
              peso: parseFloat(profileData.peso) || 0,
              altura: parseFloat(profileData.altura) || 0,
              edad: parseInt(profileData.edad, 10) || 0,
              genero: profileData.genero,
              actividad: profileData.actividad,
              objetivoFisico: profileData.objetivoFisico,
            };

            setUserProfile(profileData); // Establece el perfil del usuario en el estado

            // Realiza los cálculos de nutrición usando la función que ya tienes
            const calculatedValues = calculateCaloriesAndMacros(convertedData);
            setCalculatedData(calculatedValues); // Establece los datos calculados en el estado

            // Guardar en localStorage
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

    fetchUserProfile();

    return () => {
      isMounted = false; // Cleanup para evitar actualizaciones de estado en componentes desmontados
    };
  }, [user]); // Ejecuta el efecto cada vez que el usuario cambie

  // Función para calcular BMR, TDEE y macronutrientes basada en los datos del usuario
  const calculateCaloriesAndMacros = (data) => {
    const { peso, altura, edad, genero, actividad, objetivoFisico } = data;

    // Cálculo de Tasa Metabólica Basal (BMR) dependiendo del género
    let bmr;
    if (genero && genero.toLowerCase() === 'masculino') {
      bmr = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (genero && genero.toLowerCase() === 'femenino') {
      bmr = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    } else {
      console.error('Género no especificado o incorrecto.');
      return null; // Salida si el género no es válido o no está definido
    }

    // Factor de actividad para calcular TDEE (Total Daily Energy Expenditure)
    const actividadFactor = {
      sedentario: 1.2,
      ligero: 1.375,
      moderado: 1.55,
      activo: 1.725,
      extra_activo: 1.9,
    };
    let tdee = bmr * (actividadFactor[actividad] || 1.2); // Usa un valor por defecto de 1.2 si no hay coincidencia

    // Ajustar TDEE según el objetivo físico
    switch (objetivoFisico) {
      case 'definicion':
        tdee *= 0.85; // Reducir el 15% de las calorías para perder peso
        break;
      case 'masaMuscular':
        tdee *= 1.15; // Aumentar el 15% de las calorías para ganar peso
        break;
      case 'recomposicionCorporal':
        // No se requiere ajuste, ya está calculado como TDEE
        break;
      default:
        console.error('Objetivo físico no especificado o incorrecto.');
        break;
    }

    // Calcular la ingesta diaria recomendada de macronutrientes
    const proteinas = (peso * 1.8).toFixed(2); // Proteínas recomendadas en gramos
    const grasas = ((tdee * 0.25) / 9).toFixed(2); // Grasas recomendadas en gramos
    const carbohidratos = ((tdee - (proteinas * 4 + grasas * 9)) / 4).toFixed(2); // Carbohidratos recomendados en gramos

    // Calorías de cada macronutriente
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