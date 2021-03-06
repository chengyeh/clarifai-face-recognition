import React from 'react';
import './ImgLinkForm.css'

const ImgLinkForm = ({ onInputChange, onEnterClick, onButtonClick }) => {
	return(
		<div>
			<p className='f3 white'>
				{'This app will detect the faces in the picture, give it a try!'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5 interact'>
					<input className='f4 pa2 w-70' type='text' onChange={onInputChange} onKeyPress={onEnterClick} />
					<button 
						className='f4 ma1 ph3 pv2 link grow w-30 dib white bg-blue' 
						onClick={onButtonClick}
					>
						Detect
					</button>
				</div>
			</div>
			<p>{'Powered by Clarifai Object Recognition Engine'}</p>
			<p>{'Logo created by Joe Mortell from Noun Project'}</p>
		</div>
	);
};

export default ImgLinkForm;