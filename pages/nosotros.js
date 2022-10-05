import Image from 'next/image'
import Layout from '../components/Layout' 
import styles from '../styles/Nosotros.module.css'

const Nosotros = () => {
  return (
    <Layout
        pagina= "Nosotros"
    >
        <main className='contenedor'>
            <h2 className='heading'>Nosotros</h2>

            <div className={styles.contenido}>

              <Image layout='responsive' width={600} height={450} src="/img/nosotros.jpg" alt="Imagen sobre nosotros"/>

                <div>
                    <p>Curabitur id velit vel ex tempus aliquam ut at felis. Morbi varius sapien vitae odio egestas,
                    varius sodales lorem pellentesque. Maecenas a massa et magna mattis porttitor. Etiam ut leo quis 
                    metus laoreet pulvinar. Cras volutpat pulvinar turpis, vitae ultricies sapien placerat ac. Vivamus
                    id scelerisque ex, sit amet mattis turpis.</p>

                    <p>Curabitur id velit vel ex tempus aliquam ut at felis. Morbi varius sapien vitae odio egestas,
                    varius sodales lorem pellentesque. Maecenas a massa et magna mattis porttitor. Etiam ut leo quis 
                    metus laoreet pulvinar. Cras volutpat pulvinar turpis, vitae ultricies sapien placerat ac. Vivamus
                    id scelerisque ex, sit amet mattis turpis.</p>
                </div>
            </div>
        </main>
    </Layout>

    
  )
}

export default Nosotros