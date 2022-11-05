import React from "react";
import { Dropdown } from "react-bootstrap";

const FilterToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        className="filterToggle"
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const FilterDropdown = ({ name, active, options, setFilter }) => {
    let items = [{ text: "All", value: "" }];
    for (let i in options) {
        items.push({ text: options[i].charAt(0).toUpperCase() + options[i].slice(1), value: options[i] });
    }
    return (
        <Dropdown className="filterDropdown">
            <Dropdown.Toggle as={FilterToggle} id="dropdown-filter">
                {name} <span className="selectedVal">{active === "" ? "All" : active}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {items.map((item, index) => {
                    return (
                        <Dropdown.Item key={index} eventKey={index.toString()} active={active === item.value} onClick={() => setFilter(item.value)}>
                            {item.text}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default FilterDropdown;
