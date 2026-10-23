// @flow
import React, { useEffect } from 'react'
import { loadCSS } from 'fg-loadcss/src/loadCSS'
import {
  BrowserRouter as Router, Route, Switch, useLocation,
} from 'react-router-dom'
import Home from './components/Home/Home'
import Members from './components/Members/Members'
import SupportUs from './components/SupportUs/SupportUs'
import Candidates from './components/Candidates/Candidates'
import NavBar from './components/NavBar/NavBar'
import About from './components/About/About'
import routesData from './data/routes.json'
import Project from './components/Projects/Projects'
import projectsData from './data/projects.json'
import Footer from './components/Footer/Footer'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const RevealOnScroll = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
    const targets = document.querySelectorAll('main section, footer')
    targets.forEach((el) => {
      el.classList.add('reveal')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pathname])
  return null
}

const App = () => {
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    )
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <RevealOnScroll />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">
        <NavBar routes={routesData.routes} />
        <main className="flex-1">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={() => <Project projectsData={projectsData} />} />
            <Route path="/members" component={Members} />
            <Route path="/candidates" component={Candidates} />
            <Route path="/support-us" component={SupportUs} />
            <Route component={Home} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
