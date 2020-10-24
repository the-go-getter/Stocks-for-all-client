import React from "react";
import '../../css/style.css'
import {Link} from "react-router-dom";

class WatchlistComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        newListTitle: "New Watchlist",
        editingwid: '',
        activewid: this.props.wid,
        watchlist: {title: ''},
        currID: ''
    }

    componentWillMount() {
        this.props.findWatchlistsForUser(this.props.uid)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.uid !== this.props.uid){
            this.props.findWatchlistsForUser(this.props.uid)
        }
    }

    render() {
        return (
            <div>
                {/*<nav className="navbar navbar-expand-lg ">*/}
                {/*    <h2 className="navbar-brand" onClick={() => this.props.history.push("/")}>Stocks4all</h2>*/}
                {/*    <button className="navbar-toggler" type="button" data-toggle="collapse"*/}
                {/*            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"*/}
                {/*            aria-label="Toggle navigation">*/}
                {/*        <span className="navbar-toggler-icon"></span>*/}
                {/*    </button>*/}
                {/*    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">*/}
                {/*        <ul className="navbar-nav">*/}
                {/*            <li className="nav-item active">*/}
                {/*                <Link to="/home">*/}
                {/*                    <button className="btn btn-outline-dark">Home</button>*/}
                {/*                </Link>*/}
                {/*            </li>*/}

                {/*            <li className="nav-item nav-right" hidden={this.state.profile.username }>*/}
                {/*                <Link className="" to="/login">*/}
                {/*                    <button className="btn btn-outline-primary">Login</button>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item nav-right" hidden={this.state.profile.username }>*/}
                {/*                <Link to="/register">*/}
                {/*                    <button className="btn btn-outline-primary">SignUp</button>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item nav-right" hidden={!this.state.profile.username }>*/}
                {/*                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Log*/}
                {/*                    out*/}
                {/*                </button>*/}
                {/*            </li>*/}
                {/*            <li className="nav-item nav-right"  hidden={!this.state.profile.username }>*/}
                {/*                <Link to="/profile">*/}
                {/*                    <button className="btn btn-outline-primary">Profile</button>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</nav>*/}
                <div className="container-fluid">
                    <div>
                        <div className="inline">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => this.setState({
                                newListTitle: e.target.value
                                    })}
                                value={this.state.newListTitle}/>
                        </div>
                        <div className="inline">
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => {
                                    const newWatchlist = {title: this.state.newListTitle}
                                    this.props.createWatchlist(this.props.uid, newWatchlist)
                                    }}>
                                <i className="fa fa-fw fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    {console.log(this.state.activewid)}
                    {!this.props.watchlists &&
                        <h2>No Watchlist Created yet!</h2>
                    }
                    {this.props.watchlists &&
                        <ul className="list-group">
                            {this.props.watchlists.map(watchlist =>
                               <li className="list-group-item"
                                    onClick={() => {
                                        const wid = watchlist.id                                            
                                        this.props.history.push(`/watchlist/${wid}`)
                                        this.setState({activewid: watchlist.id})
                                        }}
                                    key={watchlist.id}>
                                    <a className={`list-group-item
                                        ${(this.state.editingwid === watchlist.id || this.state.activewid === watchlist.id) ? 'active' : ''}`}>
                                        {this.state.editingwid !== watchlist.id &&
                                            <span>{watchlist.title}</span>
                                        }
                                        {this.state.editingwid === watchlist.id &&
                                            <input
                                                onChange={(e) => this.setState({watchlist: {title: e.target.value}})}
                                                value={this.state.watchlist.title}/>
                                        }
                                        {this.state.editingwid === watchlist.id &&
                                            <button onClick={() => {
                                                console.log(this.state.currID)
                                                console.log(this.state.watchlist)
                                                this.props.updateWatchlist(this.state.currID, this.state.watchlist)
                                                    .then(() => this.setState({editingwid: ''}))
                                                }}>
                                                <i className="fa fa-save"></i>
                                            </button>
                                        }
                                        {this.state.editingwid === watchlist.id &&
                                            <button onClick={
                                                () => this.props.deleteWatchlist(watchlist.id)
                                                }>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        }
                                        {this.state.editingwid !== watchlist.id &&
                                            <button onClick={() => {
                                                const wid = watchlist.id
                                                this.props.history.push(`/watchlist/${wid}`)
                                                this.setState({
                                                    watchlist: watchlist,
                                                    currID: watchlist.id,
                                                    editingwid: watchlist.id
                                                })

                                                console.log(watchlist.id)
                                                console.log(this.state.editingwid)
                                                console.log(this.state.editingwid === watchlist.id)
                                                }}>
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        }
                                    </a>
                                </li>)
                            }
                        </ul>
                    }
                </div>
            </div>
        )
    }
}


export default WatchlistComponent
