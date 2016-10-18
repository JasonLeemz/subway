import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../res/tools/gaode.js');
import '../res/styles/MapBase.scss';

class MapBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localName: '北京',
            adcode: '1100',
            mysubway: {},
        };
    }

    componentWillMount() {
        // alert('will');
    }

    componentDidMount() {
        //开启easy模式, 直接完成地铁图基本功能, 无需自己写交互
        window.cbk = function () {
            let mysubway = subway("map-base", {
                easy: 1,
                adcode: this.state.adcode
            });
            this.setState({
                mysubway: mysubway,
            });

            let city = {
                localName: this.state.localName,
                adcode: this.state.adcode,
            };
            this.props.callBackMysubway(mysubway, city);

            //
            // mysubway.event.on("subway.complete", function () {
            //     mysubway.addInfoWindow('南锣鼓巷');
            //     var center = mysubway.getStCenter('南锣鼓巷');
            //
            //     mysubway.setCenter(center);
            // });
            // console.log(this.state)
        }.bind(this);
    }

    componentWillReceiveProps() {
        this.forceUpdate();
        // console.log(this.props.city.adcode)
        // this.setState({
        //     adcode:this.props.city.adcode
        // });
        // window.cbk = function () {
        //     let mysubway = subway("map-base", {
        //         easy: 1,
        //         adcode: this.state.adcode
        //     });
        // }.bind(this)

    }

    render() {
        // let adcode = this.props.city.adcode;
        // let thisSubway = subway;
        // if(adcode !== this.state.adcode){
        //     let mysubway = thisSubway("map-base", {
        //         easy: 1,
        //         // adcode: this.state.adcode
        //     });
        //     console.log(adcode);
        // }

        return (
            <div>
                <div className="header">
                        <span className="opt-arrow">
                            {/*<i className="fa fa-angle-left"> </i>*/}
                        </span>
                    <div className="input-wrap">
                        <input type="text" placeholder="输入起点" className="local-input"/>
                        <span className="opt-swap">
                            <i className="fa fa-exchange"> </i>
                        </span>
                        <input type="text" placeholder="输入终点" className="local-input"/>
                    </div>
                    <span className="local-name" onClick={this.handleCityBtnClick.bind(this)}>{city.localName}</span>
                </div>

                <div className="city-list" style={this.state.style.cityList}>
                    <div className="trans-title">
                            <span className="opt-arrow">
                                <i className="fa fa-angle-left" onClick={this.handleCityBtnCancel.bind(this)}> </i>
                            </span>
                        切换城市
                    </div>
                    <ul>
                        {LiDom}
                    </ul>
                </div>

                <div id="map-base">

                </div>
            </div>
        );
    }
}

export default MapBase;