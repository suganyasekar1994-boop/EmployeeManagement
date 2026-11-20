import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayEmployee.css";

const DisplayEmployee = () => {

  // Store all employees
  const [employees, setEmployees] = useState([]);

  // Get employees from Spring Boot
  const getEmployees = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8082/displayall"
      );

      console.log("Employees:", response.data);
      console.log("Employees:", response.data);
console.log("Is Array:", Array.isArray(response.data));

      setEmployees(response.data);

    } catch (error) {

      console.error(
        "Error getting employees:",
        error
      );

    }

  };


  // Call getEmployees when component loads
  useEffect(() => {

    getEmployees();

  }, []);


  return (

    <div className="employee-container">

      <h2>Employee List</h2>

      {employees.length === 0 ? (

        <p>No employees found</p>

      ) : (

        <table>

          <thead>

            <tr>

              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>department</th>
              <th>designation</th>
              <th>salary</th>

            </tr>

          </thead>


          <tbody>

            {employees.map((employee) => (

              <tr key={employee.id}>

                <td>{employee.id}</td>

                <td>{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.phone}</td>

                <td>{employee.department}</td>

                <td>{employee.designation}</td>

                <td>{employee.salary}</td>

              </tr>

            ))}

          </tbody>
          <tbody>
  {employees.map((employee, index) => (
    <tr key={index}>
      <td>{JSON.stringify(employee)}</td>
    </tr>
  ))}
</tbody>

        </table>

      )}

    </div>

  );

};


export default DisplayEmployee;

