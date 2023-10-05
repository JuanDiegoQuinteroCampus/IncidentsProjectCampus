import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const ReportTable = ({ reports }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="report table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Severidad</TableCell>
              <TableCell>Zona</TableCell>
              <TableCell>Lugar</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>UserReport</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={report._id || index}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.severity}</TableCell>
                <TableCell>{report.zone}</TableCell>
                <TableCell>{report.place}</TableCell>
                <TableCell>{report.priority}</TableCell>
                <TableCell>{report.name_User}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const AddReportForm = ({ onAddReport }) => {
  const [newReport, setNewReport] = useState({
    name: "",
    description: "",
    date: "",
    severity: "",
    zone: "",
    place: "",
    priority: "",
    name_User: localStorage.getItem("user") || "",
    solution_date: null,
    id_soporte: null,
    update_date: null,
    delete_date: null,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReport({ ...newReport, [name]: value });
  };
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/incidents/v2/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api": "1.1",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newReport),
        }
      );

      if (response.ok) {
        const addedReport = await response.json();
        onAddReport(addedReport);

        setNewReport({
          name: "",
          description: "",
          date: "",
          severity: "",
          zone: "",
          place: "",
          priority: "",
          name_User: localStorage.getItem("user"),
          solution_date: null,
          id_soporte: null,
          update_date: null,
          delete_date: null,
        });
        setError(null);
        setSuccessMessage("Reporte del incidente registrado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el reporte:", errorData);
        setError(
          `Error al agregar el reporte. Código de respuesta: ${response.status}. Mensaje: ${errorData.message}. Hay campos vacios o incorrectos`
        );
      }
    } catch (error) {
      console.error("Error al agregar el reporte:", error);
      setError(
        "Error al agregar el reporte. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };
  const fondo = {
    

    justifyContent: "center",
  };
  return (
    
    <Grid container spacing={2} style={fondo}>
      <Grid item xs={12} sm={6} md={1}>
        <TextField
          name="name"
          label="Título"
          value={newReport.name}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          name="description"
          label="Descripción"
          value={newReport.description}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={1}>
        <TextField
          name="date"
          label="AAAA-MM-DD"
          value={newReport.date}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          name="severity"
          label="Severity"
          value={newReport.severity}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={1}>
        <TextField
          name="zone"
          label="Zone"
          value={newReport.zone}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={1}>
        <TextField
          name="place"
          label="Place"
          value={newReport.place}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          name="priority"
          label="Priority"
          value={newReport.priority}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <TextField
          name="User"
          label="UserReport"
          value={newReport.name_User}
          onChange={handleInputChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Agregar Reporte
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={12}>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
      </Grid>
    </Grid>
    
  );
};

export default function Reports() {
  const [reports, setReports] = useState([]);

  const handleAddReport = (newReport) => {
    setReports([...reports, newReport]);
  };
  const fondo = {
    display: "flex",
        justifyContent: "center",
        flexDirection:"column",
        textAlign:"center",
        padding:"50px"
  };
  return (
    <div  style={fondo}>
      <h1 className="font-bold text-5xl font-mono mt-4 mb-1">
        Incident's Reports
      </h1>
      <ReportTable reports={reports} />
      <AddReportForm onAddReport={handleAddReport} />
    </div>
  );
}
