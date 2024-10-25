import styles from "./visualizerAlimentacion.module.css";
import useUserAlimentacion from "@/state/hook/useUserAlimentacion";

export default function VisualizerAlimentacion(){
    const { trainingData, loading, error } = useUserAlimentacion();

  if (loading) {
    return <p>Cargando datos de entrenamiento...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!trainingData) {
    return <p>No se encontraron datos de entrenamiento.</p>;
  }


    return(
        <section className={styles.containerVisualizer}>
            <iframe src={`${trainingData?.archivo}#toolbar=0`} className={styles.cont} />
        </section>
    )
}