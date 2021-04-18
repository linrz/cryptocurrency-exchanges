import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import Header from './components/header'
import Footer from './components/footer'
import ExchangesList from './pages/exchange-list'
import ExchangeDetail from './pages/exchange-detail'

import 'antd/dist/antd.css'
import './styles/global.scss'

function App() {
  return (
    <Layout className="main__layout">
      <Layout.Header className="main__header">
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Router>
          <Switch>
            <Route exact path="/">
              <ExchangesList />
            </Route>
            <Route path="/detail/:exchangeId">
              <ExchangeDetail />
            </Route>
          </Switch>
        </Router>
      </Layout.Content>
      <Layout.Footer className="main__footer">
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}

export default App
