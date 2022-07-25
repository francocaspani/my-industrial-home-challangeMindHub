const initialState = {
    products: [],
    productsFiltered: [],
    product: [],
    productsByAmbient: [],
    productfilteredbyroom: [],
    rating: 0
}

let checkBoxSelected = []

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getProducts':
            return {
                ...state,
                products: action.payload,
                productsFiltered: action.payload,
                productfilteredbyroom: action.payload
            }
        case 'filterProductsByName':
            const filtered = state.products.filter(products => products.name.toLowerCase().includes(action.payload.trim().toLowerCase()))
            return {
                ...state,
                productsFiltered: filtered
            }
        case 'getOneProduct':
            return {
                ...state,
                product: action.payload
            }
        case 'getProductsByAmbient':
            return {
                ...state,
                productsByAmbient: action.payload
            }
        case "filterProductByRoom":
            if (action.payload) {
                if (action.payload.target.checked) {
                    checkBoxSelected.push(action.payload.target.value)
                } else {
                    const index = checkBoxSelected.indexOf(action.payload.target.value)
                    checkBoxSelected.splice(index, 1)
                }
            }
            const filtercheck = state.products.filter(product => checkBoxSelected.includes(product.hashtags[0]))
            return {
                ...state,
                productfilteredbyroom: filtercheck
            }
        case 'getRating':
            let prodRating;
            const ratings = action.payload.map(rev => rev.rating);
            let sumRating = 0;
            for (let i = 0; i < ratings.length; i++) {
                sumRating = ratings[i] + sumRating
            }
            prodRating = sumRating / (action.payload.length)
            return {
                ...state,
                rating: prodRating
            }

        default:
            return state
    }
}

export default productsReducer