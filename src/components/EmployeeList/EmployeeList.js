import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    console.log("Stored Employees:", storedEmployees);
    setEmployees(storedEmployees);
  }, []);

  const data = useMemo(() => employees, [employees]);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Start Date", accessor: "startDate" },
      { Header: "Department", accessor: "department" },
      { Header: "Date of Birth", accessor: "dateOfBirth" },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container">
      <h1>Current Employees</h1>
      <table {...getTableProps()} className="employee-table">
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key || headerGroupIndex} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={key || columnIndex} {...restColumnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key || rowIndex} {...restRowProps}>
                {row.cells.map((cell, cellIndex) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key || cellIndex} {...restCellProps}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <a href="/">Home</a>
    </div>
  );
};

export default EmployeeList;
