import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC9caQPUfLOSwMrgrP2ranp-I5T-ypmirM",
    authDomain: "quesada-coach.firebaseapp.com",
    projectId: "quesada-coach",
    storageBucket: "quesada-coach.appspot.com",
    messagingSenderId: "10651759330",
    appId: "1:10651759330:web:d1af593ed58fc262f264bb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistencia de sesión configurada correctamente.");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia de la sesión:", error);
  });

// export {database}
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
