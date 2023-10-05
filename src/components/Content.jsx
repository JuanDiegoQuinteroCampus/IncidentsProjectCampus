import React from "react";
import img from '../assets/home.jpg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const fondo = {
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  minHeight: "100vh", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle = {
  padding: "6px", 
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "930px", 
  width: "100%",
};

const titleStyle = {
  fontSize: "3rem", 
  paddingBottom: "2%",
};

const textStyle = {
  fontSize: "1.5rem", 
};

export default function Content() {
  return (
    <>
    <div style={fondo}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div style={contentStyle}>
              <Typography variant="h3" component="h1" className="text-white font-bold text-5xl font-mono mt-4 mb-1" style={titleStyle}>
                Campuslands Incidents
              </Typography>
              <Typography variant="body1" className="text-white text-xl font-sans mt-2" style={textStyle}>
                In Campusland, we have our own Incident Reporting <br /> system that allows you to report any concerns <br /> quickly and confidentially, helping us <br /> create a safer and more inclusive <br /> university environment.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={3}></Grid>
        </Grid>
      </Box>
    </div>
    </>
  );
}
