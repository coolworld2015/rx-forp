'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

class Title extends Component {
    constructor(props) {
        super(props);
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
					//<div className="brandname">FORPOST</div>
    render() {
        return (
            <div>
				<center>
				<div className="brandname">FORPOST</div>
				
				<div>
					<img src="./logo.jpg" onClick={this.goToMain.bind(this)} className="logo"/>
				</div>
				</center>
            </div>
        )
    }
}

export default Title;