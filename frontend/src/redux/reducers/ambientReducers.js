const initialState = {
    ambients:[],
    ambientsFiltered: [],
    ambient:[]
}

const ambientsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'getAmbients':
            return{
                ...state,
                ambients: action.payload,
                ambientsFiltered: action.payload
            }
        case 'filterAmbients':
            const filtered = state.ambients.filter(ambients => ambients.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                ambientsFiltered : filtered
            }
        case 'getOneAmbient':
            return{
                ...state,
                ambient: action.payload
            }
        default:
            return state
    }
}

export default ambientsReducer