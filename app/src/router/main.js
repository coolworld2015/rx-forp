'use strict';

import React, {Component} from 'react';
import {hashHistory} from 'react-router';

import Title from '../app/title';

class Main extends Component {
    constructor(props) {
        super(props);
    }
	
	goSearch() {
		hashHistory.push("/search");
	}
	
	goPhones() {
		hashHistory.push("/phones");
	}	
	
	goUsers() {
		hashHistory.push("/users");
	}	
	
	goPayments() {
		hashHistory.push("/payments");
	}
	
	goAudit() {
		hashHistory.push("/audit");
	}
	
	onLogOut() {
        appConfig.onLogOut();
    }
	
    render() {
		return (
			<div>
				<div className="top">
					<div className="header">
						FORPOST
					</div>
				</div>
				
				<div className="middle-menu">
					<hr/>
					<div onClick={this.goPayments.bind(this)} className="items-menu">Payments</div><hr/>
					<div onClick={this.onLogOut.bind(this)} className="items-menu">Logout</div><hr/>
				</div>
			</div>
		)
    }
}

export default Main;