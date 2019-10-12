import React from 'react';
import {NavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem} from 'reactstrap';

export default function Header() {
  return <>
    <Navbar color="dark" dark expand="md" className="mb-3">
      <NavbarBrand href="/">МПМ Былины</NavbarBrand>

      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink className="nav-link" to="/zones">Зоны</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/characters">Персонажи</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/reagents">Реагенты</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  </>
}
