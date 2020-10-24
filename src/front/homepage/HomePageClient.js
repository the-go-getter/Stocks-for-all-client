import React from "react";
import {Link} from "react-router-dom";
import UserService from '../../services/UserService'
import AdminService from "../../services/AdminService";
import "./HomePageStyle.css"
import Privacy from "../privacy/Privacy"







class HomePageClient extends React.Component {
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

    logout() {
        //this.UserService.logout();
        this.AdminService.logout();
        this.setState({
            profile: {},
            session: false
        })
    }

    showPrivacy = () =>
        this.setState({
            showPvy: true
        })

    closePrivacy = () =>
        this.setState({
            showPvy: false
        })

    routeToCategory = (catName) => {
        this.props.history.push("/category/" + catName)
    };

    render() {
        return (
            <div className="demo">
                <div className="content">
                    <div id="large-header" className="large-header">
                        <div>

                            {this.state.admin.username}
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" onClick={() => this.props.history.push("/")}>
                                    Stocks4all</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                    <ul className="navbar-nav" style={{width: '100px'}}>
                                        <li className="nav-item active" >
                                            <Link to="/home">
                                                <button className="btn btn-outline-dark">Home</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" hidden={!this.state.admin.username}>
                                            <Link to="/admin">
                                                <button className="btn btn-outline-dark"  >Admin options</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item " hidden={this.state.admin.username}>
                                            <Link to="/watchlist">
                                                <button className="btn btn-outline-dark" >Watchlist</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item" hidden={this.state.admin.username}>
                                            <Link to="/research">
                                                <button className="btn btn-outline-dark" >Research</button>
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
                                            <Link to='/'>
                                                <button className="btn btn-outline-primary"
                                                        onClick={() => this.logout()}>Logout
                                                </button>
                                            </Link>

                                        </li>
                                        <li className="nav-item nav-right"
                                            hidden={!this.state.profile.username || this.state.admin.username}>
                                            <Link to="/profile">
                                                <button className="btn btn-outline-primary">Profile</button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn btn-outline-dark"
                                                    onClick={() => this.showPrivacy()}>Privacy
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </nav>


                            {   !this.state.showPvy &&
                                <div className="container">
                                    <div className=" row">
                                        <div className=" mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("ENG")}>
                                                <div className="card mb-4 shadow-sm">
                                                    <img src="https://img.etimg.com/thumb/width-640,height-480,imgsize-281683,
                                    resizemode-1,msid-74094698/india-may-find-it-difficult-to-meet-175-gw-renewable
                                    -energy-capacity-target-by-2022-says-think-tank.jpg" className="card-img-top"></img>
                                                    <div className="card-body">
                                                        <h5> Energy</h5>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                        <div className="mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("IND")}>
                                                <div className="card mb-4 shadow-sm">
                                                    <img src="https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?
                                    auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="card-img-top"></img>
                                                    <div className="card-body">
                                                        <h5> Industrials </h5>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                        <div className="mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("CONDFEN")}>
                                                <div className="card mb-4 shadow-sm rounded">
                                                    <img
                                                        src="https://miro.medium.com/max/1400/1*lm3Wc-MV-b-zmzxzYPJ4KA.jpeg"
                                                        className="card-img-top"></img>
                                                    <div className="card-body">
                                                        <h5> Consumer Discretionary </h5>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                        <div className="mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("TEC")}>
                                                <div className="card mb-4 shadow-sm">
                                                    <img
                                                        src="https://learn.g2.com/hubfs/What_is_Information_Technology.jpg"
                                                        className="card-img-top"></img>
                                                    <div className="card-body">
                                                        <h5>Technology</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("UTIL")}>
                                                <div className="card mb-4 shadow-sm">
                                                    <img className="card-img-top"
                                                         src="http://www.ccrsurveys.com/wp-content/uploads/Public-Utilities-Market-Research-1.jpg"></img>
                                                    <div className="card-body">
                                                        <h5>Utilities</h5>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                        <div className="mt-3 col-md-4">
                                            <a onClick={() => this.routeToCategory("FINAN")}>
                                                <div className="card mb-4 shadow-sm">
                                                    <img
                                                        src="http://wavesmf.com/wp-content/uploads/2018/05/Mutual-Fund-.jpg"
                                                        className="card-img-top"></img>
                                                    <div className="card-body">
                                                        <h5>Financial</h5>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>}
                            {
                                this.state.showPvy &&
                                <div>
                                    <Privacy/>
                                    <button className="btn btn-danger" onClick={() => this.closePrivacy()}>back</button>

                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default HomePageClient
