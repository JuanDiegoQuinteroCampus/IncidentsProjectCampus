import React, { useState } from "react";
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
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.severity}</TableCell>
                <TableCell>{report.zone}</TableCell>
                <TableCell>{report.place}</TableCell>
                <TableCell>{report.priority}</TableCell>
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
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/incidents/v2/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api": "1.1",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newReport),
      });

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
        });

        // Borra el mensaje de error si había uno previamente
        setError(null);
      } else {
        const errorData = await response.json();
  console.error("Error al agregar el reporte:", errorData);
  setError(`Error al agregar el reporte. Código de respuesta: ${response.status}. Mensaje: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al agregar el reporte:", error);
      setError("Error al agregar el reporte. Por favor, inténtalo de nuevo más tarde.");
    }
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <TextField
          name="name"
          label="Título"
          value={newReport.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="description"
          label="Descripción"
          value={newReport.description}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="date"
          label="aaaa/mm/dd"
          value={newReport.date}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="severity"
          label="Severity"
          value={newReport.severity}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          name="zone"
          label="Zone"
          value={newReport.zone}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          name="place"
          label="Place"
          value={newReport.place}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          name="priority"
          label="Priority"
          value={newReport.priority}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Agregar Reporte
        </Button>
        {error && <p className="error-message">{error}</p>}
      </Grid>
    </Grid>
  );
};


export default function Reports() {
  const [reports, setReports] = useState([]);

  const handleAddReport = (newReport) => {
    //  agregar el nuevo reporte

    setReports([...reports, newReport]);
  };

  return (
    <div>
      <h1 className="text-5x1">Incident's Reports</h1>
      <ReportTable reports={reports} />
      <AddReportForm onAddReport={handleAddReport} />
    </div>
  );
}
