import React from 'react';

const FormErrors = ({ formErrors, serverError }) => {
	return (
		<div>
		    {
		    	Object.keys(formErrors).map((fieldName, i) => {
			      if(formErrors[fieldName].length > 0) {
			        return (
			          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
			        )        
			      } else {
			        return '';
			      }
		    	})
			}
			{
				serverError ? <p>{serverError}</p> : ''
			}
  		</div>
	);
}

export default FormErrors;