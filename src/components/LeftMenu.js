import React from "react";
import { Nav } from "react-bootstrap";

const LeftMenu = ({ activeItem }) => {
    // assume the active item is fed via props/Context/redux/smth

    let items = ["Dashboard", "Clients", "Invitations", "Tests", "Supplements", "Consultations", "Foods", "Resources", "Community", "Messaging", "Commissions"];
    // assume the items are fed via props or are fetched from a database

    return (
        <Nav className={"leftMenu"} as="ul">
            {items.map((item, index) => {
                return (
                    <Nav.Link key={index} className={index === activeItem && "active"} as="li">
                        <a href="#home">
                            <span className={"ico"}>
                                <img alt={item} src={"/svg/" + item.toLowerCase() + ".svg"} />
                            </span>
                            {item}
                        </a>
                    </Nav.Link>
                );
            })}
        </Nav>
    );
};

export default LeftMenu;
