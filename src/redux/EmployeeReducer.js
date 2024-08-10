// EmployeeReducer.js
const initialState = {
  employees: [],
};

// EmployeeReducer.js
const employeeReducer = (state = initialState, action) => {
  console.log("Action received:", action);
  switch (action.type) {
    case "ADD_EMPLOYEE":
      const newState = {
        ...state,
        employees: [...state.employees, action.payload],
      };
      console.log("Updated state:", newState);
      return newState;
    default:
      return state;
  }
};

export default employeeReducer;
