import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file, rutinaId) => {
    if (!file) {
      setError("No se seleccionó ningún archivo.");
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      // Subimos el archivo a la carpeta "archivos" con el nombre del ID de la rutina
      const fileRef = ref(storage, `archivos/${rutinaId}.pdf`);
      
      // Subimos el archivo a esta referencia
      await uploadBytes(fileRef, file);

      // Obtenemos la URL de descarga del archivo subido
      const url = await getDownloadURL(fileRef);

      // Actualizamos Firestore con la nueva URL del archivo
      const rutinaDocRef = doc(db, "entrenamiento", rutinaId);
      await updateDoc(rutinaDocRef, { archivo: url });

      return url;
    } catch (err) {
      console.error("Error al subir el archivo:", err);
      setError("No se pudo subir el archivo");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { handleUpload, uploading, error };
};

export default useUploadFile;