import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import '../styles/signUp.css'
import { useNavigate } from "react-router-dom";
import usersActions from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import GoogleLogIn from './GoogleLogIn';
function SignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const HandleSubmit = async (event) => {
        event.preventDefault()
        const loggedUser = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: 'propietary-signup'
        }

        const res = await dispatch(usersActions.logInUser(loggedUser))

        toast(res.data.message, {
            theme: "dark",
            position: "bottom-left",
            autoClose: 4000,
        })
        if (res.data.success) {
            navigate(-1)
        }


    }

  return (
    <div className='main-sign'>
        <img alt='img-sign' className='img-sign' src='https://img.freepik.com/fotos-premium/loft-estilo-industrial-balcon-interior-3d-render_269031-362.jpg?w=2000'/>
        <div className='container-form'>
            <img alt='img-sign' className='logo-sign' src='https://cdn.discordapp.com/attachments/998343174818889748/998786396615622846/MY-INDUSTRIAL-HOME.png'/>
            <div className="container-sign">
                <div className="form">
                    <form onSubmit={HandleSubmit}>
                    <div className="logos">
                        <p className="with">Sign in with:</p>
                        <span><GoogleLogIn/></span>
                        <div >
                        </div>
                        <p className="or">or:</p>
                    </div>
                    <div className="container-input">
                        <input placeholder='Email' type="email" id="loginemail" className="" />
                    </div>
                    <div className="container-input">
                        <input placeholder='Password' type="password" id="loginpassword" className="" />
                    </div>
                    <button type="submit" className="submit" value="submit">
                        Sign in
                    </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignIn