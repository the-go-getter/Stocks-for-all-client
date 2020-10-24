import React from "react";
import './CategoryTableComponent'
import CategoryTableComponent from "./CategoryTableComponent";
import StockService from "../../services/StockService";

class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.catName = this.props.match.params.catName;
        //this.stockService = new StockService();
    }

    state = {
        watchList:[],
        catStocks: []
    }

    componentDidMount = async () => {

        const serviceCatStocks = await StockService.getStocksForCategory(this.catName)
        console.log(serviceCatStocks)
        this.setState({
            catStocks: serviceCatStocks,
        })
    }

    addToWatchList = async (stock) => {
        StockService.addStockToWatchlist(stock).then(this.setState(prevState => ({
            watchList: [...prevState.watchList, stock]
        })))
        
    }

    render() {
        return (
            <div>
                <CategoryTableComponent
                    category={this.catName}
                    stocks={this.state.catStocks}
                    addToWatchList={this.addToWatchList}
                />
            </div>
        )
    }
}


export default CategoryComponent