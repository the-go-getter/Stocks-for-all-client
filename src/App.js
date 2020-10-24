import React from 'react';
import logo from './logo.svg';
import LoadContainer from "./container/LoadContainer"
import SearchTemplateClient from "./front/search/search.template.client"
import LoginPageClient from "./front/login/login.template.client"
import './App.css';
import Category1Component from "./front/category/CategoryComponent";
import LandingPageContainer from "./front/landing/landing.template.client";

function App() {
  return (
    <div className="App">
    <LoadContainer/>
    </div>
  );
}

export default App;
