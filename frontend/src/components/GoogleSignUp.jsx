import {useEffect} from "react";
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import usersActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

export default function GoogleSignUp({country}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const showModal = useSelector(store => store.usersReducer.showModal)

    async function handleCallbackResponse(response){
        let userObject = jwt_decode(response.credential);
        dispatch(usersActions.signUpUser ({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            email: userObject.email,
            password: userObject.sub,
            country: country,
            isAdmin: false,
            from: 'google'
        }))
    }

    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id: '229315010729-djtagn0r8if5t8i0vq10pub18f7kbk23.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            {theme: 'outline', size: 'large'}
        )
        // eslint-disable-next-line
    },[])

    return(
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}