document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("employeeForm");
  const employeeTableBody = document.querySelector("#employeeTable tbody");
  const submitButton = document.getElementById("submitButton");

  let employees = [];
  let editIndex = -1;

  loadEmployees();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const empName = document.getElementById("emp_name").value;
    const empDep = document.getElementById("emp_dep").value;
    const empSalary = parseFloat(document.getElementById("emp_salary").value);
    const empContact = document.getElementById("emp_contact").value;

    const employee = {
      emp_name: empName,
      emp_dep: empDep,
      emp_salary: empSalary,
      emp_contact: empContact,
    };

    if (editIndex >= 0) {
      employees[editIndex] = employee;
      editIndex = -1;
      submitButton.textContent = "Submit";
    } else {
      employee.emp_id = employees.length + 1;
      employees.push(employee);
    }

    form.reset();
    renderEmployees();
  });

  function renderEmployees() {
    employeeTableBody.innerHTML = "";
    employees.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${employee.emp_id}</td>
                <td>${employee.emp_name}</td>
                <td>${employee.emp_dep}</td>
                <td>${employee.emp_salary}</td>
                <td>${employee.emp_contact}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
      employeeTableBody.appendChild(row);
    });
  }

  function loadEmployees() {
    renderEmployees();
  }

  window.editEmployee = function (index) {
    const employee = employees[index];
    document.getElementById("emp_name").value = employee.emp_name;
    document.getElementById("emp_dep").value = employee.emp_dep;
    document.getElementById("emp_salary").value = employee.emp_salary;
    document.getElementById("emp_contact").value = employee.emp_contact;

    editIndex = index;
    submitButton.textContent = "Update";
  };

  window.deleteEmployee = function (index) {
    employees.splice(index, 1);
    renderEmployees();
  };
});
