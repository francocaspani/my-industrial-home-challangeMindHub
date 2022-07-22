import React from 'react'
import "../styles/Favorites.css"
import { useDispatch, useSelector } from 'react-redux';

export default function Favorites() {

const user = useSelector(store => store.usersReducer.userData)

console.log(user)

  return (
    <>
    <div className='Cards'>
      <div className="card">
        {user ? user.favourite.map( product => {
          return(
            <div className='contentFavorite'>
          <img className='imgFavorites' src='https://www.hogarmania.com/archivos/201110/lampara-madera-xl-668x400x80xX.jpg' alt='foto'></img>
          <div>nombre</div>
          <div>
            <div>precio</div>
            <div>90$</div>
          </div>
          <button>Add to basket</button>
          <button>Remove from favourites</button>

        </div>
          )
        }

        )
        
        : <div><p>Nothing here</p></div>
      }
        
      </div>
    </div>
    
    </>
  )
}
