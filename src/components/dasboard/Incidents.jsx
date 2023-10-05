import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import img from '../../assets/home.jpg';


export default function Incidents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = createTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://${import.meta.env.VITE_HOSTNAME}:${
            import.meta.env.VITE_PORT_BACKEND
          }/incidents/v2/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api": "1.1",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener datos de la API");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const fondo = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"column"
  };

  const cardStyle = {
    marginBottom: "16px", 
    flex: "0 0 calc(25% - 16px)", 
    display: "flex",
    flexDirection: "column", 
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row", // 
    },
    flex: "wrap",
  };

  const contentStyle = {
    flex: 1,
    padding: "15px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#B1D4E0",
    
  };

  const styleTitle = {
    fontSize: "30px",
  };

  const styleText = {
    fontSize: "17px",
  };

  const styleti = {

    fontFamily: 'Lucida Sans Unicode',
    color: 'white'

  };
  const cargando = {

    fontFamily: 'Lucida Sans Unicode',
    color: 'white',
marginTop: "20px"
  };

  return (
    <div className="container" style={fondo}>
      <Typography className="h1" variant="h1" component="div" style={styleti}>
        Datos desde la API
      </Typography>
      {loading ? (
        <Typography variant="body2" style={cargando}>
          Cargando datos...
        </Typography>
      ) : (
        <div
          classNam="container-card"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {data.map((incident) => (
            <Card key={incident._id} style={cardStyle}>
              <CardContent style={contentStyle}>
                <Typography variant="h6" style={styleTitle} component="div">
                  {incident.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b>Descripción:</b> {incident.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b> Fecha</b> {incident.date}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b>Severidad:</b> {incident.severity}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b>Zona:</b>
                  {incident.zone}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b>Lugar:</b> {incident.place}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b>Prioridad:</b> {incident.priority}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b> Solución:</b> {incident.solution_date || "Pendiente"}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={styleText}>
                  <b> Usuario:</b> {incident.name_User}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
