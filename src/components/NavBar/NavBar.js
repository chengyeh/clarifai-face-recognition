import React from 'react';

const NavBar = () => {
	return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p className='f3 pa3 link underline dim white hover-dark-red pointer interact'>Sign Out</p>
		</nav>
	);
};

export default NavBar;