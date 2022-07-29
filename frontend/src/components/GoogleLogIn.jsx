import { useEffect } from "react";
import jwt_decode from 'jwt-decode'
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';




export default function GoogleLogIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        const loggedUser = {
            email: userObject.email,
            password: `Aa${userObject.sub}`,
            from: 'Google Account'
        }
        const res = await dispatch(usersActions.logInUser(loggedUser))

        toast(res.data.message, {
            theme: "dark",
            position: "bottom-left",
            autoClose: 4000,
        })
        if (res.data.success) {
            navigate('/index')
        }

    }

    useEffect(() => {
        /* global google */

        google.accounts.id.initialize({
            client_id: '229315010729-djtagn0r8if5t8i0vq10pub18f7kbk23.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        )
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}