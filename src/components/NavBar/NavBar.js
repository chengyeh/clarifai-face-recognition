import React from 'react';

const NavBar = () => {
	return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p className='f3 pa3 link underline dim white hover-green pointer'>Sign Out</p>
		</nav>
	);
};

export default NavBar;