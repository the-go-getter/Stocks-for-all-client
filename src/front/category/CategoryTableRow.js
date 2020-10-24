import React from "react";
import UserService from "../../services/UserService";
import AdminService from "../../services/AdminService";
import StockService from "../../services/StockService";

//"stock, addToWatchlist"

class CategoryTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocknow: {},
            rating: '',
            chosewatchlist: '',
            user: {watchlists: []}
        }
        this.UserService = new UserService();
        this.AdminService = new AdminService();

        this.stock = props.stock
    }


    componentDidMount = async () => {
        const stock = await this.searchStock()
        const rating = await this.ratingStock()
        const user = await this.UserService.getSession()

        console.log(user)
        this.setState(
            {
                stocknow: stock,
                rating: rating,
                user: user
            }
        )
    }
    searchStock = () =>
        fetch('https://financialmodelingprep.com/api/v3/company/profile/' + this.stock.symbol)
            .then(response => response.json())
    ratingStock = () =>
        fetch('https://financialmodelingprep.com/api/v3/company/rating/' + this.stock.symbol)
            .then(response => response.json())

    render() {
        return (

            <div class="container">
                <table className="table">
                    <thead className="thead-light ">
                    <tr className='table'>
                        <th className="d-none d-sm-table-cell" scope="col">Stock name</th>
                        <th className="d-none d-md-table-cell" scope="col">Stock symbol</th>
                        <th className="d-none d-md-table-cell" scope="col">Market price</th>
                        <th className="d-none d-md-table-cell" scope="col">Recommendation</th>
                        <th scope="col">
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.stock.name}</td>
                        <td>{this.stock.symbol}</td>
                        {this.state.stocknow.profile&&
                            <td>{this.state.stocknow.profile.price}</td>
                        }
                        {!this.state.stocknow.profile&&
                        <td>Not Clear</td>
                        }
                        {this.state.rating.rating &&
                        <td>{this.state.rating.rating.recommendation}</td>
                        }
                        {!this.state.rating.rating &&
                        <td>Not Clear</td>
                        }
                        {this.state.user.watchlists &&
                        <div>
                            <select className="custom-select" id="inputGroupSelect01"
                                    onChange={(e) => {
                                        const newType = e.target.value
                                        console.log(e.target.value)
                                        this.setState(prevState => ({
                                            chosewatchlist: newType
                                        }))
                                    }}>
                                <option className="btn bg-info btn-rounded my-0" type="submit" value=''>please choose
                                    your watchlist:
                                </option>
                                {this.state.user.watchlists.map(watchlist =>
                                    <option
                                        className="btn bg-info btn-rounded my-0" type="submit" value={watchlist.id}>
                                        Your Watchlist: {watchlist.title}
                                    </option>
                                )
                                }
                            </select>
                            <button onClick={() => {
                                StockService.addStockToWatchlist(this.state.chosewatchlist, {
                                    name: this.stock.name,
                                    symbol: this.stock.symbol,
                                    category: this.stock.category,
                                    recommendation: 'Strong Buy'
                                })
                                alert('added successful!')
                            }
                            }>Add
                            </button>
                        </div>
                        }
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CategoryTableRow

