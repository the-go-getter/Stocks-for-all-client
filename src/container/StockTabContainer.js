import {connect} from 'react-redux'
import service from '../services/StockService'
import {findStocksForWatchlist, createStock, deleteStock} from '../actions/StockActions'
import StockTabComponent from '../front/watchlist/StockTabComponent'
const smap = (state) => ({
    stocks: state.stocks.stocks
})

const dmap = (dispatch) => (
    {
        createStock: (wid, stock) =>
            service.addStockToWatchlist(wid, stock)
                .then(newstock => 
                    dispatch(createStock(newstock))),
        findStocksForWatchlist: (wid) =>
            service.getStocksForWatchlist(wid)
                .then(stocks =>
                    dispatch(findStocksForWatchlist(stocks))),
        deleteStock: (wid, sid) => 
            service.removeStockFromWatchlist(wid, sid)
                .then(status => 
                    dispatch(deleteStock(wid)))
    }
)
const StockTabContainer = connect(
    smap,
    dmap
)(StockTabComponent)

export default StockTabContainer