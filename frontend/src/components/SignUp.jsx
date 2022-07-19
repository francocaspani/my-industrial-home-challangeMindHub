import React, { useState, useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import axios from "axios";
import '../styles/signUp.css'

function SignUp() {

    const [paices, setpaices] = useState(null);

    useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all").then((response) => {
        setpaices(response.data);
      });
    }, []);
  
    const paicesOrdenados = paices?.map((pais) => pais.name.common).sort();

  return (
    <div className='main-sign'>
        <img className='img-sign' src='https://img.freepik.com/fotos-premium/loft-estilo-industrial-balcon-interior-3d-render_269031-362.jpg?w=2000'/>
        <div className='container-form'>
            <img className='logo-sign' src='https://cdn.discordapp.com/attachments/998343174818889748/998786396615622846/MY-INDUSTRIAL-HOME.png'/>
            <div className="container-sign">
                <div className="form">
                    <form>
                    <div className="logos">
                        <p className="with">Sign up with: </p>
                        <GoogleIcon/>
                        <div >
                        </div>
                        <p className="or">or:</p>
                    </div>
                    <div className="container-input">
                        <input placeholder='First Name' type="text" id="loginName" className="" />
                    </div>
                    <div className="container-input">
                        <input placeholder='Last Name' type="text" id="loginlastName" className="" />
                    </div>
                    <div className="container-input">
                        <input placeholder='Email' type="email" id="loginemail" className="" />
                    </div>
                    <div className="container-input">
                        <select className="country-select">
                        <option className="option">Country</option>
                        {paicesOrdenados?.map((pais, id) => (
                            <option className="option" key={id} value={pais}>
                            {pais}
                            </option>
                        ))}
                        </select>
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

export default SignUp
