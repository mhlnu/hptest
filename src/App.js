import React from "react";
import Layout from "./components/Layout";
import LeftMenu from "./components/LeftMenu";
import Foods from "./components/Foods";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
    return (
        <div className="App">
            <Layout>
                <section className="siteContent">
                    <Container>
                        <Row>
                            <Col lg={3} className="d-none d-sm-none d-md-none d-lg-block">
                                <LeftMenu activeItem={6} />
                            </Col>
                            <Col lg={9} md={12}>
                                <Foods />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        </div>
    );
};
export default App;
