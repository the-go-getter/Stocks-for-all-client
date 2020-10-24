import * as React from "react";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import AdminService from "../../services/AdminService";

export default class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.UserService = new UserService();
        this.AdminService = new AdminService();
    }
    state = {
        stocks: [],
        users: [],
        profile: {}
    }

    DeleteUser = async (userid) => {
        fetch(`https://infinite-retreat-10652.herokuapp.com/api/users/` + userid, {
            method: 'DELETE',
            credentials: "include"
        }).then(status => console.log(this.state.profile))
            .then(result => fetch(`https://infinite-retreat-10652.herokuapp.com/api/users`, {
                method: 'GET',
                credentials: "include"
            })).then(reseponse => reseponse.json()).then(users => this.setState({
            users: users
        })).then(status => console.log(this.state.profile))
    }

    logout() {
        this.UserService.logout();
        this.setState({
            profile: {}
        })

        //this.history.push('/home'))
    }

    componentDidMount = async () => {

        fetch(`https://infinite-retreat-10652.herokuapp.com/admin/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            profile: profile
        })).then(status => console.log(this.state.profile))

        fetch(`https://infinite-retreat-10652.herokuapp.com/admin/profile`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(profile => this.setState({
            profile: profile
        })).then(status => console.log(this.state.profile))

        fetch(`https://infinite-retreat-10652.herokuapp.com/api/users`, {
            method: 'GET',
            credentials: "include"
        }).then(reseponse => reseponse.json()).then(users => this.setState({
            users: users
        })).then(status => console.log(this.state.profile))

        fetch(`https://infinite-retreat-10652.herokuapp.com/api/stocks`, {
            method: 'GET',

        }).then(reseponse => reseponse.json()).then(stocks => this.setState({
            stocks: stocks
        })).then(status => console.log(this.state.stocks))

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




                            <li className="nav-item nav-right"
                                hidden={!this.state.profile.username }>
                                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Log
                                    out
                                </button>
                            </li>

                        </ul>
                    </div>
                </nav>
                {this.state.profile.username &&
                <div class="container">
                    <div>
                        <h3>
                            Hi,{this.state.profile.username}
                        </h3>
                    </div>
                    <h5>User List</h5>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Password</th>
                            <th scope="col">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(user =>
                                <tr>
                                    <th scope="row">
                                        {user.id}
                                    </th>
                                    <td>
                                        {user.username}
                                    </td>
                                    <td>
                                        {user.password}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <button
                                            class="btn btn-danger my-0"
                                            onClick={() => {
                                                this.DeleteUser(user.id)
                                            }
                                            }>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <h5>Stock List</h5>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Recommendation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stocks.map(stock =>
                                <tr>
                                    <th scope="row">
                                        {stock.id}
                                    </th>
                                    <td>
                                        {stock.name}
                                    </td>
                                    <td>
                                        {stock.category}
                                    </td>
                                    <td>
                                        {stock.recommendation}
                                    </td>

                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                }
                {
                    !this.state.profile.username &&
                    <div>
                        <h3>
                            Access Denied
                        </h3>
                    </div>
                }
            </div>)
    }
}
