import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import '../styles/signUp.css'

function SignIn() {

  return (
    <div className='main-sign'>
        <img className='img-sign' src='https://img.freepik.com/fotos-premium/loft-estilo-industrial-balcon-interior-3d-render_269031-362.jpg?w=2000'/>
        <div className='container-form'>
            <img className='logo-sign' src='https://cdn.discordapp.com/attachments/998343174818889748/998786396615622846/MY-INDUSTRIAL-HOME.png'/>
            <div className="container-sign">
                <div className="form">
                    <form>
                    <div className="logos">
                        <p className="with">Sign in with:</p>
                        <GoogleIcon/>
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