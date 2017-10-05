import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import Title from '../app/title';

class PaymentDetails extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
			id: this.props.routeParams.id,
			name: this.props.routeParams.name,
			showProgress: false
		}
		//console.log(this.props.routeParams);
    }
	
    deleteItem() {
        this.setState({
            showProgress: true
        });

        fetch(appConfig.url + 'api/users/delete', {
            method: 'post',
            body: JSON.stringify({
                id: this.props.routeParams.id,
				authorization: appConfig.access_token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				if (responseData.text) {
					appConfig.users.refresh = true;
					hashHistory.push("/users");
				} else {
					this.setState({
						badCredentials: true
					});
				}
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            }) 
    }
	
	goBack() {
		hashHistory.push("/payments");
	}
	
    render() {
		let loading, city, payStatus, createDate, updateDate;
		
		if (this.props.routeParams.created) {
			let date = new Date(+this.props.routeParams.created);
			createDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
		}		
		
		if (this.props.routeParams.updated) {
			let date = new Date(+this.props.routeParams.updated);
			updateDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
			console.log(date)
		}
		
		switch (this.props.routeParams.status) {
            case 'payout': payStatus = 'Выплачен'; break;
            case 'create': payStatus = 'Создан'; break;
		}		
		
		switch (this.props.routeParams.city) {
            case '1': city = 'Киев'; break;
            case '2': city = 'Полтава'; break;
            case '3': city = 'Днепр'; break;
		}
		
		if (this.state.showProgress) {
            loading = <div className="loading">
                <span>Loading...</span>
            </div>;
        }
		
        return (
			<div>
				<center>
				<div className="header">
					Payment details
				</div>
				<hr/>
				<br/>
 
				
				<div className="payment-details">
					<br/>
						ID: {this.props.routeParams.id}<br/>
						Created: {createDate}<br/>
						Updated: {updateDate}<br/>
						City: {city}<br/>
						Amount: {((+this.props.routeParams.amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} <br/>
						Status: {payStatus}
					<br/><br/>
				</div>
				
				{loading}
				
				<div className="showButtons1">
					<center>
					<br/>
					<hr/>
					<br/>
					<button className="button"
						onClick={this.goBack.bind(this)}>
						Submit
					</button>
	
					<button className="button"
						onClick={this.goBack.bind(this)}>
						Back
					</button>
					<br/>
					<br/>
					</center>
				</div>
				
				</center>				
			</div>		
        );
    }
}

export default PaymentDetails;