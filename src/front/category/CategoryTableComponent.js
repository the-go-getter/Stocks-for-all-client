import React from "react";
import CategoryTableRow from './CategoryTableRow'
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import AdminService from "../../services/AdminService";
import "./CategoryStyle.css"

class CategoryTableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
        this.AdminService = new AdminService();
    }
    state = {
        profile: {},
        session: false,
        admin: {}
    }

    logout() {
        //this.UserService.logout();
        this.AdminService.logout();
        //alert('111')
        this.setState({
            profile: {}
        })
    }

    componentDidMount = async () => {
        const profile = await this.UserService.getSession()
        const admin = fetch(`https://infinite-retreat-10652.herokuapp.com/admin/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            admin: profile
        })).then(status => console.log(this.state.profile))

        if (profile.username !== "PLEASE LOGIN FIRST") {
            this.setState({
                profile: profile,
                session: true
            })
        }
        console.log(this.state.profile)
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
                            <li className="nav-item" hidden={!this.state.admin.username}>
                                <Link to="/admin">
                                    <button className="btn btn-outline-dark">Admin options</button>
                                </Link>
                            </li>
                            <li className="nav-item " hidden={this.state.admin.username}>
                                <Link to="/watchlist">
                                    <button className="btn btn-outline-dark">Watchlist</button>
                                </Link>
                            </li>
                            <li className="nav-item" hidden={this.state.admin.username}>
                                <Link to="/research">
                                    <button className="btn btn-outline-dark">Research</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right"
                                hidden={this.state.profile.username || this.state.admin.username}>
                                <Link className="" to="/login">
                                    <button className="btn btn-outline-primary">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right"
                                hidden={this.state.profile.username || this.state.admin.username}>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary">SignUp</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right"
                                hidden={!this.state.profile.username && !this.state.admin.username}>
                                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Logout
                                </button>
                            </li>
                            <li className="nav-item nav-right"
                                hidden={!this.state.profile.username || this.state.admin.username}>
                                <Link to="/profile">
                                    <button className="btn btn-outline-primary">Profile</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">

                    <h1 id="categoryHeading">{this.props.category}</h1>
                    {this.state.profile.username && <p>hi,{this.state.profile.username}</p>}
                    {
                        this.props.stocks.map((stock, index) =>
                            <CategoryTableRow
                                addToWatchlist={this.props.addToWatchList}
                                stock={stock}
                                user={this.state.profile}
                                key={index}
                            />
                        )
                    }

                </div>
            </div>

        )
    }

}

export default CategoryTableComponent
