import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { useWeb3React } from "@web3-react/core"
import {Link} from 'react-router-dom'
import { injected } from "./common/Connectors"
import { web3Store } from '../stores/web3Store';
import { Button } from '@material-ui/core'

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  web3Store.setInstance(library)
  web3Store.setActive(active)
  web3Store.setAccount(account)

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Project Name</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{alignItems: 'flex-start'}}>
          <Nav.Item><Nav.Link as={Link} to="/">Buy</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link as={Link} to="/Sell">Sell</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
      <Button onClick = {connect} color="primary">Connect to Metamask</Button>
      {active ? <span style = {{color: "white"}}>Connected with <b style={{color:"white"}}>{account}</b></span> : <span>Not connected</span>}
      <Button onClick={disconnect} color = "secondary">Disconnect</Button>
    </Navbar>
  </Styles>
)
  }