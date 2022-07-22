import React from 'react'
import "../styles/Favorites.css"


export default function Favorites() {
  return (
    <>
    <div className='Cards'>
      <div className="card">
        <div className='contentFavorite'>
          <img className='imgFavorites' src='https://www.hogarmania.com/archivos/201110/lampara-madera-xl-668x400x80xX.jpg' alt='foto'></img>
          <div>Nombre</div>
          <div>
            <div>precio</div>
            <div>90$</div>
          </div>
          <button>Agregar al carritom</button>
          <button>quitar de favoritos</button>

        </div>
      </div>
    </div>
    
    </>
  )
}
