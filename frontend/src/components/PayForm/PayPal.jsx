import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; //Importamos el npm
import basketActions from "../../redux/actions/basketActions";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

export default function PayPal(props) {
    //const [{basket},dispatch] = useStateValue(); //traemos la info de nuestro carrito de compra
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [reload, setReload] = useState(false)
    const [ErrorMessage, setErrorMessage] = useState("");
    const [basketReload, setBasketReload] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(store => store.usersReducer.userData)
    useEffect(() => {
        if (user) {
            dispatch(basketActions.getUserBasket())
        }
    }, [basketReload, user,reload])

    const basket = useSelector(store => store.basketReducer.productsBasket)
    let total = props.total


    // console.log(1, orderID);
    // console.log(2, success);
    // console.log(3, ErrorMessage);  

    useEffect(() => {

        PayPalCheckOut()//LLamo al cdn de PayPal cada vez que cambia el carrito

    }, [basket]);

    const initialOptions = { // Genero las opciones para enviarle al CDN
        "client-id": "AVumqPVe0jQsR2kV4469ZFXlK_if_Vmb46tuFyWN4_QJgWAin2z26Obz8EY5dL2T1U1LpqJ_UNlJ9yR7",
        currency: "USD", //Establesco la moneda
        intent: "capture", //Estableco el metodos este autoriza la operacion y captura los fondos

    };

    const createOrder = (data, actions) => {
        //Creo la orden de con los datos, esta puede ser general o con detalle de items
        return actions.order.create({
            //     purchase_units: [

            //         {
            //             description: "items",
            //             amount: {
            //                 value: total,
            //             },

            //         },


            //     ],
            // })


            purchase_units: [{
                description: "Deco Home",
                amount: {
                    currency_code: "USD",
                    value: `${total}`,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: `${props.subTotal}`
                        },
                        shipping: {
                            currency_code: "USD",
                            value: `${props.shipping}`
                        }
                    }
                },
                items: basket.map((eachProduct) => {

                    return ({
                        name: eachProduct.productId.name,
                        unit_amount: {
                            currency_code: "USD",
                            value: `${eachProduct.productId.price}`
                        },
                        sku: eachProduct._id,
                        quantity: `${eachProduct.amount}`,
                    })
                }),
                shipping: {
                    method: "United States Postal Service",
                    address: {
                        name: {
                            full_name: `${user.firstName}`,
                            surname: `${user.lastName}`
                        },
                        address_line_1: "123 Townsend St",
                        address_line_2: "Floor 6",
                        admin_area_2: "San Francisco",
                        admin_area_1: "CA",
                        postal_code: "94107",
                        country_code: "US"
                    }
                }
            }]

        });
    };

    

    const onApprove = (data, actions) => { //recibo el resultado de mi operacion
        return actions.order.capture()
            .then(function (details) {
                const { payer } = details;
                setSuccess(true);
                console.log('Capture result', details, JSON.stringify(details, null, 2)); //veo los datos en consola
                var transaction = details.purchase_units[0].payments.captures[0];
                // alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
                console.log(details)
                setOrderID(transaction.id)
                
                details && details.purchase_units[0].items.map(bougth => {                    
                    dispatch(basketActions.modifyState(bougth.sku, "bought"))                   
                    dispatch(basketActions.modifyStock(bougth.sku))
                })
                .then(dispatch(basketActions.getProduct(details.purchase_units[0].amount)),
                    setTimeout(() => {
                        details && details.purchase_units[0].items.map(bougth => {                    
                            dispatch(basketActions.modifyState(bougth.sku, "toShip")) 
                        })
                        navigate(`/thanks/${transaction.id}`)
                    }, 3000));

                setReload(!reload)
            });
    };

    const onCancel = (data) => {
        console.log('You have cancelled the payment!', data);
    }

    const onError = (data, actions) => { //Capturo error en caso de que exista
        setErrorMessage("An Error occured with your payment ");
    };

    const PayPalCheckOut = () => {
        return (
            <PayPalScriptProvider className='paypal-butt' options={initialOptions}> {/*Inicializo el CDN*/}

                {/*Inicializo los botones*/}
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />
            </PayPalScriptProvider>
        )
    }
    return (
        <PayPalCheckOut />
    );
}
