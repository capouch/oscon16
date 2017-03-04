/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/

import React from "react"
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

// neal-react is an example React application template
import { App } from "neal-react"

// Controller and view modules
import Home from "./Launch"
import Browse from './Browse'
import Edit from './Edit'
import Asset from './Asset'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow'
// import LoginOut from './Login.js'

// Toplevel CSS
import "../css/main.scss"

// Components rendered on every view
import Header from './Header'
import Footer from './Footer'

// Render application in main div - upgraded for react-route v4
ReactDOM.render((
  <Router>
    <div>
      <Route component = { Header } />
      <Route component = { App } />
      <Switch>
        <Route exact path = '/' component = { Home } />
        <Route path = "/home" component = { Home } />
        <Route path = "/browse" component = { Browse } />
        <Route path = "/edit/:imageId" component = { Edit } />
        <Route path = "/zoomer/:imageId" component = { Zoom } />
        <Route path = "/asset/:imageId" component = { Asset } />
        <Route path = "/upload" component = { Upload } />
        <Route exact path = "/slides" component = { SlideShow } />
        <Route path = "/slides/:viewSet" component = { SlideShow } />
      </Switch>
      <Route component = { Footer } />
    </div>
  </Router>
), document.getElementById("main"))
