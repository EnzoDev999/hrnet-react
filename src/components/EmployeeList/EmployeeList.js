import React, { useState, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { useSelector } from "react-redux"; // Importer useSelector
import "./EmployeeList.css";

const EmployeeList = () => {
  const employees = useSelector((state) => state.employee.employees); // Récupérer les employés depuis Redux
  const [searchTerm, setSearchTerm] = useState("");
  console.log("Employees from Redux:", employees); // Vérifiez que les employés sont présents

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      return Object.values(employee)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [employees, searchTerm]);

  const data = useMemo(() => filteredEmployees, [filteredEmployees]);

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Utilisation de 'page' à la place de 'rows'
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    toggleSortBy, // Ajout de la méthode toggleSortBy
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        sortBy: [{ id: "firstName", desc: false }],
      }, // Tri initial par 'First Name'
    },
    useSortBy,
    usePagination
  );

  const handleSort = (columnId) => {
    const isSortedDesc = sortBy.find((col) => col.id === columnId)?.desc;
    toggleSortBy(columnId, !isSortedDesc, false); // Bascule entre croissant et décroissant
  };

  const totalEntries = employees.length;
  const filteredEntries = filteredEmployees.length;

  return (
    <div className="container">
      <a href="/">Home</a>
      <h1>Current Employees</h1>
      <div className="search-container">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table {...getTableProps()} className="employee-table">
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key || headerGroupIndex} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  const isSorted = column.isSorted;
                  const isSortedDesc = column.isSortedDesc;
                  return (
                    <th
                      key={key || columnIndex}
                      {...restColumnProps}
                      onClick={() => handleSort(column.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {column.render("Header")}
                      <span className="sort-arrows">
                        <span
                          className={`arrow up ${
                            isSorted && !isSortedDesc ? "active" : ""
                          } ${isSorted && isSortedDesc ? "inactive" : ""}`}
                        ></span>
                        <span
                          className={`arrow down ${
                            isSorted && isSortedDesc ? "active" : ""
                          } ${isSorted && !isSortedDesc ? "inactive" : ""}`}
                        ></span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
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
      <div className="pagination">
        <div className="pagination-buttons">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          {/* Génération des boutons pour chaque page disponible */}
          {pageOptions.map((number) => (
            <button
              key={number} // Clé unique pour chaque bouton
              onClick={() => gotoPage(number)} // Navigue directement à la page spécifiée
              className={pageIndex === number ? "active" : ""} // Appliquer 'active' seulement si c'est la page actuelle
              style={{ fontWeight: pageIndex === number ? "bold" : "normal" }}
            >
              {number + 1}
            </button>
          ))}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
        <div>
          Showing {pageIndex * pageSize + 1} to{" "}
          {Math.min((pageIndex + 1) * pageSize, filteredEntries)} of{" "}
          {filteredEntries} entries{" "}
          {searchTerm && `(filtered from ${totalEntries} total entries)`}
        </div>
        <div>
          <label className="entries-label">
            Show{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 25, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>{" "}
            entries
          </label>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
