/*
  ** Shell: Search image database; allow for various viewing options
    This will be the user's primary portal into the content
*/

import React from "react"
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router/es"
import { App } from "neal-react"

// Controller and view modules
import Home from "./Launch"
import History from './History'
import Edit from './Edit'
import Asset from './Asset'
import Zoom from './Zoom'
import Upload from './Upload'
import Browse from './Browse'
import PDFViewer from './Newsletter'
import SlideShow from './SlideShow'
// import LoginOut from './Login.js'

// Toplevel CSS
import "../css/main.scss"

// Components rendered on every view
import Header from './Header'
import Footer from './Footer'

// Create toplevel component
class osconSPA extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          history={ browserHistory }>
          { this.props.children }
        </App>
        <Footer/>
      </div>
    )
  }
}

// Render application in main div
ReactDOM.render((
  <Router history = { browserHistory } >
    <Route path = "/" component = { osconSPA } history={ browserHistory } >
      <IndexRoute name ="home" component = { Home } />
      <Route path = "history" component = { History } />
      <Route path = "edit/:imageId" component = { Edit } />
      <Route path = "zoomer" component = { Zoom } />
      <Route path = "zoomer/:imageId" component = { Zoom } />
      <Route path = "asset/:imageId" component = { Asset } />
      <Route path = "upload" component = { Upload } />
      <Route path = "slides" component = { SlideShow } />
      <Route path = "slides/:viewSet" component = { SlideShow } />
      <Route path = "newsletter" component = { PDFViewer } />
      <Route path = "*" component = { Home } />
    </Route>
  </Router>
), document.getElementById("main"))
