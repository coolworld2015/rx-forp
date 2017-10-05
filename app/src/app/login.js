'use strict';

import React, {Component} from 'react';
import Title from '../app/title';

class Login extends Component {
    constructor(props) {
        super(props);
		
		this.state = {
            showProgress: false,
            username: '',
            password: ''
        }
    }
	
	componentDidMount() {
		this.refs.username.value = '';
		this.refs.password.value = '';
	}
	
    onLogin() {
        if (this.state.username == undefined || this.state.username == '' ||
            this.state.password == undefined || this.state.password == '') {
            this.setState({
                badCredentials: true
            });
            return;
        }

        this.setState({
            showProgress: true
        });
		
		setTimeout(function(){ this.props.onLogin()}.bind(this), 1000);
		
		return;

        fetch(window.appConfig.url + 'api/login', {
            method: 'post',
			body: JSON.stringify({
                name: this.state.username,
                pass: this.state.password,
				description: 'Android'
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response)=> response.json())
            .then((responseData)=> {
                if (responseData.token) {
					appConfig.access_token = responseData.token;					
                    this.setState({
                        badCredentials: false
                    });

                    this.props.onLogin();

                } else {
                    this.setState({
                        badCredentials: true,
						showProgress: false
                    });
                }
            })
            .catch((error)=> {
                this.setState({
                    badCredentials: true,
					showProgress: false
                });
            })
    }

    onLoginPressed() {
		if (this.state.name == undefined ||
            this.state.name == '') {
            this.setState({
                badCredentials: true
            });
            return;
        }
		
		appConfig.socket.name = this.state.name;
        this.props.onLogin();
    }

    render() {
        var errorCtrl, loading;

        if (this.state.badCredentials) {
            errorCtrl = <div className="valid">
                That username and password combination did not work.
            </div>;
        }
		
        if (this.state.showProgress) {
            loading = <div className="loading-header">
                <span>Loading...</span>
            </div>;
        }

        return (
            <div>
				<center>
				<Title/> 
				
				<div className="header">Login</div>
				<br/> 

				<div className="login">
					<div>
						<input type="text" 
							className="input"
							ref="username"
							onChange={(event) => {
								this.setState({
									username: event.target.value,
									badCredentials: false
								})
							}}
							placeholder="Login"/>
					</div>
					<hr className="splitter"/>
					<div>
						<input type="password" 
							className="input"
							ref="password"
							onChange={(event) => {
								this.setState({
									password: event.target.value,
									badCredentials: false
								})
							}}
							placeholder="Password"/>
					</div>
				</div>
				
                <div onClick={this.onLogin.bind(this)}>
					<br/>
					<button className="button">Login</button>
					<br/>
					<br/>
                </div>
				
                {errorCtrl}
                {loading}
				</center>
            </div>
        )
    }
}

export default Login;