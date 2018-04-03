import React from 'react';

const NavBar = ({ isSignedIn, onRouteChange }) => {
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p 
				onClick={() => {onRouteChange('signin')}}
				className='f3 pa3 link underline dim black hover-washed-red pointer interact' 
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p 
				onClick={() => {onRouteChange('signin')}}
				className='f3 pa3 link underline dim black hover-washed-red pointer interact' 
				>
					Sign In
				</p>
				<p 
				onClick={() => {onRouteChange('signup')}}
				className='f3 pa3 link underline dim black hover-washed-red pointer interact' 
				>
					Sign Up
				</p>
			</nav>
		);
	}
};

export default NavBar;