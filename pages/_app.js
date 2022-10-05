import { useState, useEffect } from 'react'
import Script from 'next/script';
import '../styles/normalize.css' 
import '../styles/globals.css'
import Swal from 'sweetalert2'
function MyApp({ Component, pageProps }) {
  const [carrito, setCarrito] = useState([]);
  
  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? [];
    if(carritoLS.length !== 0) {
      setCarrito(carritoLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);
  

  const agregarCarrito= (producto) => {
    if(carrito.some((articulo) => articulo.id === producto.id)) {
      const carritoActualizado = carrito.map((articulo) => {
        if(articulo.id === producto.id) {
          articulo.cantidad = producto.cantidad;
        }
        return articulo;
      });
      setCarrito(carritoActualizado);
      Swal.fire({
        title:'¡Modificado!',
        text:'Modificaste la cantidad de esta guitarra en tu carrito de compras',
        icon:'success',
        customClass: 'swal-wide',
      }
      )
    } else {
      setCarrito([...carrito, producto])
      Swal.fire({
        title:'¡Agregado!',
        text:'Agregaste esta guitarra a tu carrito de compras',
        icon:'success',
        customClass: 'swal-wide',}
      )
    }
    
  }

  const actualizarCantidad = (producto) => {
    const carritoActualizado = carrito.map((articulo) => {
      if(articulo.id === producto.id) {
        articulo.cantidad = producto.cantidad;
      }
      return articulo;
    });

    setCarrito(carritoActualizado);

  }

  const eliminarProducto = (id) => {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Quitar',
      cancelButtonText: 'Cancelar',
      customClass: 'swal-wide',
    }).then((result) => {
      if (result.isConfirmed) {
        const carritoActualizado = carrito.filter((articulo) => articulo.id !== id);
        setCarrito(carritoActualizado);
        Swal.fire({
          title:'¡Elimiado!',
          text:'Quitaste esta guitarra de tu carrito de compras',
          icon:'success',
          customClass: 'swal-wide',}
        )
      }
    })
  }
  

  return <Component {...pageProps} 
    carrito={carrito}
    agregarCarrito={agregarCarrito}
    actualizarCantidad={actualizarCantidad}
    eliminarProducto={eliminarProducto}
  />
}

export default MyApp
