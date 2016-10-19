import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../res/tools/gaode.js');
import '../res/styles/Header.scss';
import '../res/styles/MapBase.scss';
import $ from "jquery";

class MapBase extends React.Component {
    constructor(props) {
        super(props);
        let localName = localStorage['localName'] || false;
        let adcode = localStorage['adcode'] || false;

        navigator.geolocation.getCurrentPosition(
            // showPosition
            (position)=> {
                console.log(position.coords.latitude, position.coords.longitude);
                console.log("position");
                console.log(position);
            },
            // showError
            (error)=> {
                console.log(error);
            },
        );
        this.state = {
            localName: localName,
            adcode: adcode,
            mysubway: {},
            cityList: {},
            lineList: {},
            style_cityList: {display: 'none'},
            style_mask: {display: 'none'},
            style_lineList: {display: 'none'},
            // style: {
            //     cityList: {display: 'none'},
            //     mask: {display: 'none'},
            //     lineList: {display: 'none'},
            // },
        };

    }

    componentWillMount() {
        // alert('will');
    }

    componentDidMount() {
        //开启easy模式, 直接完成地铁图基本功能, 无需自己写交互
        window.cbk = function () {
            let mysubway;
            if (this.state.adcode === false) {
                mysubway = subway("map-base", {
                    easy: 1,
                });
            } else {
                mysubway = subway("map-base", {
                    easy: 1,
                    adcode: this.state.adcode,
                });
            }


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
            style_cityList: {display: 'block'},
        });
    }

    handleCityBtnCancel(e) {
        this.setState({
            style_cityList: {display: 'none'},
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

    handleSelLine(orderId, lineId) {
        this.state.mysubway.showLine(lineId);
        this.setState({
            style_mask: {display: 'none'},
            style_lineList: {display: 'none'},
        });

        // route_close_btn 移除hidden class
        // $(".route_close_btn").removeClass('hidden');

        var $select_obj = document.getElementById('g-select');
        this.state.mysubway.setFitView($select_obj);
        var center = this.state.mysubway.getSelectedLineCenter();
        this.state.mysubway.setCenter(center);
    }

    handleClickLineBtn() {
        if (this.state.style_mask.display === 'none') {
            this.setState({
                style_mask: {display: 'block'},
                style_lineList: {display: 'block'},
            });
        } else {
            this.setState({
                style_mask: {display: 'none'},
                style_lineList: {display: 'none'},
            });
        }
    }

    render() {
        //城市列表
        let cityList = this.state.cityList;
        let cityListDom = [];
        for (var i in cityList) {
            cityListDom.push(<li key={i}
                                 onClick={this.handleSelCity.bind(this, i, cityList[i].name)}>{cityList[i].name}</li>);
        }

        //线路列表
        let lineList = this.state.lineList;
        let lineListDom = [];
        for (var j in lineList) {
            let lineStyle = {
                'background': '#' + lineList[j].color
            };
            lineListDom.push(<li key={j}
                                 onClick={this.handleSelLine.bind(this, j, lineList[j].id)}>
                <span className="line-color" style={lineStyle}> </span>
                <span className="line-name">{lineList[j].name}</span>
            </li>);
        }

        return (
            <div>
                <div className="mask" style={this.state.style_mask} onClick={this.handleClickLineBtn.bind(this)}></div>
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

                <div className="city-list" style={this.state.style_cityList}>
                    <div className="trans-title">
                            <span className="opt-arrow">
                                <i className="fa fa-angle-left" onClick={this.handleCityBtnCancel.bind(this)}> </i>
                            </span>
                        切换城市
                    </div>
                    <ul>
                        {cityListDom}
                    </ul>
                </div>
                <span id="line-tip">
                    <span onClick={this.handleClickLineBtn.bind(this)}>
                        <i className="fa fa-road"> </i>
                        <span className="btn-text">线路</span>
                    </span>
                    <span className="line-list" style={this.state.style_lineList}>
                        <ul>
                            {lineListDom}
                        </ul>
                    </span>
                </span>
                <div id="map-base">

                </div>
            </div>
        );
    }
}

export default MapBase;