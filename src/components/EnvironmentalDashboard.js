import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles.css'; 

const EnvironmentalDashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [complianceReports, setComplianceReports] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // Fetching data from backend
  useEffect(() => {
    // Fetch environmental incidents
    axios.get('http://localhost:8080/api/environmental-incidents')
      .then(response => setIncidents(response.data))
      .catch(error => console.error('Error fetching incidents:', error));

    // Fetch compliance reports
    axios.get('http://localhost:8080/api/compliance-reports')
      .then(response => setComplianceReports(response.data))
      .catch(error => console.error('Error fetching compliance reports:', error));

    // Fetch environmental metrics
    axios.get('http://localhost:8080/api/environmental-metrics')
      .then(response => setMetrics(response.data))
      .catch(error => console.error('Error fetching metrics:', error));
  }, []);

  // Pie chart data preparation for compliance levels
  const complianceData = complianceReports.map(report => ({
    name: report.reportName,
    value: report.content.length // Using content length as a metric for pie chart demonstration
  }));

  // Line chart data preparation for metrics
  const lineChartData = metrics.map(metric => ({
    name: metric.metricName,
    value: metric.value,
    date: metric.timestamp
  }));

  return (
    <div className="dashboard-container">
      <h1>Environmental Dashboard</h1>

      {/* Environmental Incidents */}
      <div className="dashboard-section">
        <h2>Incident Management</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Corrective Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.incidentDescription}</td>
                <td>{new Date(incident.incidentDate).toLocaleDateString()}</td>
                <td>{incident.status}</td>
                <td>{incident.correctiveActions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Compliance Reporting */}
      <div className="dashboard-section">
        <h2>Compliance Reporting</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={complianceData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {complianceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#00C49F'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Environmental Monitoring (Metrics) */}
      <div className="dashboard-section">
        <h2>Environmental Monitoring</h2>
        <LineChart
          width={600}
          height={300}
          data={lineChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default EnvironmentalDashboard;
