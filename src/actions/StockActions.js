export const FIND_STOCKS_FOR_WATCHLIST = "FIND_STOCKS_FOR_WATCHLIST"
export const findStocksForWatchlist = (stocks) => ({
    stocks: stocks,
    type: FIND_STOCKS_FOR_WATCHLIST
})

export const CREATE_STOCK = "CREATE_STOCK"
export const createStock = (stock) => ({
    type: CREATE_STOCK,
    newStock: stock
})

export const DELETE_STOCK = "DELETE_STOCK"
export const deleteStock = (stockId) => ({
    type: DELETE_STOCK,
    stockId: stockId
})

