export const FIND_WATCHLISTS_FOR_USER = "FIND_WATCHLISTS_FOR_USER"
export const findWatchlistsForUser = (watchlists) => ({
    watchlists: watchlists,
    type: FIND_WATCHLISTS_FOR_USER
})

export const CREATE_WATCHLIST = "CREATE_WATCHLIST"
export const createWatchlist = (watchlist) => ({
    type: CREATE_WATCHLIST,
    newWatchlist: watchlist
})

export const DELETE_WATCHLIST = "DELETE_WATCHLIST"
export const deleteWatchlist = (watchlistId) => ({
    type: DELETE_WATCHLIST,
    watchlistId: watchlistId
})

export const UPDATE_WATCHLIST = "UPDATE_WATCHLIST"
export const updateWatchlist = (watchlist) => ({
    type: UPDATE_WATCHLIST,
    watchlistId: watchlist.id,
    watchlist: watchlist
})
