import {connect, Provider} from "react-redux";
import React from "react";
import SearchDetail from "./SearchDetail";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import AdminService from "../../services/AdminService";
import StockService from "../../services/StockService";
import "./SearchStyle.css"

class SearchClientComponent extends React.Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
        this.AdminService = new AdminService();
        //this.StockService = new StockService();
    }
    state = {
        chosewatchlist: {},
        stockname: '',
        gainstock: [],
        losestock: [],
        stock: {
            profile: {
                companyName: '',
                watchlists: []
            }
        },
        profile: {
            id: '',
            watchlists: [],
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: []
        },
        viewdetail: 0,
        session: false
    }

    addToWatchlist(wid, stock) {
        StockService.addStockToWatchlist(wid, stock)
        alert("Add Successful!")
    }

    logout() {
        //this.UserService.logout();
        this.AdminService.logout();
        this.setState({
            profile: {},
        })
    }

    componentDidMount = async () => {
        const initstock = await this.props.initGainer()
        const initstock2 = await this.props.initLoser()

        fetch(`https://infinite-retreat-10652.herokuapp.com/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            profile: profile
        })).then(status => console.log(this.state.profile))


        this.setState({
            gainstock: initstock,
            losestock: initstock2
        })
        console.log(this.state.profile)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
        if (this.props.stock !== prevProps.stock) {
            this.setState({stock: this.props.stock})
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg ">
                    <h2 className="navbar-brand" onClick={() => this.props.history.push("/")}>Stocks4all</h2>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav" style={{width: '100px'}}>
                            <li className="nav-item active">
                                <Link to="/home">
                                    <button className="btn btn-outline-dark">Home</button>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link to="/watchlist">
                                    <button className="btn btn-outline-dark">Watchlist</button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/research">
                                    <button className="btn btn-outline-dark">Research</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={this.state.profile.password}>
                                <Link className="" to="/login">
                                    <button className="btn btn-outline-primary">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={this.state.profile.password}>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary">SignUp</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={!this.state.profile.password}>
                                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Logout
                                </button>
                            </li>
                            <li className="nav-item nav-right" hidden={!this.state.profile.password}>
                                <Link to="/profile">
                                    <button className="btn btn-outline-primary">Profile</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <h1>research</h1>
                    <div className="row">
                        <hr/>
                        Hi {this.state.profile.username}!
                    </div>
                    <div className="input-group-prepend">
                        <input type="text" className="form-control" placeholder="Search the Stock"
                               onChange={(e) => {
                                   const newStock = e.target.value
                                   this.setState(prevState => ({
                                       stockname: newStock
                                   }))
                               }}
                               value={this.state.stockname}/>
                        <div className="input-group-prepend">
                            <button className="btn bg-info btn-rounded my-0" type="submit"
                                    onClick={() => {
                                        this.props.searchStock(this.state.stockname)
                                            .then(() =>
                                                this.setState({
                                                    stockname: ''
                                                })
                                            )
                                    }
                                    }>Search
                            </button>
                        </div>
                    </div>
                    {this.props.stock.profile &&
                    <div className="container">
                        <div>
                            <h3 className="alert alert-info">
                                Search Result
                            </h3>
                        </div>
                        {this.state.viewdetail === 0 &&
                        <div>
                            <p><h5>Stock Name:</h5>{this.state.stock.profile.companyName}</p>
                            <div class="row">
                                <button
                                    className="btn bg-info btn-rounded my-0" type="submit"
                                    onClick={() =>
                                        this.setState({
                                            viewdetail: 1
                                        })
                                    }
                                >Show Details
                                </button>

                            </div>
                        </div>}
                        {this.state.viewdetail === 1 &&
                        <div>
                            <SearchDetail stock={this.props.stock}></SearchDetail>
                            <button
                                className="btn bg-info btn-rounded my-0" type="submit"
                                onClick={() =>
                                    this.setState({
                                        viewdetail: 0
                                    })
                                }
                            >Hide Details
                            </button>
                        </div>
                        }
                        {this.state.profile.password&&<div>
                            <select className="custom-select" id="inputGroupSelect01"
                                    onChange={(e) => {
                                        const newType = e.target.value
                                        console.log(e.target.value)
                                        this.setState(prevState => ({
                                            chosewatchlist: newType
                                        }))
                                    }}
                                    value={this.state.chosewatchlist}
                            >
                                <option className="btn bg-info btn-rounded my-0" type="submit" value=''>please
                                    choose your watchlist:
                                </option>
                                {this.state.profile.watchlists.map(watchlist =>
                                    <option
                                        className="btn bg-info btn-rounded my-0" type="submit"
                                        value={watchlist.id}>
                                        Your Watchlist: {watchlist.title}
                                    </option>
                                )
                                }
                            </select>
                            <button onClick={() =>
                                this.addToWatchlist(this.state.chosewatchlist, {
                                    name: this.props.stock.profile.companyName,
                                    symbol: this.props.stock.symbol,
                                    category: this.props.stock.profile.sector,
                                    recommendation: 'Strong Buy'
                                })}>Add
                            </button>
                        </div>
                        }
                    </div>
                    }
                </div>
                <div className="container">
                    <div className="row container">
                        <div className="col-sm-6">
                            <h3 className="alert alert-success">
                                Today's Top Gainer
                            </h3>

                            {
                                this.state.gainstock.mostGainerStock && this.state.gainstock.mostGainerStock.map(itstock =>
                                    <div className="row container">
                                        <h5>Name:</h5> {itstock.companyName}
                                        {itstock.ticker}
                                        <h5>Percentage:</h5>
                                        {itstock.changesPercentage}
                                        <h5>Price:</h5>
                                        {itstock.price}
                                    </div>
                                )
                            }
                        </div>
                        <div className={"col-sm-6"}>
                            <h3 className="alert alert-danger">
                                Today's Top Loser
                            </h3>

                            {
                                //console.log(this.state.initstock.mostGainerStock)
                                this.state.losestock.mostLoserStock && this.state.losestock.mostLoserStock.map(itstock =>
                                    <div className="row container">
                                        <h5>Name:</h5> {itstock.companyName}
                                        {itstock.ticker}
                                        <h5>Percentage:</h5>
                                        {itstock.changesPercentage}
                                        <h5>Price:</h5>
                                        {itstock.price}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

const stateToPropertyMapper = (state) => ({
        //topics: state.topics.topics
        stock: state.stock.stock,
        initstock: state.stock.initstock

    }

)
const dispatcherToPropertyMapper = (dispatcher) => ({
    searchStock: stockid =>
        fetch('https://financialmodelingprep.com/api/v3/company/profile/' + stockid)
            .then(response => response.json())
            .then(stock => dispatcher({
                type: 'SEARCH_STOCK',
                stock: stock
            })),
    initGainer: async () =>
        fetch('https://financialmodelingprep.com/api/v3/stock/gainers')
            .then(response => response.json()),
    initLoser: async () =>
        fetch('https://financialmodelingprep.com/api/v3/stock/losers')
            .then(response => response.json())

})

export default connect(
    stateToPropertyMapper,
    dispatcherToPropertyMapper
)(SearchClientComponent)

