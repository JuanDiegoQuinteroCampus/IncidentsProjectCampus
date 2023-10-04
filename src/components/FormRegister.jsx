import React, { useState } from 'react'
import { useOutletContext, useNavigate , Outlet} from 'react-router-dom'
import {Input, Button, Card, CardBody} from "@nextui-org/react";

export default function FormRegister() {
const [mensaje, setMensaje] = useState("");
const navigate = useNavigate();
console.log("FormRegister se está renderizando");
    const [cc, setCC] = useState(0);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setEmail] = useState("");

  

    const Document = (e) => {
      const ccValue = parseInt(e.target.value, 10); 
    setCC(ccValue);
    };
    const User = (e) => {
      setUser(e.target.value);
    };
    const Password = (e) => {
      setPassword(e.target.value);
    };
    const Mail = (e) => {
      setEmail(e.target.value);
    };
    const [error, setError] = useState(null);
  
    const fetchData = async (e) => {
      

  try {
    let data = {
      CC: cc,
      username: user,
      password: password,
      email: mail
    };
      
    const response = await fetch(
      `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/register/v2/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200 || response.status === 201) {
      const responseData = await response.json();
      setMensaje(`Bienvenido, ${data.username}! `);
      console.log(responseData.jwt);
      navigate('/login');
    } else {
      const errorData = await response.json();
        console.error("Error al agregar el usuario:", errorData);
        setError(`Error al agregar el usuario. Código de respuesta: ${response.status}. Mensaje: ${errorData.message}`);
      }
    console.log(response);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    setMensaje("Error interno del servidor");
  }
     

      setCC('');
      setUser('');
      setPassword('');
      setEmail('');


    };
    const submit = (e) => {
      e.preventDefault();
      fetchData(); 
    };
  
    return (
      <>
      <style>
                {`
                
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    appearance: none;
                    margin: 0;
                }
                `}
            </style>


      <div className="w-full h-full flex items-center place-content-center flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4 bglogin" style={{ background: 'linear-gradient(to top right, #FF69B4, #FFFF00)', height: '100vh' }}>
      <Card>
        <CardBody>
          <div className="w-full h-full flex flex-col gap-4 bg-white">
            <h1  className="text-5xl">Register</h1> 
            <form action="" onSubmit={submit}>
              <div className="flex w-full flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input size="lg" label="CC" placeholder="Enter your cc" type="number"
                  className="w-7/12" id="cc" onChange={Document}/>
                <Input size="lg" type="text" label="Username" placeholder="Enter your username"
                  className="w-7/12" id="user" onChange={User}/>
                <Input size="lg" type="password" label="Password" placeholder="Enter your password"
                  className="w-7/12" id="pass" onChange={Password}/>
                <Input size="lg" type="email" label="Email" placeholder="Enter your email"
                  className="w-7/12" id="email" onChange={Mail}/>
                <Button radius="lg" type="submit" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Send</Button>
              </div>
              {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
            </form>
            <div>
                <h4>{mensaje}</h4>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <Outlet />
    </>
    );
}


