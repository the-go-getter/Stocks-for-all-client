import React from 'react'
import {connect} from 'react-redux'
import service from '../services/WatchlistService'
import {findWatchlistsForUser, createWatchlist, deleteWatchlist, updateWatchlist} from '../actions/WatchlistActions'
import WatchlistComponent from '../front/watchlist/WatchlistComponent'



const smap = (state) => ({
    watchlists: state.watchlists.watchlists
})

const dmap = (dispatch) => (
    {
        createWatchlist: (uid, watchlist) =>
            service.createWatchlist(uid, watchlist)
                .then(newwatchlist => 
                    dispatch(createWatchlist(newwatchlist))),
        findWatchlistsForUser: (uid) =>
            service.getWatchlistForUser(uid)
                .then(watchlists =>
                    dispatch(findWatchlistsForUser(watchlists))),
        updateWatchlist: (wid, watchlist) =>
            service.updateWatchlist(wid, watchlist)
                .then(status => service.findWatchlistById(wid))
                .then(actual => 
                    dispatch(updateWatchlist(actual))),
        deleteWatchlist: (wid) => 
            service.deleteWatchlist(wid)
                .then(status => 
                    dispatch(deleteWatchlist(wid)))
    }
)
const WatchlistContainer = connect(
    smap,
    dmap
)(WatchlistComponent)

export default WatchlistContainer
