// @flow
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Nav, Footer, ScrollToTop } from './redesign/Chrome'
import Home from './redesign/pages/Home'
import About from './redesign/pages/About'
import Projects from './redesign/pages/Projects'
import Members from './redesign/pages/Members'
import Candidates from './redesign/pages/Candidates'
import SupportUs from './redesign/pages/SupportUs'

const App = () => (
  <Router>
    <ScrollToTop />
    <div className="rb-app">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/members" component={Members} />
        <Route path="/candidates" component={Candidates} />
        <Route path="/support-us" component={SupportUs} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>
)

export default App
