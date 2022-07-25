const initialState = {
    productsBasket: [],
    one: []
}

const basketReducer = (state = initialState, action) => {
    //console.log(action)
    //console.log(state.products)
    switch(action.type) {
        case 'getProductsBasket':
            return {
                ...state,
                productsBasket: action.payload
            }
        case 'getOne':
            return {
                ...state,
                one: action.payload
            }
        default:
            return state
    }
}
export default basketReducer