import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../res/styles/Header.scss';
// var FontAwesome = require('react-fontawesome');


class Header extends Component {
    render() {
        return (
            <div className="header">
                <span className="opt-arrow">
                    <i className="fa fa-angle-left"></i>
                </span>
                <input type="text" placeholder="输入起点" className="local-input"/>
                <span className="opt-swap">
                    <i className="fa fa-exchange"></i>
                </span>
                <input type="text" placeholder="输入终点" className="local-input"/>
                <span className="local-name">北京</span>
            </div>
        );
    }
}

export default Header;