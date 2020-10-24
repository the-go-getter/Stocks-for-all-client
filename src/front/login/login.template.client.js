import React from 'react';
import {Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import "./login.style.css"

class LoginPageClient extends React.Component {
    constructor(props) {
        super(props);
        this.UserService = new UserService();
    }
    state = {
        user: {
            username: '',
            password: ''
        },
        usertype: "1",
        profile: {}
    }

    checkLogin = async () => {
        //alert('123123')
        const profile = await this.UserService.getSession()
        this.setState({profile: profile})

    }
    handleLogin = async (user) => {
        //alert('222')
        return this.UserService.login(user)
        //this.props.history.push('/home')
    }
    AdminLogin = async (user) => {
        //alert('admin')
        fetch(`https://infinite-retreat-10652.herokuapp.com/admin/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => console.log(response.json()))

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
                            <li className="nav-item nav-right"
                                hidden={this.state.session}>
                                <Link className="" to="/login">
                                    <button className="btn btn-outline-primary">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right"
                                hidden={this.state.session}>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary">SignUp</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <h1>Sign In</h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">
                                Username
                            </label>
                            <div className="col-sm-10">
                                <input className="form-control wbdv-field wbdv-username"
                                       id="username"
                                       placeholder="Alice"
                                       value={this.state.user.username}
                                       onChange={(e) => this.setState({
                                           user: {
                                               ...this.state.user,
                                               username: e.target.value
                                           }
                                       })}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control wbdv-field wbdv-password"
                                       id="password" placeholder="123qwe#$%"
                                       value={this.state.user.password}
                                       onChange={(e) => this.setState({
                                           user: {
                                               ...this.state.user,
                                               password: e.target.value
                                           }
                                       })}
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-10"></div>
                            <div class="pull-right col-2">
                                <select className="custom-select" id="inputGroupSelect01"
                                        onChange={(e) => {
                                            const newType = e.target.value
                                            console.log(e.target.value)
                                            this.setState(prevState => ({
                                                usertype: newType
                                            }))
                                        }}
                                        value={this.state.usertype}

                                >
                                    <option selected value="1">User</option>
                                    <option value="2">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <Link to="/home">
                                    <button
                                        className="btn btn-primary btn-block wbdv-button wbdv-login"
                                        onClick={() => {
                                            if (this.state.usertype == "1") {
                                                this.handleLogin(this.state.user)
                                                this.checkLogin()
                                            } else
                                                this.AdminLogin(this.state.user)
                                        }
                                        }>
                                        Sign In
                                    </button>
                                </Link>
                                <div className="row">
                                    <div className="col-6">
                                        <a className="wbdv-link wbdv-forgot-password" href="#"></a>
                                    </div>
                                    <div className="col-6">
                                        <Link to="/register">
                                            Sign up
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default LoginPageClient
