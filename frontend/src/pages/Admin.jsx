import React from 'react'
import productActions from '../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link as LinkRouter } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import "../styles/admin.css"

export default function Admin() {

    const dispatch = useDispatch()
    // const [selectedAmbient, setSelectedAmbient] = useState()
    // const ambients = useSelector(store => store.ambientsReducer.ambients)
    const products = useSelector(store => store.productsReducer.products)
    const [reload, setReload] = React.useState(false)

    useEffect(() => {
        dispatch(productActions.getProducts())
        // eslint-disable-next-line
    }, [reload])



    const handleSubmit = async (event) => {
        event.preventDefault()


        // console.log(event)
        const productData = {
            name: event.target[0].value,
            detail: event.target[1].value,
            img: event.target[2].value,
            price: event.target[3].value,
            size: event.target[4].value,
            stock: event.target[5].value,
            hashtags: event.target[6].value.split([","])
        }
        const res = await dispatch(productActions.addProduct(productData))
        console.log(res)
        // console.log(event.target[6].value.split([","]))
        setReload(!reload)
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        const id = event.target[0].value
        const res = await dispatch(productActions.deleteComment(id))
        console.log(res)
        setReload(!reload)
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="form-admin">
                    <div className="container-input">
                    <h2 className='labelAdmin'>Indicate the Name of the Product
                        <input placeholder='name' type="text" id="name" className="" />
                    </h2>
                    </div>
                    <div className="container-input">
                    <h2 className='labelAdmin'>Indicate the product detail
                        <input placeholder='detail' type="text" id="detail" className="" />
                    </h2>
                    </div>
                    <div className="container-input">
                    <h2 className='labelAdmin'>Indicate the link of the image
                        <input placeholder='img' type="text" id="img" className="" />
                    </h2>
                    </div>
                    <div className="container-input">
                    <h2 className='labelAdmin'>Indicate the price of the product
                        <input placeholder='price' type="price" id="price" className="" />
                    </h2>
                    </div>
                    <div className="container-input">
                    <h2 className='labelAdmin'>Please indicate product size
                        <input placeholder='size' type="size" id="size" className="" />
                    </h2>
                    </div>
                    <div className="container-input">
                    <h2 className='labelAdmin'>Indicate the stock
                        <input placeholder='stock' type="stock" id="stock" className="" />
                    </h2>
                    </div>
                    {/* <div className="container-input">
                    <select className="country-select">
                        <option className="option">Ambient</option>
                        {ambients.map((ambient, key) => (
                            <option className="option" key={key} value={ambient._id}>
                                {ambient.name}
                            </option>
                        ))}
                    </select>
                </div> */}
                    <div className="container-input">
                        <h2 className='labelAdmin'>Hashtags </h2>
                            <label className='labelAdmin labelAdminHashtags' name="Hashtags">Añade el primer hashtag como ambiente
                            <input placeholder='hashtags(separar con comas)' type="hashtags" id="hashtags" className="" />
                            </label>
                    </div>
                    <button type="submit" className="submit" value="submit">
                        Add your product
                    </button>
                </form>

                <form onSubmit={handleDelete} className="form-admin formAdminDelete">
                    <div className="container-input">
                    <label className='labelAdmin' name="Hashtags">Select the Product to delete
                        <select className="country-select">
                            <option className="option">Product</option>
                            {products.map((product, key) => (
                                <option className="option" key={key} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    </div>
                    <button type="submit" className="submit" value="submit">
                        Delete Your Product
                    </button>
                </form>
            </div>

            <div className='ctnCardAdmin' >
                {products.map((product, key) => (
                    <>
                        <div className='cardAdmin' key={key}>
                            <img className='cardimgAdmin' src={product.img} alt="" />
                            <h1 className='cardtittleAdmin'>{product.name}</h1>
                            <LinkRouter to={`/ModifyProduct/${product._id}`} >
                                <button><EditIcon /></button>
                            </LinkRouter>
                        </div>
                    </>
                ))
                }
            </div >
        </>
    )
}