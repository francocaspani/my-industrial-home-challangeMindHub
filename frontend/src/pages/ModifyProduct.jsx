import React from 'react'
import { useEffect } from 'react'
import productActions from '../redux/actions/productActions'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

export default function ModifyProduct() {
    const { id } = useParams() 
const dispatch = useDispatch()
const [product, setProduct] = React.useState()
const [reload, setReload] = React.useState(false)



useEffect(() => {
    dispatch(productActions.getOneProduct(id)) 
    .then(res => setProduct(res.data.response.product))
    dispatch(productActions.getProducts()) 
    // eslint-disable-next-line
}, [id,reload])

// const product = useSelector(store => store.productsReducer.product)


    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log(event.target[6].value)
        const productData = {
            name: event.target[0].value,
            detail: event.target[1].value,
            img: event.target[2].value,
            price: event.target[3].value,
            size: event.target[4].value,
            stock: event.target[5].value,
            hashtags: event.target[6].value
        }
        
        const res = await dispatch(productActions.modifyProduct(id,productData))
        console.log(res)
        setReload(!reload)
    }



  return (
    <>
    {product &&
   <>
    <form onSubmit={handleSubmit} className="form-admin modifyFormAdmin">
                <div className="container-input">
                <label className='labelAdmin' name="Name">Name
                    <input placeholder='name' type="text" id="name" className="" defaultValue={product.name} />
                </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Detail">Detail
                    <input placeholder='detail' type="text" id="detail" className="" defaultValue={product.detail} />
                    </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Image Product">Image Product
                    <input placeholder='img' type="text" id="img" className="" defaultValue={product.img} />
                    </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Price">Price
                    <input placeholder='price' type="price" id="price" className="" defaultValue={product.price} />
                    </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Size">Size
                    <input placeholder='size' type="size" id="size" className="" defaultValue={product.size}/>
                    </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Stock">Stock
                    <input placeholder='stock' type="stock" id="stock" className="" defaultValue={product.stock}/>
                    </label>
                </div>
                <div className="container-input">
                    <label  className='labelAdmin' name="Hashtags">Hashtags
                    <input placeholder='hashtags' type="hashtags" id="hashtags" className="" defaultValue={product.hashtags}/>
                    </label>
                </div>
                <button type="submit" className="submit" value="submit">
                    modify product
                </button>
    </form>
    </>
    }
    </>
  )
}
