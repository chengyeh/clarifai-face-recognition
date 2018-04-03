import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isSignedIn, toggleSignIn }) => {
	if(isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p 
				onClick={() => {toggleSignIn(false)}}
				className='f3 pa3 link underline dim black hover-washed-red pointer interact' 
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Link to='/'>
					<p className='f3 pa3 link underline dim black hover-washed-red pointer interact'>
						Sign In
					</p>
				</Link>
				<Link to='/signup'>
					<p className='f3 pa3 link underline dim black hover-washed-red pointer interact'>
						Sign Up
					</p>
				</Link>
			</nav>
		);
	}
};

export default NavBar;