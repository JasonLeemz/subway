import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../res/styles/Header.scss';
// var FontAwesome = require('react-fontawesome');


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: {},
            style: {
                cityList: {'display': 'none'}
            },
        };


        // this.handleCityBtnClick = this.handleCityBtnClick.bind(this);
        // this.handleCityBtnCancel = this.handleCityBtnCancel.bind(this);
    }

    handleCityBtnClick(e) {
        //获取城市列表
        let mysubway = this.props.mysubway;
        mysubway.getCityList((cityList)=> {
            this.setState({
                city: cityList
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

    handleSelCity(adcode,localName){
        this.props.callBackSelCity(adcode,localName);
        this.handleCityBtnCancel();
    }

    render() {
        let mysubway = this.props.mysubway,
            city = this.props.city;

        let cityList = this.state.city;
        let LiDom = [];
        // console.log(cityList);
        for (var i in cityList) {
            LiDom.push(<li key={i} onClick={this.handleSelCity.bind(this,i,cityList[i].name)}>{cityList[i].name}</li>);
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
            </div>
        );
    }
}

export default Header;