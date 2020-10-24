import React from 'react';
import HomePageClient from '../front/homepage/HomePageClient';
import SearchTemplateClient from '../front/search/search.template.client'
import LoginPageClient from '../front/login/login.template.client'
import RegisterPageClient from '../front/register/register.template.client'

import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LandingPageContainer from "../front/landing/landing.template.client";
import CategoryComponent from "../front/category/CategoryComponent";
import AdminComponent from "../front/admin/AdminComponent"
import WatchlistEditor from '../front/watchlist/WatchlistEditor';
import ProfilePageClient from '../front/profile/profile.template.client';


class LoadContainer extends React.Component {
    render() {
        return (
            <Router>
                <Route
                    path="/"
                    exact={true}
                    component={LandingPageContainer}/>
                <Route
                    path="/research"
                    exact={true}
                    component={SearchTemplateClient
                        //props={this.props}
                    }/>
                <Route
                    path="/login"
                    exact={true}
                    component={LoginPageClient}/>
                <Route
                    path="/register"
                    exact={true}
                    component={RegisterPageClient}
                />
                <Route
                    path="/home"
                    exact={true}
                    component={HomePageClient}/>

                <Route
                    path="/category/:catName"
                    exact={true}
                    component={CategoryComponent}
                />
                <Route
                    path="/admin"
                    exact={true}
                    component={AdminComponent}
                />
                <Route
                    path="/watchlist"
                    exact={true}
                    component={WatchlistEditor}>
                </Route>
                <Route
                    path="/profile"
                    exact={true}
                    component={ProfilePageClient}>
                </Route>
                <Route
                    path="/watchlist/:wid"
                    exact={true}
                    render={(props) =>
                        <WatchlistEditor
                            {...props}
                            watchlistId={props.match.params.wid}/>}>
                </Route>
                <Route
                    path="/watchlist/:wid/stock/:sid"
                    exact={true}
                    render={(props) =>
                        <WatchlistEditor
                            {...props}
                            watchlistId={props.match.params.wid}
                            stockId={props.match.params.sid}/>
                    }>
                </Route>
            </Router>

        )
    }
}

export default LoadContainer
