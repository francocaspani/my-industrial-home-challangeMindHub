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
            <div className='mainContainer-adm'>
                <div className='box-adDe'>
                    <div className='box-add'>
                        <h3>Add your products</h3>
                        <form onSubmit={handleSubmit} className="form-admin">
                            <div className="container-input">
                            <label className='labelAdmin'>Product Name</label>
                            <input placeholder='Name' type="text" id="name" className="input-adm" />
                            {/* </div> */}
                            {/* <div className="container-input"> */}
                            <label className='labelAdmin'>Product detail
                                <input placeholder='Detail' type="text" id="detail" className="input-adm" />
                            </label>
                            </div>
                            <div className="container-input">
                            <label className='labelAdmin'>Product image (url)
                                <input placeholder='URL image' type="text" id="img" className="input-adm" />
                            </label>
                            </div>
                            <div className="container-input">
                            <label className='labelAdmin'>Product price
                                <input placeholder='Price' type="price" id="price" className="input-adm" />
                            </label>
                            </div>
                            <div className="container-input">
                            <label className='labelAdmin'>Product size
                                <input placeholder='Size' type="size" id="size" className="input-adm" />
                            </label>
                            </div>
                            <div className="container-input">
                            <label className='labelAdmin'>Indicate the stock
                                <input placeholder='Stock' type="stock" id="stock" className="input-adm" />
                            </label>
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
                                    <label className='labelAdmin' name="Hashtags">
                                <label>Hashtags </label>
                                    {/* <p> Add the first hashtags as room or space </p> */}
                                    <input placeholder='Hashtags (separate with commas "," )' type="hashtags" id="hashtags" className="input-adm" />
                                    </label>
                            </div>
                            <button type="submit" className="submit" value="submit">
                                Add product
                            </button>
                        </form>
                    </div>
                    <div className='box-delete'>
                        <h3>Delete your products</h3>
                        <form onSubmit={handleDelete} className="form-admin formAdminDelete">
                            <div className="container-input">
                            <label className='labelAdmin' name="Hashtags">
                                <label>Select Product to delete </label>
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
                                Delete  Product
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            <div className='box-modify'>
                <h3 className='modi-title'>Modify your products</h3>
                <div className='ctnCardAdmin' >
                    {products.map((product, key) => (
                        <>
                            <div className='cardAdmin' key={key}>
                                <img className='cardimgAdmin' src={product.img} alt="" />
                                <p className='cardtittleAdmin'>{product.name}</p>
                                <LinkRouter to={`/ModifyProduct/${product._id}`} >
                                    <button style={{cursor: 'pointer'}}><EditIcon/></button>
                                </LinkRouter>
                            </div>
                        </>
                    ))
                    }
                </div >
            </div>
        </>
    )
}