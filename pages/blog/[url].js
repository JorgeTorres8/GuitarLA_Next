import Layout from "../../components/Layout"; 
import Image  from "next/image";
import { formatearFecha } from "../../helpers"
import styles from "../../styles/Entrada.module.css"

const EntradaBlog = ({entrada}) => { 
  const { contenido, imagen, published_at, titulo} = entrada[0]; 

  return (
    <Layout
      pagina={titulo} 
    >
      <main className="contenedor">
        <h1 className="heading">{titulo}</h1>
        <article className={styles.entrada}>
          <Image priority="true" layout="responsive" width={800} height={600} src={imagen.url} alt={`Imagen entrada ${titulo}`}/>

          <div className={styles.contenido}>
            <p className={styles.fecha}>{formatearFecha(published_at)}</p>
            <p className={styles.texto}>{contenido}</p>
          </div>
        </article>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() { //214 VA A OBTENER LAS SUBRUTAS ESTATICAS. IDENTIFICA QUE PAGINA VA A CONTRUIR Y VA A IDENTIFICAR
                                        //Y CONSTRUIR LOS ENLACES. (PARA QUE SEPA QUE VA A CONSTRUIR)
                                        
    const url = `${process.env.API_URL}/blogs`; 
    const respuesta = await fetch(url);
    const entradas = await respuesta.json();

    const paths = entradas.map( entrada => ({
        params: { url: entrada.url }
    }))

    return {
        paths,
        fallback: false //true: permite retornar una serie de rutas que deben generarse estaticamente (para proyectos grandes / muchas entradas)
                       //false: requiero pasar todas las rutas que se van a construir  (pocas entradas)
                       //'blocking': comportamiento similar a getServerSideProps
    }
                                      
}

export async function getStaticProps({params: {url}}) { //214 SIEMPRE QUE UTILICEMOS getStaticsProps DENTRO DE ROUTING DINÁMICO ES REQUERIDO
                                                    // EL getStaticPaths (QUE TENGA TODA LA INFORMACIÓN QUE VA A COLOCAR EN LAS VISTAS)

    const urlBlog = `${process.env.API_URL}/blogs?url=${url}`;
    const respuesta = await fetch(urlBlog);
    const entrada = await respuesta.json();
  
    return {
      props: {  
        entrada
      }
    }
} //TIENE LA VENTAJA QUE VA A COMPILAR EL PROYECTO ANTES DE SUBIRLO, SERA MAS RAPIDO EL PROYECTO. PARA UN BLOG ESTE METODO ESTA BIEN

/*export async function getServerSideProps({query: {id}}) {

    const url = `http://localhost:1337/blogs/${id}`;
    const url = `${process.env.API_URL}/blogs/${id}`; 
    const respuesta = await fetch(url);
    const entrada = await respuesta.json();
  
    return {
      props: {  
        entrada
      }
    }
}*/ //eSTE SERÁ MAS DINAMICO 

export default EntradaBlog