import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceiptTable.css";
const ReceiptTable = () => {
  const [receipts, setReceipts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedReceipts =
      JSON.parse(localStorage.getItem("receiptData")) || [];
    setReceipts(storedReceipts);
  }, []);

  const handleEdit = (id) => {
    navigate(`/data/edit/${id}`);
  };

  const handleDelete = (id) => {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
    localStorage.setItem("receiptData", JSON.stringify(updatedReceipts));
  };

  const handleAdd = () => {
    navigate("/data");
  };

  const handleRefresh = () => {
    const storedReceipts =
      JSON.parse(localStorage.getItem("receiptData")) || [];
    setReceipts(storedReceipts);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="container mt-3"
      style={{
        marginBottom: "30%",
      }}
    >
      <h2 className="head">Receipts</h2>
      <div className="table-buttons">
        <button className="btn btn-primary m-2" onClick={handleAdd}>
          Add
        </button>
        <button className="btn btn-info m-2" onClick={handleRefresh}>
          Refresh
        </button>
        <button className="btn btn-secondary m-2" onClick={handlePrint}>
          Print
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Receipt Number</th>
            <th>Receipt Date</th>
            <th>Person Name</th>
            <th>Total Qty</th>
            <th>Net Amount</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((receipt, index) => (
            <tr key={receipt.id}>
              <td>{index + 1}</td>
              <td>{receipt.receiptInfo.receiptNo}</td>
              <td>{receipt.receiptInfo.receiptDate}</td>
              <td>{receipt.personName}</td>
              <td>{receipt.totalQuantity}</td>
              <td>{receipt.netAmount}</td>
              <td>{receipt.remark}</td>
              <td>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => handleEdit(receipt.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={() => handleDelete(receipt.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptTable;
