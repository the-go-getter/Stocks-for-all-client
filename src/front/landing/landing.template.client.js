import React from "react";
import "./LandingPageContainer.css"
import id from './dollar.mp4'
import AboutPage from "../about/AboutPage";

class LandingPageContainer extends React.Component{
    constructor(props) {
        super(props);
        this.props = props
    }
    continueAsGuest = () => {
        this.props.history.push("/home");
    };
    login = () => {
        this.props.history.push("/login");
    };
    register = () => {
        this.props.history.push("/register");
    };

    state={
        showAbout: false
    };

    openAboutPage = () =>
        this.setState({
            showAbout: true
        })

    closeAboutPage = () =>
        this.setState({
            showAbout: false
        })

    render() {
        return(
            <div>
                {!this.state.showAbout &&
            <div id = "container-fluid">
                <video playsinline autoPlay muted loop id="bgVideo">
                    <source src={id} type="video/mp4"/>
                </video>
                <div id="header" className="d-flex row">
                    <h1 className="col-3">Stocks4All</h1>
                    <h4 className="col-3 offset-6" onClick= {()=> this.openAboutPage()}>About us</h4>
                </div>
                <div id="access" className="overlay">
                    <button onClick={this.continueAsGuest} className="btn btn-primary">Continue as a guest</button>
                    <button onClick={this.login} className="btn btn-primary">Login now!</button>
                    <button onClick={this.register} className="btn btn-primary">Register as a new user</button>
                </div>

            </div>}

                {this.state.showAbout && <div className= "container-fluid>">
                    <AboutPage/>
                    <button className="btn btn-danger" onClick={() => this.closeAboutPage()}> Back </button>
                </div>
                }
            </div>

        );
    }

} export default LandingPageContainer
