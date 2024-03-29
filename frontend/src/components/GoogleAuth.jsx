import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'

const GoogleAuth = ({country}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        const userData = {
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            email: userObject.email,
            password: `Aa${userObject.sub}`,
            isAdmin:false,
            country: country,
            from: 'Google Account'
        }; 
        const res = await dispatch(usersActions.signUpUser(userData));
        if (res.data.success) {
            navigate('/signin')
        }

    }

    useEffect(()=> {
    /* global google */
        google.accounts.id.initialize({
            client_id: '229315010729-djtagn0r8if5t8i0vq10pub18f7kbk23.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium", locale:'en', shape:"pill",  }
            )
    })
// type: "icon"
  return (
    <div>
        <div id='buttonDiv'></div>
    </div>
  )
}

export default GoogleAuth