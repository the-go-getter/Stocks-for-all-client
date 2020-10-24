export const getStocksForCategory = async (category) => {
    return await fetch(`https://infinite-retreat-10652.herokuapp.com/api/${category}/stocks`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}
export const getStockBySymbol = async (symbol) => {
    return await fetch(`https://financialmodelingprep.com/api/v3/company/profile/${symbol}`)
    .then(response => response.json())
}
export const addStockToWatchlist = async (wid, stock) => {
    return await fetch(`https://infinite-retreat-10652.herokuapp.com/api/watchlists/${wid}/stocks`, {
        method: 'POST',
        body: JSON.stringify(stock),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export const removeStockFromWatchlist = async (wid, stockId) => {
    return await fetch(`https://infinite-retreat-10652.herokuapp.com/api/watchlists/${wid}/stocks/${stockId}`, {
        method: 'DELETE'
    }).then(response => response.json())
}
export const getStocksForWatchlist = async (wid) => {
    if (wid != '')
        return await fetch(`https://infinite-retreat-10652.herokuapp.com/api/watchlists/${wid}/stocks`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
}
export default {
    getStocksForCategory,
    addStockToWatchlist,
    removeStockFromWatchlist,
    getStocksForWatchlist,
    getStockBySymbol
}

