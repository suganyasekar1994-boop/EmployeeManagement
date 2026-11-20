import React, { useState } from "react";

import axios from "axios";

import "./EmployeeForm.css";


const EditEmployee = ({
  employee,
  setSelectedEmployee,
  getEmployees
}) => {

  const [formData, setFormData] =
    useState(employee);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:8082/update/${employee.id}`,
        {
          ...formData,
          salary: Number(formData.salary)
        }
      );

      alert("Employee updated successfully");

      setSelectedEmployee(null);

      getEmployees();

    } catch (error) {

      console.error(
        "Error updating employee:",
        error
      );

      alert("Failed to update employee");

    }

  };


  return (

    <div className="modal-background">

      <div className="employee-form">

        <h2>
          Edit Employee
        </h2>


        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Employee Name"
            required
          />


          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />


          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />


          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />


          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            required
          />


          <input
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />


          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              Update Employee
            </button>


            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setSelectedEmployee(null)
              }
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};


export default EditEmployee;