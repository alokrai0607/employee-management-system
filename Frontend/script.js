document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("employeeForm");
  const employeeTableBody = document.querySelector("#employeeTable tbody");
  const submitButton = document.querySelector("button[type='submit']");

  getAllEmployees();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const empId = document.getElementById("emp_id").value;
    const empData = {
      emp_name: document.getElementById("emp_name").value,
      emp_dep: document.getElementById("emp_dep").value,
      emp_salary: parseInt(document.getElementById("emp_salary").value),
      emp_contact: document.getElementById("emp_contact").value,
    };

    const method = empId ? "PUT" : "POST";
    const url = empId
      ? `http://127.0.0.1:8000/employees/${empId}` 
      : "http://127.0.0.1:8000/employees"; 

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then(() => {
        form.reset();
        document.getElementById("emp_id").value = "";
        submitButton.textContent = "Submit";
        getAllEmployees();
      })
      .catch((error) => console.error("Error:", error));
  });

  function getAllEmployees() {
    fetch("http://127.0.0.1:8000/employees") 
      .then((response) => response.json())
      .then((employees) => {
        employeeTableBody.innerHTML = "";
        employees.forEach((employee) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${employee.emp_id}</td>
            <td>${employee.emp_name}</td>
            <td>${employee.emp_dep}</td>
            <td>${employee.emp_salary}</td>
            <td>${employee.emp_contact}</td>
            <td>
              <button class="edit-btn" onclick="editEmployee(${employee.emp_id})">Edit</button>
              <button class="delete-btn" onclick="deleteEmployee(${employee.emp_id})">Delete</button>
            </td>
          `;
          employeeTableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error loading employees:", error));
  }

  window.editEmployee = function (empId) {
    fetch(`http://127.0.0.1:8000/employees/${empId}`) 
      .then((response) => response.json())
      .then((employee) => {
        document.getElementById("emp_id").value = employee.emp_id;
        document.getElementById("emp_name").value = employee.emp_name;
        document.getElementById("emp_dep").value = employee.emp_dep;
        document.getElementById("emp_salary").value = employee.emp_salary;
        document.getElementById("emp_contact").value = employee.emp_contact;

        submitButton.textContent = "Update";
      })
      .catch((error) => console.error("Error editing employee:", error));
  };

  window.deleteEmployee = function (empId) {
    fetch(`http://127.0.0.1:8000/employees/${empId}`, { method: "DELETE" }) 
      .then(() => getAllEmployees())
      .catch((error) => console.error("Error deleting employee:", error));
  };
});
