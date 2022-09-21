import React, { useState } from "react";
import { Nav, Navbar, Button, Container, Row, Col } from "react-bootstrap";
import LeftMenu from "./LeftMenu";

const Layout = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <React.Fragment>
            <header className="topmenu">
                <Container>
                    <Row>
                        <Col sm={4} xs={4} className="d-xxl-none d-xl-none d-lg-none d-md-none d-sm-flex">
                            <Navbar collapseOnSelect expand={false}>
                                <Navbar.Toggle className={showMenu ? "ico leftMenuToggle closeMenu" : "ico leftMenuToggle"} onClick={() => setShowMenu(!showMenu)} />
                            </Navbar>
                        </Col>
                        <Col md={4} sm={4} xs={4} className="logoCol">
                            <a href="/" className="logo">
                                <img src="logo.svg" srcSet="logoSmall.svg 768w, logo.svg" alt="Healthpath" className="desk" />
                            </a>
                        </Col>
                        <Col md={8} sm={4} xs={4}>
                            <Nav className="main">
                                <Nav as="ul" className="menu d-xl-flex d-lg-none d-md-none d-sm-none d-none">
                                    <Nav.Link href="#" as="li">
                                        Make recommendations<span>0</span>
                                    </Nav.Link>
                                </Nav>
                                <Nav as="ul">
                                    <Nav.Link href="#" as="li" className="d-lg-block d-md-none d-sm-none d-none">
                                        <Button className="cta" variant="outline-primary">
                                            Add clients
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link href="#" as="li" className="ico mail d-md-block d-sm-none d-none">
                                        <span>4</span>
                                    </Nav.Link>
                                    <Nav.Link href="#" as="li" className="ico basket"></Nav.Link>
                                    <Nav.Link href="#" as="li" className="ico user d-md-block d-sm-none d-none">
                                        <span></span>
                                    </Nav.Link>
                                </Nav>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </header>
            {showMenu && (
                <div className="fromHeader">
                    <LeftMenu />
                </div>
            )}
            {children}
        </React.Fragment>
    );
};

export default Layout;
