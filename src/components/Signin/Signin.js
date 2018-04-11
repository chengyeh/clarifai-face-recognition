import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FormErrors from '../FormErrors/FormErrors'

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			formErrors: {email: '', password: ''},
		    emailValid: false,
		    passwordValid: false,
		    formValid: false,
		    serverError: ''
		}
	}

	handleUserInput = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({[name]: value, serverError: ''}, () => {
			this.validateField(name, value);
		});
	};

	validateField = (fieldName, value) => {
		let fieldValidationErrors = this.state.formErrors;
  		let emailValid = this.state.emailValid;
  		let passwordValid = this.state.passwordValid;

  		switch(fieldName) {
  			case 'email':
  				emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  				fieldValidationErrors.email = emailValid ? '' : ' is invalid';
  				break;
  			case 'password':
  				passwordValid = value.length >= 6;
  				fieldValidationErrors.password = passwordValid ? '': ' must be at least 6 characters';
  				break;
  			default:
  				break;
  		}

  		this.setState({
  			formErrors: fieldValidationErrors,
  			emailValid,
  			passwordValid
  		}, this.validateForm)
	};

	validateForm = () => {
		this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	};

	onSubmit = (event) => {
		fetch('https://clarifai-face-recognition-api.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id) {
					this.props.loadUser(user);
					this.props.toggleSignIn(true);
				} else {
					this.setState({serverError: 'Invalid emaill address or password.'})
				}
			})
			.catch(console.log);
	};

	render() {
		const { isSignedIn } = this.props;
		const { email, password } = this.state.formErrors;
		const { serverError } = this.state;

		if(isSignedIn) {
			return <Redirect to='/profile' />;
		}

		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center interact">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      {
				      	(email || password || serverError) ?
				      		<div className="f6 ba b--black-10 mw5">
								<FormErrors formErrors={this.state.formErrors} serverError={this.state.serverError} />
					  		</div>
					  	:
					  	<div></div>
				      }
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email"  
				        	id="email" 
				        	onChange={this.handleUserInput}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange={this.handleUserInput}
				        />
				      </div>
				    </fieldset>
				    <div>
				      <button 
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      	type="submit" 
				      	onClick={this.onSubmit} 
				      	disabled={!this.state.formValid}
				      >
				      		Sign in
				      </button>
				    </div>
				    <div className="lh-copy mt3">
					    <Link to='/signup'>
					      <p className="f6 link dim black db underline pointer">
					      	Sign up
					      </p>
					    </Link>  
				    </div>
				  </div>
				</main>
			</article>
		);
	}
};

export default Signin;