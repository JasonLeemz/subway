import React, { Component } from 'react';
import ReactDOM from 'react-dom';
require('../res/gaode.js');

class MapBase extends React.Component {
    constructor() {
        super();
        //相当于getInitialState
        this.state = {}
    }

    componentWillMount() {
        // alert('will');
    }

    componentDidMount() {
        //开启easy模式, 直接完成地铁图基本功能, 无需自己写交互
        window.cbk = function(){
            var mysubway = subway("map-base", {
                easy: 1
            });
        };
    }

    render() {
        return (
            <div id="map-base">
            </div>
        );
    }
}

export default MapBase;