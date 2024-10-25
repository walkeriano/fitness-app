import styles from "./visualizerTraining.module.css";
import useUserTraining from "@/state/hook/useUserTraining";

export default function VisualizerTraining(){
    const { trainingData, loading, error } = useUserTraining();

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