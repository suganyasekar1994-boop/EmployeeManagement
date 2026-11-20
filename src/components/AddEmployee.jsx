import React, { useState } from "react";

import axios from "axios";

import "./EmployeeForm.css";


const AddEmployee = ({
  setShowAdd,
  getEmployees
}) => {

  const [employee, setEmployee] = useState({

    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: ""

  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployee({

      ...employee,

      [name]: value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8082/collect",
       [{
          ...employee,
          salary: Number(employee.salary)
        }
      ]
      );

      alert("Employee added successfully");

      setShowAdd(false);

      getEmployees();

    } catch (error) {

      console.error(
        "Error adding employee:",
        error
      );

      alert("Failed to add employee");

    }

  };


  return (

    <div className="modal-background">

      <div className="employee-form">

        <h2>
          Add Employee
        </h2>


        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Employee Name"
            value={employee.name}
            onChange={handleChange}
            required
          />


          <input
            name="email"
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={handleChange}
            required
          />


          <input
            name="phone"
            placeholder="Phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />


          <input
            name="department"
            placeholder="Department"
            value={employee.department}
            onChange={handleChange}
            required
          />


          <input
            name="designation"
            placeholder="Designation"
            value={employee.designation}
            onChange={handleChange}
            required
          />


          <input
            name="salary"
            type="number"
            placeholder="Salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />


          <div className="form-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              Add Employee
            </button>


            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setShowAdd(false)
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


export default AddEmployee;