import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../res/styles/Header.scss';
var FontAwesome = require('react-fontawesome');


class Header extends Component {
    render() {
        return (
            <div className="Header">
                <FontAwesome
                    className='opt-arror'
                    name='angle-left'
                />
                <input type="text" placeholder="输入起点" className="local-input"/>
                <input type="text" placeholder="输入终点" className="local-input"/>
                <span className="local-name">城市</span>
            </div>
        );
    }
}

export default Header;