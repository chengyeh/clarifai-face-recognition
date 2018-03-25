import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import face from './face.png'

const Logo = () => {
	return(
		<div className='ma4'>
			<Tilt className="Tilt br-2 shadow-2 interact" options={{ max : 45, scale: 1.1 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner pa2">
					<img style={{paddingTop: '5px'}} alt='face' src={face} />
				</div>
			</Tilt>
		</div>
	);
};

export default Logo;