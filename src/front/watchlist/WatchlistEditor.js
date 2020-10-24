import React from "react";
import WatchlistContainer from '../../container/WatchlistContainer'
import UserService from "../../services/UserService"
import WatchlistReducer from './WatchlistReducer'
import StockReducer from './StockReducer'
import {Link} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import StockTabContainer from "../../container/StockTabContainer";
import DetailComponent from './DetailComponent'
import "./WatchlistStyle.css"

const rootReducer = combineReducers({
    watchlists: WatchlistReducer,
    stocks: StockReducer
})
const store = createStore(rootReducer)

class WatchlistEditor extends React.Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
    }
    state = {
        profile: {
            id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            roles: []
        }
    }

    logout() {
        this.UserService.logout();
        this.setState({
            profile: {},
            session: false
        })
    }

    componentDidMount = async () => {
        const profile = await this.UserService.getSession()
        if (profile.username !== "PLEASE LOGIN FIRST") {
            this.setState({
                profile: profile,
                session: true
            })
        }
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <nav className="navbar navbar-expand-lg">
                        <h2 className="navbar-brand">Stocks4all</h2>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                            <ul className="navbar-nav" style={{width: '100px'}}>
                                <li className="nav-item active">
                                    
                                    <Link to="/home">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-dark">Home</button>
                                    </Link>
                                </li>
                                <li className="wl nav-item">
                                    <Link to="/watchlist">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-dark">Watchlist</button>
                                    </Link>
                                </li>
                                <li className="wl nav-item">
                                    <Link to="/research">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-dark">Self-Research</button>
                                    </Link>
                                </li>
                                <li className="wl nav-item nav-right" hidden={this.state.session}>
                                    <Link className="" to="/login">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-primary">Login</button>
                                    </Link>
                                </li>
                                <li className="wl nav-item nav-right" hidden={this.state.session}>
                                    <Link to="/register">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-primary">SignUp</button>
                                    </Link>
                                </li>
                                <li className="wl nav-item nav-right" hidden={!this.state.session}>
                                    <button
                                        style={{color: 'black'}}
                                        className="btn btn-outline-primary" onClick={() => this.logout()}>Logout
                                    </button>
                                </li>
                                <li className="wl nav-item nav-right" hidden={!this.state.session}>
                                    <Link to="/profile">
                                        <button
                                            style={{color: 'black'}}
                                            className="btn btn-outline-primary">Profile</button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    {this.state.session &&
                    <div className="row">
                        <div className="col-4">
                            <h4>{this.state.profile.username}'s Watchlist</h4>
                            <WatchlistContainer
                                uid={this.state.profile.id}
                                wid={this.props.watchlistId}
                                history={this.props.history}/>
                        </div>
                        <div className="col-8">
                            <StockTabContainer
                                uid={this.state.profile.id}
                                wid={this.props.watchlistId}
                                sid={this.props.stockId}
                                history={this.props.history}/>
                            <DetailComponent
                                sid={this.props.stockId}/>
                        </div>
                    </div>
                    }
                    {!this.state.session &&
                    <h2>PLEASE login first!</h2>
                    }
                </div>
            </Provider>
        )
    }
}

export default WatchlistEditor
