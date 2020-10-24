import React from 'react'

export default class StockTabComponent extends React.Component{
    componentDidMount(){
        this.props.findStocksForWatchlist(this.props.wid)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.wid !== this.props.wid){
            this.props.findStocksForWatchlist(this.props.wid)
        }
    }
    state = {
        activeStockId: this.props.sid,
        stock: {title:''},
        currID: ''
    }
    render(){
        return(
            <ul className="nav nav-tabs">
                {
                    this.props.stocks && this.props.stocks.map(stock => 
                        <li className={`nav-item`}
                            key={stock.id}>
                            <a className={`nav-item ${this.state.activeStockId===stock.symbol ? 'active':''}`}
                                onClick={
                                    ()=>{
                                        this.props.history.push(`/watchlist/${this.props.wid}/stock/${stock.symbol}`)
                                        this.setState({
                                            activeStockId: stock.symbol
                                        })
                                    }
                                }>
                                <span>{stock.symbol}</span>
                            </a>
                            <button onClick={()=>{
                                    this.props.history.push(`/watchlist/${this.props.wid}`)
                                    this.props.deleteStock(this.props.wid, stock.id)
                                }
                                }>
                                    <i className="fa fa-trash"></i>
                            </button>
                        </li>
                    )
                }
                
            </ul>
        )
    }
}