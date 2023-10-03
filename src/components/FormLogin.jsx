import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useOutletContext , useNavigate} from "react-router-dom";
import {Input, Button, Card, CardBody} from "@nextui-org/react";

export default function FormLogin() {
  const [nom, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [login] = useOutletContext();
  const navigate = useNavigate(); 

  const Name = (e) => {
    setNombre(e.target.value);
  };
  const contra = (e) => {
    setPassword(e.target.value);
  };

  const fetchData = async () => {
    try {
      const data = {
        username: nom,
        password: password,
      };
      const response = await fetch(
        `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login`,
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
        localStorage.setItem('token', responseData.jwt);
        localStorage.setItem('user', data.username);
        navigate('/')
      } else {
        setMensaje("Credenciales incorrectas");
      }
      console.log(response);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setMensaje("Error interno del servidor");
    }

    setNombre("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    fetchData(); // Llamar a fetchData() cuando se haga clic en "Enviar"
  };

  return (
    <>
    
    <div className="w-full h-full flex items-center place-content-center flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4 bglogin" style={{ background: 'linear-gradient(to top right, #FF69B4, #FFFF00)', height: '100vh' }}>
      <Card>
        <CardBody>
          <div className="w-full h-full flex flex-col gap-4 bg-white">
            <h1 className="text-5xl">{login}</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex w-full flex-col justify-center items-center md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input size="lg" label="Username" placeholder="Enter your Username" type="text" id="name" className="w-7/12" onChange={Name} value={nom} />
                <Input size="lg" type="password" label="Password" placeholder="Enter your password" id="password" className="w-7/12" onChange={contra} value={password} />
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
