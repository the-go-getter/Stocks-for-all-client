import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getProfile} from "../../services/ProfileService";
import UserService from '../../services/UserService'
import WatchlistService from "../../services/WatchlistService";
import "./profile.style.css"

class ProfilePageClient extends React.Component{

    constructor(props) {
        super(props);
        this.UserService = new UserService();
    }
    state = {
        id: '',
        username: '',
        password: '',
        email: '',
        registertime: '',
        watchlists: [],
        showPwd: false,

        session:false
    }


    componentDidMount = async () => {

        const profile = await this.UserService.getSession()
        if(profile.username !== "PLEASE LOGIN FIRST"){
            this.setState({
                id: profile.id,
                password: profile.password,
                username: profile.username,
                email: profile.email,
                watchlists: profile.watchlists,
                registertime: profile.registertime,
                showPwd: false,
                session:true
            })
        }
    }

    update = (user) => {
        fetch(`https://infinite-retreat-10652.herokuapp.com/api/users/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        })
    }
    render() {
        return(
            <div className="d-flex flex-column align-items-center bg-white border-bottom shadow-sm">
                <h2>Profile Page</h2>



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

                            <li className="nav-item nav-right" hidden={this.state.username  }>
                                <Link className="" to="/login">
                                    <button className="btn btn-outline-primary">Login</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={this.state.username }>
                                <Link to="/register">
                                    <button className="btn btn-outline-primary">SignUp</button>
                                </Link>
                            </li>
                            <li className="nav-item nav-right" hidden={!this.state.username }>
                                <button className="btn btn-outline-primary" onClick={() => this.logout()}>Logout
                                </button>
                            </li>
                            <li className="nav-item nav-right"  hidden={!this.state.username }>
                                <Link to="/profile">
                                    <button className="btn btn-outline-primary">Profile</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>



                {   this.state.editing &&
                    <div className="form-group row">
                    <label htmlFor="last" className="col-sm-2">
                        username: </label>
                    <div className="col-sm-10">
                        <input className="form-control wbdv-field wbdv-lastname"
                               id="lastName" placeholder=""
                               value={this.state.username}
                               onChange={(e) => this.setState({
                                    username: e.target.value
                               })}
                        />
                    </div>
                        <br/>

                    <label htmlFor="first" className="col-sm-2">
                        email: </label>
                    <div className="col-sm-10">
                        <input className="form-control wbdv-field wbdv-firstname"
                               id="email" placeholder=""
                               value={this.state.email}
                               onChange={(e) => this.setState({
                                   email: e.target.value
                               })}
                        />
                    </div>
                        <label htmlFor="first" className="col-sm-2">
                            password: </label>
                        <div className="col-sm-10 ">
                            <input className="form-control wbdv-field wbdv-firstname"
                                   id="password" placeholder=""
                                   value={this.state.password}
                                   onChange={(e) => this.setState({
                                       password: e.target.value
                                   })}
                            />
                        </div>
                        <button
                            style={{color: 'black'}}
                            className="btn btn-outline-dark"
                            onClick={ () => {
                            this.update(this.state)
                            this.setState({
                                editing: false
                            })
                        }}>Save</button>
                </div>}
                {   !this.state.editing &&
                    <div className="container">
                        <ul className="list-group ">
                            <li className="list-group-item">
                                User Id: {this.state.id}
                            </li>
                            <li className="list-group-item">
                                Username: {this.state.username}
                            </li>
                            <li className="list-group-item">
                                Email: {this.state.email}
                            </li>
                            <li className="list-group-item">
                                password:
                                <a hidden={!this.state.showPwd}>{this.state.password}
                                    <button
                                        style={{color: 'black'}}
                                        className="btn btn-outline-dark float-right"

                                        hidden={!this.state.showPwd}
                                        onClick={() => {
                                            this.setState({
                                                showPwd: false
                                            })
                                        }}>Hide</button>
                                </a>

                                <a hidden={this.state.showPwd}>*******
                                    <button
                                        style={{color: 'black'}}
                                        className="btn btn-outline-dark float-right"
                                        hidden={this.state.showPwd}
                                        onClick={() => {
                                            this.setState({
                                                showPwd: true
                                            })
                                        }}>Show</button>
                                </a>
                            </li>
                            <li className="list-group-item">
                                Register Time: {this.state.registertime}
                            </li>
                        </ul>

                        <Link to = "/watchlist">
                            <button
                                style={{color: 'black'}}
                                className="btn btn-outline-dark">Watchlist</button>
                        </Link>


                        <button
                            style={{color: 'black'}}
                            className="btn btn-outline-dark"
                            onClick={ () => {
                            this.setState({
                                editing: true
                            })
                        }}>Edit</button>
                    </div>
                }



            </div>
        )
    }
}



export default ProfilePageClient
