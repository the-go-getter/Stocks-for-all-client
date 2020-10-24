import {FIND_WATCHLISTS_FOR_USER, CREATE_WATCHLIST, UPDATE_WATCHLIST, DELETE_WATCHLIST} from '../../actions/WatchlistActions'
const initial = {
    watchlists : []
}
const WatchlistReducer = (state=initial, action) => {
    switch(action.type){
        case FIND_WATCHLISTS_FOR_USER:
            return {
                watchlists: action.watchlists
            }
        case CREATE_WATCHLIST:
            return {
                watchlists: [
                    ...state.watchlists,
                    action.newWatchlist
                ]
            }
        case DELETE_WATCHLIST:
            return {
                watchlists: state.watchlists.filter(watchlist => watchlist.id!==action.watchlistId)
            }
        case UPDATE_WATCHLIST:
            return {
                watchlists: state.watchlists.map(watchlist => 
                        watchlist.id===action.watchlistId ? action.watchlist : watchlist
                    )
            }
        default:
            return state
    }
}
export default WatchlistReducer