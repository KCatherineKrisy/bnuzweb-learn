import React, { Component } from 'react';
import Header from './components/header/header'
import FooterItem from './components/footer/footer'

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                    {this.props.children}
                <FooterItem/>   
            </div>
        );
    }
}

export default App;