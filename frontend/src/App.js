import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavigationBar } from './views/NavigationBar'
import { Sell } from './pages/Sell'
import { Buy } from './pages/Buy'
import { NoMatch } from './NoMatch'

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}><React.Fragment>
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Buy} />
        <Route path="/sell" component={Sell} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </React.Fragment></Web3ReactProvider>
    
  )
}

export default App
