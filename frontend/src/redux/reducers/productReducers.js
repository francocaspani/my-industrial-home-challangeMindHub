const initialState = {
    products:[],
    productsFiltered: [],
    product:[],
    productsByAmbient: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'getProducts':
            return{
                ...state,
                products: action.payload,
                productsFiltered: action.payload
            }
        case 'filterProductsByName':
            const filtered = state.products.filter(products => products.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                productsFiltered : filtered
            }
        case 'getOneProduct':
            return{
                ...state,
                product: action.payload
            }
        case 'getProductsByAmbient':
            return{
                ...state,
                productsByAmbient: action.payload
            }
        default:
            return state
    }
}

export default productsReducer