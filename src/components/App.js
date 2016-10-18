import React, {Component} from 'react';
import MapBase from './MapBase';
import '../res/styles/App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }


    render() {
        return (
            <div className="App">
                {/*<i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>*/}
                {/*<span className="sr-only">Loading...</span>*/}
                <MapBase />
            </div>
        );
    }
}

export default App;
