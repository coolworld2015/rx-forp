import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Root from './root';
import Main from './main';

import Payments from '../payments/payments';
import PaymentDetails from '../payments/paymentDetails';

export default (
    <Route path="/" component={Root}>
	
        <IndexRoute component={Main}/>
		<Route path="main" component={Main}/>
		<Route path="payments" component={Payments}/>
		<Route path="payment-details">
            <Route path=":id/:created/:updated/:city/:amount/:status" component={PaymentDetails}/>
        </Route>
    </Route>
);