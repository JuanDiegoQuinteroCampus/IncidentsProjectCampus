import React from "react";
import img from '../assets/home.jpg'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const fondo = {
  backgroundImage: `url(${img})`, // Reemplaza con la ruta de tu imagen
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  height: "90.4vh", // Ajusta la altura como desees
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle = {
  padding: "100px",
  borderRadius: "8px",
  justify: "center",
  display: "flex",
  flexDirection: "column", 
  alignItems: "start", 
};

const titleStyle = {
  "fontSize": "3rem",
  "padding-bottom": "2%"
};

const textStyle = {
  fontSize: "1.5rem", 
};

export default function Content() {
  return (
    <>
      <div style={fondo}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid xs={9} style={contentStyle}>
              <h1 className="text-white font-bold text-5xl font-mono mt-4 mb-1" style={titleStyle}>
                Campuslands Incidents
              </h1>
              <p className="text-white  text-xl font-sans  mt-2" style={textStyle}>
                In Campusland, we have our own Incident Reporting <br /> system that allows you to report any concerns <br /> quickly and confidentially, helping us <br /> create a safer and more inclusive <br /> university environment.
              </p>
            </Grid>
            <Grid xs={1}></Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
