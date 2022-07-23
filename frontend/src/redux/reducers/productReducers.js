const initialState = {
    products:[],
    productsFiltered: [],
    product:[],
    productsByAmbient: [],
    productfilteredbyroom: []
}

const productsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'getProducts':
            return{
                ...state,
                products: action.payload,
                productsFiltered: action.payload,
                productfilteredbyroom: action.payload
            }
        case 'filterProductsByName':
            const filtered = state.products.filter(products => products.name.toLowerCase().includes(action.payload.trim().toLowerCase()))
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
        case "filterProductByRoom":

            const filtercheck =state.products.filter(product => action.payload.includes( product.hashtags[0]))
            
            console.log(action.payload)
            console.log(filtercheck)
            return{
                ...state,
                productfilteredbyroom:filtercheck
            }
        
        default:
            return state
    }
}

export default productsReducer