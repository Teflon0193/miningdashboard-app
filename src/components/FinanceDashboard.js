import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles.css';

const FinanceDashboard = () => {
  const [accountsPayable, setAccountsPayable] = useState([]);
  const [accountsReceivable, setAccountsReceivable] = useState([]);
  const [assets, setAssets] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payableResponse = await axios.get('http://localhost:8080/api/accounts-payable');
        const receivableResponse = await axios.get('http://localhost:8080/api/accounts-receivable');
        const assetsResponse = await axios.get('http://localhost:8080/api/assets');
        const ledgerResponse = await axios.get('http://localhost:8080/api/general-ledger');
        
        setAccountsPayable(payableResponse.data);
        setAccountsReceivable(receivableResponse.data);
        setAssets(assetsResponse.data);
        setGeneralLedger(ledgerResponse.data);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Finance Dashboard</h1>

      {/* Accounts Payable Section */}
      <div className="dashboard-section">
        <h2>Accounts Payable</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Amount Owed</th>
              <th>Payment Due Date</th>
            </tr>
          </thead>
          <tbody>
            {accountsPayable.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.supplierName}</td>
                <td>{item.amountOwed}$</td>
                <td>{new Date(item.paymentDueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accounts Receivable Section */}
      <div className="dashboard-section">
        <h2>Accounts Receivable</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Amount Due</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {accountsReceivable.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customerName}</td>
                <td>{item.amountDue}$</td>
                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assets Section */}
      <div className="dashboard-section">
        <h2>Assets</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset Name</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Depreciation Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.assetName}</td>
                <td>{item.purchasePrice}$</td>
                <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                <td>{item.depreciationValue}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* General Ledger Section */}
      <div className="dashboard-section">
        <h2>General Ledger</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {generalLedger.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.accountName}</td>
                <td>{item.accountType}</td>
                <td>{item.balance}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceDashboard;
