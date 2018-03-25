import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ imageUrl, boundingBoxes }) => {
	const image = imageUrl !== '' ?
					<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
					: [];
//<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
	const rows = boundingBoxes.length > 0 ?
					(boundingBoxes.map((box, i) => {
						const { topRow, leftCol, bottomRow, rightCol } = box;
						return(
							<div 
							key={i}
							className='bounding-box' 
							style={{top: topRow, left: leftCol, bottom: bottomRow, right: rightCol}}>
							</div>
						);
					}))
					: [];
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				{image}
				{rows}
			</div>
		</div>
	);
};

export default FaceDetection;