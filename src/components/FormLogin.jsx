import React, { useState } from 'react';
import { Input, Button, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function FormLogin() {
  const [nom, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status === 200) {
        const responseData = await response.json();
        setMensaje(`Bienvenido, ${data.username}! `); /* Token JWT: ${responseData.jwt} */
        localStorage.setItem('token', responseData.jwt);
        localStorage.setItem('user', data.username);
        navigate('/');
      } else {
        setMensaje('Credenciales incorrectas');
      }
      console.log(response);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setMensaje('Error interno del servidor');
    }

    setNombre('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    fetchData(); 
  };

  return (
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
            <h1 className="text-5xl text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <Input
                  size="large"
                  label="Username"
                  placeholder="Enter your Username"
                  type="text"
                  id="name"
                  fullWidth
                  onChange={Name}
                  value={nom}
                />
                <Input
                  size="large"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  id="password"
                  fullWidth
                  onChange={contra}
                  value={password}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Send
                </Button>
              </div>
            </form>
            <div>
              <h4>{mensaje}</h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
