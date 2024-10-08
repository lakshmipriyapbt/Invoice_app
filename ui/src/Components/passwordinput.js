import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
      />
      <button onClick={togglePasswordVisibility} className="password-toggle">
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export default PasswordInput;



/*import React,{useState} from "react";
import{ FontAwesomeIcon }from "@fortawesome/react-fontawesome";

const UserpasswordToggle = () =>{
    const [visible, setVisiblity] = useState (true);

    const Icons = (<FontAwesomeIcon icon ={visible ? "eye-slash" :"eye"} onClick={() => setVisiblity(visiblity => !visiblity)}/>);
    const inputtype = visible ? "text" :"password";

    


    return[inputtype  , Icons]
        


    
}
export default UserpasswordToggle;*/