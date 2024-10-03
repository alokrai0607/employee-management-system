document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("employeeForm");
  const employeeTableBody = document.querySelector("#employeeTable tbody");
  const submitButton = document.querySelector("button[type='submit']");

  loadEmployees();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const empId = document.getElementById("emp_id").value;
    const formData = new FormData(form);
    const data = {
      emp_name: formData.get("emp_name"),
      emp_dep: formData.get("emp_dep"),
      emp_salary: parseInt(formData.get("emp_salary")),
      emp_contact: formData.get("emp_contact"),
    };

    const url = empId
      ? `http://127.0.0.1:8000/employees/${empId}`
      : "http://127.0.0.1:8000/employees/";
    const method = empId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((employee) => {
        form.reset();
        document.getElementById("emp_id").value = "";
        submitButton.textContent = "Submit";
        loadEmployees();
      })
      .catch((error) => console.error("Error:", error));
  });

  function loadEmployees() {
    fetch("http://127.0.0.1:8000/employees/")
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
                            <button class="btn btn-success btn-sm" onclick="editEmployee(${employee.emp_id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteEmployee(${employee.emp_id})">Delete</button>
                        </td>
                    `;

          employeeTableBody.appendChild(row);
        });
      });
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
      });
  };

  window.deleteEmployee = function (empId) {
    fetch(`http://127.0.0.1:8000/employees/${empId}`, { method: "DELETE" })
      .then(() => loadEmployees())
      .catch((error) => console.error("Error:", error));
  };
});
