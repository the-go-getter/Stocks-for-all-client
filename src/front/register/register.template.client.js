import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./register.style.css"

let date = new Date()

class RegisterPageClient extends React.Component {
    state = {
        username: '',
        password: '',
        verifiPassword: '',
        email: '',
        registertime: date
    }
    register = (user) => {
        if (this.state.password != '' && this.state.password === this.state.verifiPassword) {
            fetch('https://infinite-retreat-10652.herokuapp.com/api/users', {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: "include"
            })
            this.props.history.push('/home')
        } else {
            alert('You should verify your password!')
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg ">
                    <h2 className="navbar-brand" onClick={() => this.props.history.push("/")}>Stocks4all</h2>
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
                            <li className="nav-item nav-right" hidden={this.state.session}>
                                <Link to="/login">
                                    <button className="btn btn-outline-primary">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={this.state.session}>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary">SignUp</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={!this.state.session}>
                                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Log
                                    out
                                </button>
                            </li>
                            <li className="nav-item nav-right" hidden={!this.state.session}>
                                <Link to="/profile">
                                    <button className="btn btn-outline-primary">Profile</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container">

                    <h1>Sign Up</h1>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2">
                                Username </label>
                            <div className="col-sm-10">
                                <input className="form-control wbdv-field wbdv-username"
                                       id="usernameFld" placeholder="Alice"
                                       value={this.state.username}
                                       onChange={(e) => this.setState({
                                           username: e.target.value
                                       })}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">
                                Password </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control wbdv-field wbdv-password"
                                       id="passwordFld" placeholder="123qwe#$%"
                                       value={this.state.password}
                                       onChange={(e) => this.setState({
                                           password: e.target.value
                                       })}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="Verify Password" className="col-sm-2 col-form-label">
                                Verify Password </label>
                            <div className="col-sm-10">
                                <input className="form-control wbdv-field wbdv-password-verify"
                                       type="password"
                                       id="verifyPasswordFld"
                                       value={this.state.verifiPassword}
                                       onChange={(e) => this.setState({
                                           verifiPassword: e.target.value
                                       })}
                                       placeholder="123qwe#$%"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="Verify Password" className="col-sm-2 col-form-label">
                                Email </label>
                            <div className="col-sm-10">
                                <input className="form-control wbdv-field wbdv-password-verify"
                                       id="verifyPasswordFld"
                                       value={this.state.email}
                                       onChange={(e) => this.setState({
                                           email: e.target.value
                                       })}
                                       placeholder="alice@gmail.com"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                                <button className="btn btn-primary btn-block wbdv-button wbdv-register"
                                        onClick={() => {
                                            this.register(this.state)

                                        }}>
                                    Sign Up
                                </button>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Link className="wbdv-link wbdv-login" to="/login">
                                            Login
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

export default RegisterPageClient
