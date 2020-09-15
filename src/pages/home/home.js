import React, { Component } from 'react';
import Header from '../../components/header/header'
import HomePage from '../../components/homepage/homepage'
import FooterItem from '../../components/footer/footer'

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <HomePage />
                <FooterItem />   
            </div>
        );
    }
}

export default Home;