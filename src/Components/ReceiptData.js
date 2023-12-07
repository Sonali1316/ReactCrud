import React, { useEffect, useState } from "react";
import "./ReceiptData.css";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const ReceiptData = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [data, setData] = useState([
    {
      description: "",
      unitPrice: "",
      rate: "",
      quantity: "",
      discount: "",
      amount: "",
    },
  ]);
  const [remark, setRemark] = useState("");
  const [personName, setpersonName] = useState("");
  const [receiptInfo, setReceiptInfo] = useState({
    receiptNo: "",
    receiptDate: "",
  });
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const existingData =
        JSON.parse(localStorage.getItem("receiptData")) || [];
      const editData = existingData.find((item) => item.id === id);
      if (editData) {
        setReceiptInfo(editData.receiptInfo);
        setpersonName(editData.personName);
        setData(editData.data);
        setRemark(editData.remark);
        setTotalAmount(editData.totalAmount);
        setNetAmount(editData.netAmount);
        setTotalQuantity(editData.totalQuantity);
      }
    }
  }, [id]);

  const changeRowValue = (index, e) => {
    const { name, value } = e.target;
    const list = [...data];

    if ([name] == "description") {
      let description = value;
      list[index]["description"] = description;
    }
    if ([name] == "unitPrice") {
      let unitPriceAmout = value == "" ? "" : parseFloat(value);
      list[index]["unitPrice"] = unitPriceAmout;
    }
    if ([name] == "rate") {
      let gstRate = value == "" ? "" : parseFloat(value);
      list[index]["rate"] = gstRate;
    }
    if ([name] == "quantity") {
      const quantityAmount = value == "" ? "" : parseFloat(value);
      list[index]["quantity"] = quantityAmount;
    }
    if ([name] == "discount") {
      let discount = value == "" ? "" : parseFloat(value);
      list[index]["discount"] = discount;
    }

    const quantityAmount =
      list[index]["quantity"] == "" ? "" : list[index]["quantity"];
    const gstRate = list[index]["rate"] == "" ? "" : list[index]["rate"];
    const amountAud = quantityAmount * gstRate;
    setTotalAmount(amountAud);
    const discount =
      list[index]["discount"] == "" ? "" : list[index]["discount"];
    let total = (amountAud * (100 - discount)) / 100;
    list[index]["amount"] = total;
    const updatedTotalqty = list.reduce(
      (total, item) => total + (item.quantity || 0),
      0
    );
    setTotalQuantity(updatedTotalqty);
    const updatedTotalAmount = list.reduce(
      (total, item) => total + (item.amount || 0),
      0
    );
    setNetAmount(updatedTotalAmount);
    setData(list);
  };

  const addFieldCustom = () => {
    setData([
      ...data,
      {
        description: "",
        unitPrice: "",
        rate: "",
        quantity: "",
        discount: "",
        amount: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };
  const handleReceiptInfoChange = (e) => {
    const { name, value } = e.target;
    setReceiptInfo((prevReceiptInfo) => ({
      ...prevReceiptInfo,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !receiptInfo.receiptNo ||
      !receiptInfo.receiptDate ||
      !personName ||
      data.length === 0
    ) {
      alert("Incomplete data. Submission ignored.")
      console.log("Incomplete data. Submission ignored.");
    }
  else if (editMode) {
      const existingData =
        JSON.parse(localStorage.getItem("receiptData")) || [];
      const updatedData = existingData.map((item) =>
        item.id === id
          ? {
              ...item,
              receiptInfo,
              personName,
              data,
              remark,
              totalQuantity,
              netAmount,
              totalAmount,
            }
          : item
      );
      localStorage.setItem("receiptData", JSON.stringify(updatedData));
      navigate("/ReceiptTable");
    }
    else{
      const submissionData = {
        id: uuidv4(),
        receiptInfo,
        personName,
        data,
        remark,
        totalQuantity,
        netAmount,
        totalAmount,
      };
      const existingData =
        JSON.parse(localStorage.getItem("receiptData")) || [];
      existingData.push(submissionData);

      localStorage.setItem("receiptData", JSON.stringify(existingData));
      navigate("/ReceiptTable");
    }
    setReceiptInfo({
      receiptNo: "",
      receiptDate: "",
    });
    setpersonName("");
    setData([
      {
        description: "",
        unitPrice: "",
        rate: "",
        quantity: "",
        discount: "",
        amount: "",
      },
    ]);
    setRemark("");
  };
  const handlePrint = () => {
    window.print();
  };
  const handleDelete = () => {
    if (editMode) {
      const existingData =
        JSON.parse(localStorage.getItem("receiptData")) || [];
      const updatedData = existingData.filter((item) => item.id !== id);
      localStorage.setItem("receiptData", JSON.stringify(updatedData));
      navigate("/ReceiptTable");
    } else {
      alert('Cannot delete a new receipt. It has not been saved yet.')
    }
  };
  return (
    <div className="container">
         <div className="row">
        <div className="col-md-12 d-flex justify-content-between mb-3">
          <div>
            <button className="btn btn-secondary me-2 exclude-from-print" onClick={handlePrint}>
              Print
            </button>
            <button className="btn btn-danger me-2 exclude-from-print" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <button className="btn btn-warning me-2 exclude-from-print" onClick={() => navigate("/ReceiptTable")}>
            Cancel
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Receipt No:</label>
          <input
            type="text"
            name="receiptNo"
            value={receiptInfo.receiptNo}
            onChange={(e)=>handleReceiptInfoChange(e)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Receipt Date:</label>
          <input
            type="text"
            name="receiptDate"
            value={receiptInfo.receiptDate}
            onChange={(e)=>handleReceiptInfoChange(e)}
            className="form-control"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="form-label">Person Name:</label>
        <input
          type="text"
          name="personName"
          value={personName}
          onChange={(e) => setpersonName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="table-responsive mt-3">
        <table className="table table-bordered invoiceTable">
          <thead style={{ background: "aliceblue" }}>
            <tr style={{ textTransform: "uppercase" }}>
              <th>Sr no.</th>
              <th>description</th>
              <th>unitPrice</th>
              <th>rate</th>
              <th>quantity</th>
              <th>discount</th>
              <th>amount</th>

              <th>
                <button
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                  onClick={addFieldCustom}
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => {
              const {
                description,
                unitPrice,
                rate,
                quantity,
                discount,
                amount,
              } = row;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td className="col-md-4">
                    <input
                      required
                      name="description"
                      className="form-control"
                      placeholder="DESCRIPTION"
                      type="text"
                      value={description}
                      onChange={(e) => changeRowValue(index, e)}
                    />
                  </td>
                  <td className="col-xs-1">
                    <input
                      placeholder="PRICE"
                      className="form-control"
                      type="number"
                      name="unitPrice"
                      value={unitPrice}
                      onChange={(e) => changeRowValue(index, e)}
                    />
                  </td>
                  <td className="col-xs-1">
                    <input
                      required
                      name="rate"
                      className="form-control"
                      placeholder="Rate"
                      type="number"
                      value={rate}
                      onChange={(e) => changeRowValue(index, e)}
                    />
                  </td>
                  <td className=" col-xs-1">
                    <input
                      placeholder="QUANTITY"
                      className="form-control"
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => changeRowValue(index, e)}
                    />
                  </td>

                  <td className="col-xs-1">
                    <input
                      placeholder="Discount"
                      className="form-control"
                      type="number"
                      name="discount"
                      value={discount}
                      onChange={(e) => changeRowValue(index, e)}
                    />
                  </td>
                  <td className="col-xs-1">
                    <input
                      placeholder="total"
                      className="form-control"
                      type="text"
                      name="amount"
                      value={amount}
                    />
                  </td>

                  <td className="col-xs-1">
                    {data.length !== 1 ? (
                      <button
                        style={{
                          marginLeft: "10px",
                          marginRight: "10px",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                        onClick={() => removeInputFields(index)}
                      >
                        <i
                          className="fa fa-minus-circle"
                          aria-hidden="true"
                        ></i>
                        X
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <label className="form-label">Remark:</label>
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <h6>Total Qty:{totalQuantity}</h6>
          <h6>Total Amount:{totalAmount}</h6>
          <h6>Net Amount:{netAmount}</h6>
        </div>
      </div>
      <div className="mt-3 text-center">
        <button
          className="btn btn-primary exclude-from-print"
          style={{ width: "25%" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReceiptData;
