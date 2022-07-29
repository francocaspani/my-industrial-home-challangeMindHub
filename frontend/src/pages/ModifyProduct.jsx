import React from 'react'
import { useEffect } from 'react'
import productActions from '../redux/actions/productActions'
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as LinkRouter } from "react-router-dom";
import "../styles/admin.css"



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
            hashtags: event.target[6].value.split(",")
        }
        
        const res = await dispatch(productActions.modifyProduct(id,productData))
        console.log(res)
        setReload(!reload)
    }



  return (
    <>
        <LinkRouter className="backArrow" to="/admin">
            <ArrowBackIcon />
        </LinkRouter>
    {product &&
   <>
    <form onSubmit={handleSubmit} className="form-adminBox">
                <div className="container-input">
            
                    <label className='labelAdmin'>Product Name
                    <input placeholder='name' type="text" id="name" className="input-adm" defaultValue={product.name} />
                </label>
              
                </div>
                <div className="container-input">
                 
                    <label className='labelAdmin'>Product details
                    <input placeholder='detail' type="text" id="detail" className="input-adm" defaultValue={product.detail} />
                    </label>
                </div>
                <div className="container-input">
                <label className='labelAdmin'>Product image (url)
                    <input placeholder='img' type="text" id="img" className="input-adm" defaultValue={product.img} />
                    </label>
                </div>
                <div className="container-input">
                <label className='labelAdmin'>Product price
                    <input placeholder='price' type="price" id="price" className="input-adm" defaultValue={product.price} />
                    </label>
                </div>
                <div className="container-input">
                <label className='labelAdmin'>Product size
                    <input placeholder='size' type="size" id="size" className="input-adm" defaultValue={product.size}/>
                    </label>
                </div>
                <div className="container-input">
                <label className='labelAdmin'>Indicate the stock
                    <input placeholder='stock' type="stock" id="stock" className="input-adm" defaultValue={product.stock}/>
                    </label>
                </div>
                <div className="container-input">
                    <label className='labelAdmin' name="Hashtags">
                    <label className='labelAdmin'>Hashtags </label>
                    <input placeholder='hashtags' type="hashtags" id="hashtags" className="input-adm" defaultValue={product.hashtags}/>
                    </label>
                </div>
                <button type="submit" className="submit" value="submit">
                    Modify product
                </button>
    </form>
    </>
    }
    </>
  )
}