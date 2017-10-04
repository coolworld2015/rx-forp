import React, {Component} from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    clickOnItem() {
        this.props.clickHandle(this.props.item);
    }

    render() {
		var city, payStatus, createDate, updateDate;
		var d = new Date(this.props.item.currency.replace(/(\d\d)(\d\d)(\d\d\d\d)/, '$3-$1-$2'));
		
		if (this.props.item.created) {
			let date = new Date(this.props.item.created)
			createDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
		}		
		
		if (this.props.item.updated) {
			let date = new Date(this.props.item.created)
			updateDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
		}
		
		switch (this.props.item.status) {
            case 'payout': payStatus = 'Выплачен'; break;
            case 'create': payStatus = 'Создан'; break;
		}		
		
		switch (this.props.item.sender.cashdesk.city_id) {
            case '1': city = 'Киев'; break;
            case '2': city = 'Полтава'; break;
            case '3': city = 'Днепр'; break;
		}
		
        return (
			<div className="listItem">
				<div className="phone" onClick={this.clickOnItem.bind(this)}>
					{this.props.item.cashdesk_system_id}
					{' ('}
					{createDate}
					{') ('}						
					{updateDate}
					{') '}
					{city}
					{' - '}					
					{((+this.props.item.amount).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} 
					{' - '}
					{this.props.item.currency} 			
					{' - '}
					{payStatus} 
					
					
				</div>
			</div>
        );
    }
}

module.exports = ListItem;