import React, { useState } from 'react'
import { useOutletContext, useNavigate , Outlet} from 'react-router-dom'
import { Input, Button, Card, CardContent } from '@mui/material';

export default function FormRegister() {
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const [cc, setCC] = useState(0);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setEmail] = useState('');
  const [error, setError] = useState(null);

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

  const fetchData = async (e) => {
    try {
      let data = {
        CC: cc,
        username: user,
        password: password,
        email: mail,
      };

      const response = await fetch(
        `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/register/v2/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
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
        console.error('Error al agregar el usuario:', errorData);
        setError(
          `Error al agregar el usuario. Código de respuesta: ${response.status}. Mensaje: ${errorData.message}`
        );
      }
      console.log(response);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMensaje('Error interno del servidor');
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

      

      <div
      style={{
        background: 'linear-gradient(to top right, #FF69B4, #FFFF00)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card style={{ width: '400px' }}>
        <CardContent>
          <div className="w-full flex flex-col gap-4 bg-white">
            <h1 className="text-5xl text-center">Register</h1>
            <form onSubmit={submit}>
              <div className="flex flex-col gap-4">
                <Input
                  size="large"
                  label="CC"
                  placeholder="Enter your cc"
                  type="number"
                  value={cc}
                  onChange={Document}
                />
                <Input
                  size="large"
                  label="Username"
                  placeholder="Enter your username"
                  value={user}
                  onChange={User}
                />
                <Input
                  size="large"
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={Password}
                />
                <Input
                  size="large"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={mail}
                  onChange={Mail}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Send
                </Button>
              </div>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </form>
            <div>
              <h4>{mensaje}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
      <Outlet />
    </>
  );
}