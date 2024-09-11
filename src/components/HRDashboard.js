import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css'; 

const HRDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [safetyTrainings, setSafetyTrainings] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:8080/api/applicants').then(response => setApplicants(response.data));
    axios.get('http://localhost:8080/api/attendance').then(response => setAttendances(response.data));
    axios.get('http://localhost:8080/api/employees').then(response => setEmployees(response.data));
    axios.get('http://localhost:8080/api/job-postings').then(response => setJobPostings(response.data));
    axios.get('http://localhost:8080/api/payroll').then(response => setPayrolls(response.data));
    axios.get('http://localhost:8080/api/safety-training').then(response => setSafetyTrainings(response.data));
  }, []);

  return (
    <div className="hr-dashboard">
      <h1>HR Dashboard</h1>
      
      <div className="dashboard-section">
        <h2>Applicants</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Resume</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(item => (
              <tr key={item.id}>
                <td>{item.jobPostingId}</td>
                <td>{item.name}</td>
                <td>{item.resume}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Attendance</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Hours completed</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map(item => (
              <tr key={item.id}>
                <td>{item.employeeId}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.is_present}</td>
                <td>{item.hoursWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Employees</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>certification</th>
              <th>training</th>
              <th>Contract</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.certification}</td>
                <td>{item.training}</td>
                <td>{item.employmentContract}</td>
                <td>{item.workSchedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Job Postings</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Postings Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.jobTitle}</td>
                <td>{item.jobDescription}</td>
                <td>{new Date(item.postingDate).toLocaleDateString()}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Payroll</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
            <th>Employee ID</th>
              <th>Salaries</th>
              <th>Bonuses</th>
              <th>Overtime</th>
              <th>Tax Deduction</th>
              <th>Insurance Deduction</th>
              <th>Other Deduction</th> 
            </tr>
          </thead>
          <tbody>
            {payrolls.map(item => (
              <tr key={item.id}>
               <td>{item.employeeId}</td>
                <td>{item.salary}$</td>
                <td>{item.bonus}$</td>
                <td>{item.overtime}$</td>
                <td>{item.taxDeduction}$</td>
                <td>{item.insuranceDeduction}$</td>
                <td>{item.otherDeduction}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section">
        <h2>Safety Training</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Training Program</th>
              <th>Training Schedule</th>
              <th>Certification</th>
            </tr>
          </thead>
          <tbody>
            {safetyTrainings.map(item => (
              <tr key={item.id}>
                <td>{item.employeeId}</td>
                <td>{item.trainingProgram}</td>
                <td>{new Date(item.trainingDate).toLocaleDateString()}</td>
                <td>{item.certification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboard;
