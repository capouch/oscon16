import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router";
import { App } from "neal-react";

// Controller and view modules
import Home from "./Launch.jsx";
import Browse from './Browse'
import Zoom from './Zoom'
import Upload from './Upload'
import SlideShow from './SlideShow.js'

import Header from './Header'
import Footer from './Footer'

class osconSPA extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <App
          googleAnalyticsKey="UA-42490151-3"
          segmentKey="Pd3LXILLoxlOKXi9zWTCyhK2MRvygFhF"
          stripeKey="pk_BkaOyHcEiCFaUiEADe7UH6Wq7D6f7"
          history={ browserHistory }>
          { this.props.children }
        </App>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ osconSPA } history={ browserHistory }>
      <IndexRoute name="home" component={ Home }/>
      <Route path="browse" component= { Browse }/>
      <Route path="zoomer" component= { Zoom }/>
      <Route path="zoomer/:imageId" component={ Zoom }/>
      <Route path="upload" component={ Upload }/>
      <Route path="slides" component={ SlideShow } />
      <Route path="*" component={ Home }/>
    </Route>
  </Router>
), document.getElementById("main"));
