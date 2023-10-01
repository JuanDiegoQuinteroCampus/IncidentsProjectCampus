import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {Input, Button, Card, CardBody} from "@nextui-org/react";

export default function FormRegister() {
const [register] = useOutletContext();
const [mensaje, setMensaje] = useState("");

    const [cc, setCC] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setEmail] = useState("");

  
    const Document = (e) => {
      setCC(e.target.value);
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
  
    const fetchData = async (e) => {
      
  
  // document.querySelector("#namer").value = '';
  // document.querySelector("#passwordr").value = '';
  // document.querySelector("#cityr").value = '';
  // document.querySelector("#celphoner").value = '';
  try {
    let data = {
      CC: cc,
      username: user,
      password: password,
      email: mail
    };
      
    const response = await fetch(
      `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/users/post`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 200) {
      const responseData = await response.json();
      setMensaje(`Bienvenido, ${data.username}! `);/* Token JWT: ${responseData.jwt} */
      console.log(responseData.jwt);
    } else {
      setMensaje("Credenciales incorrectas");
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
      <div className="w-full h-full flex items-center place-content-center flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4 bglogin" style={{ background: 'linear-gradient(to top right, #FF69B4, #FFFF00)', height: '100vh' }}>
      <Card>
        <CardBody>
          <div className="w-full h-full flex flex-col gap-4 bg-white">
            <h1  className="text-5xl">{register}</h1> 
            <form action="" onSubmit={submit}>
              <div className="flex w-full flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input size="lg" label="Username" placeholder="Enter your Username" type="text"
className="w-7/12" id="namer" onChange={Document}/>
                <Input size="lg" type="password" label="Password" placeholder="Enter your password"
className="w-7/12" id="passwordr" onChange={User}/>
                <Input size="lg" type="text" label="City" placeholder="Enter your City"
className="w-7/12" id="cityr" onChange={Password}/>
                <Input size="lg" type="tel" label="Phone" placeholder="Enter your Cellphone"
className="w-7/12" id="celphoner" onChange={Mail}/>
                <Button radius="lg" type="submit" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Send</Button>
              </div>
            </form>
            <div>
                <h4>{mensaje}</h4>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
      </>
    );
}


