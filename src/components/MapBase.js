import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../res/tools/gaode.js');
import '../res/styles/Header.scss';
import '../res/styles/MapBase.scss';

class MapBase extends React.Component {
    constructor(props) {
        super(props);
        let localName = localStorage['localName'] || '北京';
        let adcode = localStorage['adcode'] || '1100';

        this.state = {
            localName: localName,
            adcode: adcode,
            mysubway: {},
            cityList: {},
            lineList: {},
            style: {
                cityList: {'display': 'none'}
            },
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
                adcode: this.state.adcode,
            });

            let lineList = {};
            mysubway.event.on("subway.complete", function () {
                //获取所有线路
                mysubway.getLinelist((list)=> {
                    lineList = list;
                });

                this.setState({
                    mysubway: mysubway,
                    lineList: lineList
                });

                // mysubway.addInfoWindow('南锣鼓巷');
                // var center = mysubway.getStCenter('南锣鼓巷');

                // mysubway.setCenter(center);
            }.bind(this));
            // console.log(this.state)
        }.bind(this);


    }

    componentWillReceiveProps() {
    }

    handleCityBtnClick(e) {
        //获取城市列表
        let mysubway = this.state.mysubway;
        mysubway.getCityList((cityList)=> {
            this.setState({
                cityList: cityList
            });
        });

        this.setState({
            style: {
                cityList: {'display': 'block'}
            },
        });
    }

    handleCityBtnCancel(e) {
        this.setState({
            style: {
                cityList: {'display': 'none'}
            },
        });
    }

    handleSelCity(adcode, localName) {
        // this.setState({
        //     localName: localName,
        //     adcode: adcode,
        //     mysubway:subway("map-base", {
        //         easy: 1,
        //         adcode: adcode,
        //     })
        // });
        //
        // this.handleCityBtnCancel();
        localStorage['adcode'] = adcode;
        localStorage['localName'] = localName;
        location.reload();
    }

    render() {
        let cityList = this.state.cityList;
        let LiDom = [];
        for (var i in cityList) {
            LiDom.push(<li key={i}
                           onClick={this.handleSelCity.bind(this, i, cityList[i].name)}>{cityList[i].name}</li>);
        }

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
                    <span className="local-name"
                          onClick={this.handleCityBtnClick.bind(this)}>{this.state.localName}</span>
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

                <span id="opt-float">
                    <i className="fa fa-road" > </i>
                    <div>线路</div>

                </span>
                <div id="map-base">

                </div>
            </div>
        );
    }
}

export default MapBase;