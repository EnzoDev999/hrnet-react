import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEmployee.css";
import states from "../../data/states";
import Modal from "react-modal-enzo";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/actions";

// Préparer les options pour react-select
const stateOptions = states.map((state) => ({
  value: state.abbreviation,
  label: state.name,
}));

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];

const CreateEmployee = ({ onSave }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const saveEmployee = () => {
    // Vérification des champs obligatoires
    if (
      !firstName ||
      !lastName ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !department
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),
      department: department ? department.value : "",
      street,
      city,
      state: state ? state.value : "",
      zipCode,
    };

    // Dispatch l'action pour ajouter un employé
    console.log("Dispatching employee:", employee); // Vérifiez que l'employé est dispatché
    dispatch(addEmployee(employee));
    setShowModal(true); // Affiche la modal après enregistrement

    if (typeof onSave === "function") {
      onSave(employee);
    }
  };

  return (
    <div className="container">
      <a href="/employee-list">View Current Employees</a>
      <h2>Create Employee</h2>
      <form action="#" id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          id="date-of-birth"
          selected={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          required
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          required
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label htmlFor="state-select">State</label>
          <Select
            inputId="state-select"
            className="react-select-container"
            classNamePrefix="react-select"
            value={state}
            onChange={setState}
            options={stateOptions}
            menuPlacement="auto"
            required
            aria-labelledby="state-select"
          />

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </fieldset>

        <label htmlFor="department-select">Department</label>
        <Select
          inputId="department-select"
          className="react-select-container"
          classNamePrefix="react-select"
          value={department}
          onChange={setDepartment}
          options={departmentOptions}
          menuPlacement="auto"
          required
          aria-labelledby="department-select"
        />
      </form>

      <button onClick={saveEmployee}>Save</button>
      {/* Utilise la modal ici */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          content={{
            title: "Success",
            message: "Employee created successfully.",
            buttonText: "Close",
          }}
        />
      )}
    </div>
  );
};
export default CreateEmployee;
