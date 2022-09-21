import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Card, Button, InputGroup, FormControl } from "react-bootstrap";
import EmptyTab from "./EmptyTab";
import FilterDropdown from "./FilterDropdown";
import useData from "./../api/data";

const Foods = () => {
    const [loading, error, list] = useData();
    const [activeTab, setActiveTab] = useState(0);
    const [foods, setFoods] = useState([]);
    const [category, setCategory] = useState("");
    // const [foodCat, setFoodCat] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const tags = list
        .reduce((acc, item) => {
            let tags = item.tags.map(item => {
                return item.toLowerCase();
            });
            return [...acc, ...tags];
        }, [])
        .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
        });

    useEffect(() => {
        setFoods(list);
    }, [list]);

    const handleTabChange = e => {
        let val = parseInt(e.target.dataset.id);
        setActiveTab(val);
    };

    const setFilter = val => {
        const filtered = list.filter(item => {
            if (val === "") return item;
            return item.tags.includes(val);
        });
        setCategory(val);
        setFoods(filtered);
    };

    useEffect(() => {
        if (searchTerm.length > 2) {
            let filtered = list.filter(obj => Object.keys(obj).some(key => obj[key].toString().toLowerCase().indexOf(searchTerm) !== -1));
            setFoods(filtered);
        } else {
            setFoods(list);
        }
    }, [searchTerm]);

    const renderTabNav = () => {
        let list = [
            { name: "Catalogue", slug: "catalogue", id: 0 },
            { name: "My Meal Plans", slug: "user1", id: 1 },
            { name: "Recommendations", slug: "plus1", id: 2 },
        ];
        return (
            <React.Fragment>
                <div className="tabNav">
                    {list.map((item, index) => {
                        let cssClass = parseInt(activeTab) === item.id ? "tabItem active " + item.slug : "tabItem " + item.slug;
                        return (
                            <div aria-label={item.name} className={cssClass} key={index} data-id={item.id} onClick={e => handleTabChange(e)}>
                                <span>
                                    <img alt={item.name} src={"/svg/" + item.slug + ".svg"} />
                                </span>
                                {item.name}
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        );
    };

    const renderFilterOptions = () => {
        return (
            <React.Fragment>
                <Col md={7} sm={12} xs={12} className="filtersCol">
                    <FilterDropdown name="Category" active={category} options={tags} setFilter={setFilter} />
                    {/* Going to use the same function and an empty array, as I've no idea what "Foods" is supposed to hold */}
                    <FilterDropdown name="Foods" active={category} options={[]} setFilter={setFilter} />
                </Col>
                <Col md={5} sm={12} xs={12}>
                    <FormControl value={searchTerm} className="searchBar" type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
                </Col>
            </React.Fragment>
        );
    };

    const renderResults = () => {
        return (
            <React.Fragment>
                <Col sm={12} className="filterOptions">
                    {renderFilterOptions()}
                </Col>
                <Row className="results">
                    {foods.map(item => {
                        return (
                            <Col sm={12} md={6} lg={4} key={item.id}>
                                <Card className="foodCard">
                                    <Card.Subtitle>
                                        {item.tags.map((tag, i, row) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    {tag} {i + 1 !== row.length && ", "}
                                                </React.Fragment>
                                            );
                                        })}
                                    </Card.Subtitle>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                    <Button>Recommend</Button>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </React.Fragment>
        );
    };

    if (loading) {
        return (
            <div className="loading">
                <Spinner animation="grow" />
            </div>
        );
    }
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <Row className="content">
            <Col sm={6} className="contentHeader">
                <h1>Foods</h1>
                <p>Here you can recommend foods</p>
            </Col>
            <Col sm={6}>
                <a href="#home" className="addNew">
                    Create meal plan
                </a>
            </Col>
            <Col sm={12} className="tabbed">
                {renderTabNav()}
            </Col>
            {activeTab === 0 && renderResults()}
            {activeTab === 1 && <EmptyTab text="My meal plans" />}
            {activeTab === 2 && <EmptyTab text="Recommendations" />}
        </Row>
    );
};

export default Foods;
