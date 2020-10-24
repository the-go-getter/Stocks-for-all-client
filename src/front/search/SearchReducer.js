const initialState = {
    stock: [
        {
            price: '',
            symbol: '',
       }

    ]
}
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        // TODO: move all strings to constants
        case "SEARCH_STOCK": {
            console.log(action.stock)
            //console.log(state.stock)
            return {
                //topics: action.topics
                stock: action.stock
            }
        }

        default:
            return state
    }
}
export default SearchReducer