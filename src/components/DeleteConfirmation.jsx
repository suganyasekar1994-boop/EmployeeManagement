import React from "react";

import axios from "axios";

import "./EmployeeForm.css";


const DeleteConfirmation = ({
  employee,
  setDeleteEmployee,
  getEmployees
}) => {


  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://localhost:8082/del/${employee.id}`
      );

      alert("Employee deleted successfully");

      setDeleteEmployee(null);

      getEmployees();

    } catch (error) {

      console.error(
        "Error deleting employee:",
        error
      );

      alert("Failed to delete employee");

    }

  };


  return (

    <div className="modal-background">

      <div className="delete-box">

        <h2>
          Delete Employee?
        </h2>

        <p>
          Are you sure you want to delete
          <strong> {employee.name}</strong>?
        </p>


        <div className="form-buttons">

          <button
            className="delete-confirm-btn"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>


          <button
            className="cancel-btn"
            onClick={() =>
              setDeleteEmployee(null)
            }
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

};


export default DeleteConfirmation;