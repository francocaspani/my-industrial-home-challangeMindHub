import React, { useState, useEffect } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import axios from "axios";
import '../styles/signUp.css'
import usersActions from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import GoogleSignUp from './GoogleSignUp';
import Box from '@mui/material/Box';


const style = { // estilo para la apertura de la imagen del producto desde la card
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

function SignUp() {

    const [open, setOpen] = useState(false); // variables para el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [countries, setCountries] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const sortedCountries = countries?.map((pais) => pais.name.common).sort();

    const handleSelect = (event) => {
        setSelectedCountry(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userData = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            email: event.target[2].value,
            password: event.target[4].value,
            country: event.target[3].value,
            isAdmin:false,
            from: 'propietary-signup'
        }
        const res = await dispatch(usersActions.signUpUser(userData))
        console.log(res)
        if (res.data.from === 'validator') {
            res.data.message.map((message, index) => toast.error(message.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 7000,
                delay: Number(`${index}000`)
            }))
        } else {
            toast(res.data.message, {
                theme: "dark",
                position: "bottom-left",
                autoClose: 4000,
            })
        }
    }


    return (
        <div className='main-sign'>
            <img alt='img-sign' className='img-sign' src='https://img.freepik.com/fotos-premium/loft-estilo-industrial-balcon-interior-3d-render_269031-362.jpg?w=2000' />
            <div className='container-form'>
                <img alt='img-sign' className='logo-sign' src='https://cdn.discordapp.com/attachments/998343174818889748/998786396615622846/MY-INDUSTRIAL-HOME.png' />
                <div className="container-sign">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <div className="logos">
                                <p className="with">Sign up with: </p>
                                <span onClick={handleOpen}><GoogleIcon /></span>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <Box sx={style} >

                                        <select onChange={handleSelect} className='select-modal' name="country" id="country">
                                            {sortedCountries?.map((everycountry, index) => <option key={index} value={everycountry}>{everycountry}</option>)}
                                        </select>
                                        {selectedCountry && <span><GoogleSignUp country={selectedCountry} /></span>} 
                                    </Box>

                                </Modal>

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
                                    {sortedCountries?.map((pais, id) => (
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
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
