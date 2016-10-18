import React, {Component} from 'react';
import Header from './Header';
import MapBase from './MapBase';
import '../res/styles/App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            mysubway: {},
            city: {},
        };

        // this.handleCityBtnClick = this.handleCityBtnClick.bind(this);
        // this.handleCityBtnCancel = this.handleCityBtnCancel.bind(this);
    }

    getMySubway(mysubway, city, resetCity) {
        if (!resetCity) {
            this.setState({
                mysubway: mysubway,
                city: city,
                adcode:'1100'
            });
        } else {
            this.setState({
                mysubway: mysubway,
            });
        }


    }

    selCity(adcode, localName) {
        this.setState({
            adcode: adcode,
        });
    }

    render() {
        return (
            <div className="App">
                {/*<i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>*/}
                {/*<span className="sr-only">Loading...</span>*/}
                {/*<Header mysubway={this.state.mysubway} city={this.state.city}*/}
                        {/*callBackSelCity={this.selCity.bind(this)}/>*/}
                <MapBase adcode={this.state.adcode}
                         callBackMysubway={this.getMySubway.bind(this)}/>
            </div>
        );
    }
}

export default App;
