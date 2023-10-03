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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleSubmit = () => {
    // Validar los campos y realizar la llamada a la API para agregar el nuevo reporte
    onAddReport(newReport);
    // Limpiar el formulario o realizar otras acciones necesarias
    setNewReport({
      name: "",
      description: "",
      date: "",
      severity: "",
      zone: "",
      place: "",
      priority: "",
    });
  };

  return (
    <div>
      <TextField
        name="name"
        label="Título"
        value={newReport.name}
        onChange={handleInputChange}
      />
      <TextField
        name="description"
        label="Descripción"
        value={newReport.description}
        onChange={handleInputChange}
      />
      <TextField
        name="date"
        label="Fecha"
        value={newReport.date}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Agregar Reporte
      </Button>
    </div>
  );
};

export default function  Reports()  {
  const [reports, setReports] = useState([]); 

  const handleAddReport = (newReport) => {
    //  agregar el nuevo reporte

    setReports([...reports, newReport]);
  };

  return (
    <div>
      <ReportTable reports={reports} />
      <AddReportForm onAddReport={handleAddReport} />
    </div>
  );
};


