import React, { useEffect, useState } from "react";

import axios from "axios";

import { Pencil, Trash2 } from "lucide-react";

import "./EmployeeManagement.css";

import AddEmployee from "./AddEmployee";

import EditEmployee from "./EditEmployee";

import DeleteConfirmation from "./DeleteConfirmation";

import DisplayEmployee from "./DisplayEmployee";

const EmployeeManagement = () => {

  const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [deleteEmployee, setDeleteEmployee] =
    useState(null);

  const getEmployees = async () => {

    try {

      setLoading(true);

      const response = await axios.get("http://localhost:8082/displayall");

      setEmployees(response.data);

    } catch (error) {

      console.error(
        "Error getting employees:",
        error
      );
    }
    finally {

    setLoading(false);

  }
};
useEffect(() => {

    getEmployees();

  }, []);
  
  const filteredEmployees =
    employees.filter((employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
return (

    <div className="employee-container">

      <div className="employee-header">

        <div>

          <h1>
            Employee Management
          </h1>

          <p>
            Manage your employees
          </p>

        </div>
<button
          className="add-btn"
          onClick={() => setShowAdd(true)}
        >
          + Add Employee
        </button>

      </div>


      <div className="search-box">

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>
      {loading ? (

        <div className="loading">
          Loading employees...
        </div>

      ) : (

        <div className="table-box">

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

                <th>Actions</th>

              </tr>

            </thead>

<tbody>

              {filteredEmployees.length > 0 ? (

                filteredEmployees.map(
                  (employee) => (

                    <tr key={employee.id}>

                      <td>
                        {employee.id}
                      </td>

                      <td>
                        {employee.name}
                      </td>

                      <td>
                        {employee.email}
                      </td>

                      <td>
                        {employee.phone}
                      </td>

                      <td>
                        {employee.department}
                      </td>

                      <td>
                        {employee.designation}
                      </td>

                      <td>
                        ₹{Number(employee.salary).toLocaleString("en-IN")}
                      </td>

                      <td>

                        <button
                          className="icon-btn edit-btn"
                          onClick={() =>
                            setSelectedEmployee(
                              employee
                            )
                          }
                          title="Edit employee"
                        >
                          <Pencil size={17} />
                        </button>


                        <button
                          className="icon-btn delete-btn"
                          onClick={() =>
                            setDeleteEmployee(
                              employee
                            )
                          }
                          title="Delete Employee"
                        >
                          <Trash2 size={17} />
                        </button>

                      </td>

                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="no-data"
                  >
                    No employees found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      )}
{showAdd && (

        <AddEmployee
          setShowAdd={setShowAdd}
          getEmployees={getEmployees}
        />

      )}


      {selectedEmployee && (

        <EditEmployee
          employee={selectedEmployee}
          setSelectedEmployee={
            setSelectedEmployee
          }
          getEmployees={getEmployees}
        />

      )}


      {deleteEmployee && (

        <DeleteConfirmation
          employee={deleteEmployee}
          setDeleteEmployee={
            setDeleteEmployee
          }
          getEmployees={getEmployees}
        />

      )}

    </div>

  );
};


export default EmployeeManagement;

