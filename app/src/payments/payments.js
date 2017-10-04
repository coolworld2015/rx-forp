import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import ListItem from './listItem';
import Title from '../app/title';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
            items: appConfig.users.items.slice(0, 20),
			filteredItems: appConfig.users.items,
			resultsCount: 0,
            recordsCount: 20,
            positionY: 0
        };
    }
	
	componentDidMount() {
		this.getItems();
	}
	
	handleScroll() {
		var position = document.querySelector('.middle').scrollTop;
        var items, positionY, recordsCount;
        recordsCount = this.state.recordsCount;
        positionY = this.state.positionY;
		items = this.state.filteredItems.slice(0, recordsCount);
		
		if (position > positionY) {
			console.log(items.length);
			console.log(position);
            this.setState({
                items: items,
                recordsCount: recordsCount + 10,
                positionY: positionY + 500
            });
        }
	}
	
    onChangeText(e) {
		var text = e.target.value;
        var arr = [].concat(appConfig.users.items);
        var items = arr.filter((el) => el.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
        this.setState({
            items: items,
            resultsCount: items.length,
            filteredItems: items,
            searchQuery: text
        })
    }
		
	clearSearchQuery() {
		this.refs.search.value = '';
		this.setState({
			items: appConfig.users.items.slice(0, 20),
            resultsCount: appConfig.users.items.length,
            filteredItems: appConfig.users.items,
			positionY: 0,
			recordsCount: 20
		});
	}
	
    getItems() {
		this.setState({
            showProgress: true
        });
		
        fetch('http://10.18.10.8:3000/payment/listall', {			
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'}
        })
            .then((response)=> response.json())
            .then((responseData)=> {
				console.log(responseData)
                this.setState({
                    items: responseData,
                    filteredItems: responseData,
                    resultsCount: responseData.length,
					showProgress: false
                });
            })
            .catch((error)=> {
                this.setState({
                    serverError: true,
					showProgress: false
                });
            })
    }
	
	sort(a, b) {
		var nameA = a.amount.toLowerCase(), nameB = b.amount.toLowerCase();
		if (nameA < nameB) {
			return -1
		}
		if (nameA > nameB) {
			return 1
		}
		return 0;
	};
		
    makeItems() {
        return this.state.items.map((item) => {
            return (
                <ListItem
                    key={item.cashdesk_system_id}
                    item={item}
                    clickHandle={this.clickHandle.bind(this)}/>
            )
        })
    }

    clickHandle(item) {
		appConfig.users.item = {
			id: item.id,
			name: item.name,
			pass: item.pass,
			description: item.description
		};
        hashHistory.push("/payment-details/");
    }
    
	goAdd() {
        hashHistory.push("/payment-add/");
    }
	
	goToMain() {
		hashHistory.push("/main");
	}
	
    render() {
		var errorCtrl, loading;

        if (this.state.serverError) {
            errorCtrl = <div className="error">
				Something went wrong.
            </div>;
        }
		
        if (this.state.showProgress) {
            loading = <div className="loading-header">
                <span>Loading...</span>
            </div>;
        }
		
        return (
            <div>
				<div className="top">
					<div className="header" onClick={this.clearSearchQuery.bind(this)}>
						Payments ({this.state.resultsCount})
					</div>
					
					<div>
						<input type="text" className="search"
							ref="search"
							onChange={this.onChangeText.bind(this)}
							placeholder="Search here"
						/>
					</div>
				</div>
				
				{loading}
				
				<div onScroll={this.handleScroll.bind(this)} 
					className="middle">
					{this.makeItems()}
				</div>
									
				<div className="bottom">
					<center>
					<hr/>
					{errorCtrl}
					<br/>
					<button className="button"
						onClick={this.goToMain.bind(this)}>
						Back
					</button>
					<br/>
					<br/>
					</center>
				</div>

            </div>
        )
    }
}

export default Payments;