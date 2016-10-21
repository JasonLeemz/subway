import React, {Component} from 'react';
import ReactDOM from 'react-dom';
require('../res/tools/gaode_subway.js');
// require('../res/tools/gaode_js.js');
import '../res/styles/Header.scss';
import '../res/styles/MapBase.scss';
import $ from "jquery";
import {Icon} from 'react-fa';

class MapBase extends React.Component {
    constructor(props) {
        super(props);
        // AMap.Geolocation()

        let localName = localStorage['localName'] || false;
        let adcode = localStorage['adcode'] || false;
        this.state = {
            localName: localName,
            adcode: adcode,
            mysubway: {},
            cityList: {},
            lineList: {},
            style_cityList: {display: 'none'},
            style_mask: {display: 'none'},
            style_lineList: {display: 'none'},
            style_searchList: {display: 'none'},

            inputStart: '',
            inputEnd: '',
            inputSearchDirect: 'input_start',
            searchList: []
        };
    }

    componentWillMount() {
        if (!localStorage['localName']) {
            let that = this;
            $.ajax({
                url: 'http://pv.sohu.com/cityjson?ie=utf-8',
                type: "get",
                dataType: 'jsonp',
                complete: function () {
                    console.log(returnCitySN.cname);
                    // localStorage['localName'] = returnCitySN.cname.split('市')[0];
                    // this.state.localName = returnCitySN.cname.split('市')[0];
                    that.setState({
                        localName: returnCitySN.cname.split('市')[0]
                    });
                }
            });
        }
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

                //待开发 文档不全
                // navigator.geolocation.getCurrentPosition(
                //     // showPosition
                //     (position)=> {
                //         console.log(position.coords.latitude, position.coords.longitude);
                //
                //         $.ajax({
                //             url: "http://restapi.amap.com/v3/assistant/coordinate/convert?locations=" + position.coords.longitude + "," + position.coords.latitude + "&coordsys=gps&output=json&key=c442e0ca8916ff1186ba0dc063040040",
                //             type: 'get',
                //             dataType: 'json',
                //             success: function (d) {
                //                 // let stationName = mysubway.getNearStation(d.locations);
                //                 let stationName = mysubway.getNearStation([116.0119343,39.66127144]);
                //                 console.log(d);
                //                 console.log(stationName);
                //
                //                 // mysubway.addInfoWindow('南锣鼓巷');
                //                 // var center = mysubway.getStCenter('南锣鼓巷');
                //                 //
                //                 // mysubway.setCenter(center);
                //
                //                 let detailOpts = {
                //                     type: "circle",
                //                     r: 14,
                //                     customClass: "custom_circle"
                //                 };
                //
                //                 mysubway.addCustomNode(stationName, detailOpts);
                //                 mysubway.addInfoWindow(stationName, {
                //                     isCustom: true,
                //                     content: '<div class="tip_out"><div class="tip"><div class="tip_name">离我最近</div><div class="tip_footer"><span id="triangle-down"></span></div></div>'
                //                 });
                //             }
                //         });
                //     },
                //     // showError
                //     (error)=> {
                //         console.log(error);
                //     },
                // );


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

    handleChangeInputState(inputType) {
        console.log("inputType-" + inputType)

        this.setState({
            style_searchList: {display: 'block'},
            inputSearchDirect: inputType
        }, ()=> {
            ReactDOM.findDOMNode(this.refs.searchInput).focus();
            if (inputType === 'input_start') {
                this.refs.searchInput.value = this.state.inputStart;
            } else {
                this.refs.searchInput.value = this.state.inputEnd;
            }
            console.log("inputSearchDirect-" + this.state.inputSearchDirect)
        });

    }

    handleStationSearch() {
        let keywords = this.refs.searchInput.value;
        // let keywords = event.target.value;
        // console.log(keywords)
        this.state.mysubway.stationSearch(keywords, (d)=> {
            this.setState({
                searchList: d.stationList,
            });
            // console.log(d)
            // if (this.state.inputSearchDirect === 'input_start') {
            //     this.setState({
            //         inputStart: d.stationList,
            //     });
            // } else {
            //     this.setState({
            //         inputEnd: d.stationList,
            //     });
            // }

        });
    }

    handleSearchBtnCancel() {
        this.setState({
            style_searchList: {display: 'none'},
        });
    }

    handleSelectStation(stationName) {

        if (this.state.inputSearchDirect == 'input_start') {
            console.log("input_start-" + stationName)
            this.setState({
                inputStart: stationName,
                style_searchList: {display: 'none'},
                searchList: [],
            }, ()=> {
                this.state.mysubway.setStart(stationName);
                if (this.state.inputStart && this.state.inputEnd) {
                    this.state.mysubway.route(this.state.inputStart, this.state.inputEnd, {
                        closeBtn: true
                    });
                } else {
                    let center = this.state.mysubway.getStCenter(stationName);
                    this.state.mysubway.setCenter(center);
                }
            });
        } else {
            console.log("input_end-" + stationName)
            this.setState({
                inputEnd: stationName,
                style_searchList: {display: 'none'},
                searchList: [],
            }, ()=> {
                this.state.mysubway.setEnd(stationName);
                if (this.state.inputStart && this.state.inputEnd) {
                    this.state.mysubway.route(this.state.inputStart, this.state.inputEnd, {
                        closeBtn: true
                    });
                } else {
                    let center = this.state.mysubway.getStCenter(stationName);
                    this.state.mysubway.setCenter(center);
                }
            });
        }
    }

    handleExchangeStation() {
        let start = this.state.inputStart,
            end = this.state.inputEnd;
        this.setState({
            inputStart: end,
            inputEnd: start,
        }, ()=> {
            this.state.mysubway.setStart(end);
            this.state.mysubway.setEnd(start);

            this.state.mysubway.route(end, start, {
                closeBtn: true
            });
        });
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

        //搜索列表
        let searchList = this.state.searchList;
        let searchListDom = [];
        for (var k in searchList) {
            let labelListDom = [];
            for (var ki in searchList[k].referlines) {
                let lineStyle = {
                    'background': '#' + searchList[k].referlines[ki].color
                };
                labelListDom.push(
                    <label style={lineStyle} key={ki}>{searchList[k].referlines[ki].name}</label>
                );
            }
            searchListDom.push(
                <li key={k} onClick={this.handleSelectStation.bind(this, searchList[k].name)}>
                    <i className="fa fa-subway"> </i>
                    <span className="list-content">
                        <span className="list-station-name">{searchList[k].name}</span>
                        <span className="list-station-refs">
                            {labelListDom}
                        </span>
                    </span>
                    <span className="fa fa-angle-left"> </span>
                </li>
            );
        }


        return (
            <div>
                <div className="mask" style={this.state.style_mask} onClick={this.handleClickLineBtn.bind(this)}></div>
                <div className="header">
                        <span className="opt-arrow">
                            {/*<i className="fa fa-angle-left"> </i>*/}
                        </span>
                    <div className="input-wrap">
                        <input type="text" placeholder="输入起点" className="local-input" ref="input_start" readOnly
                               value={this.state.inputStart}
                               onClick={this.handleChangeInputState.bind(this, "input_start")}/>

                        <span className="opt-swap" onClick={this.handleExchangeStation.bind(this)}>
                            <i className="fa fa-exchange"> </i>
                        </span>
                        <input type="text" placeholder="输入终点" className="local-input" ref="input_end" readOnly
                               value={this.state.inputEnd}
                               onClick={this.handleChangeInputState.bind(this, "input_end")}/>

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

                <div className="search-list" style={this.state.style_searchList}>
                    <div className="search-keywords">
                        <span className="opt-arrow">
                            <i className="fa fa-angle-left" onClick={this.handleSearchBtnCancel.bind(this)}> </i>
                        </span>
                        <div className="input-wrap">
                            <i className="fa fa-search"> </i>
                            <input type="text" className="search-input" ref="searchInput"
                                   onChange={this.handleStationSearch.bind(this)}/>
                        </div>

                        {/*<Icon spin name="spinner" /> 这里也可以这么写 */}
                    </div>
                    <ul>
                        {searchListDom}
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