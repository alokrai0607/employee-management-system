document.addEventListener("DOMContentLoaded", () => {
  const addEmployeeForm = document.getElementById("addEmployeeForm");
  const showDegreeBtn = document.getElementById("showDegreeBtn");
  const degreesContainer = document.getElementById("degrees");
  const addDegreeBtn = document.getElementById("addDegreeBtn");
  const employeesContainer = document.getElementById("employees");
  const employeeDetailsModal = document.getElementById(
    "employee-details-modal"
  );
  const closeModalBtn = document.querySelector(".close");
  const formTitle = document.getElementById("form-title");
  const submitButton = document.getElementById("submit-btn");

  const BASE_URL = "http://127.0.0.1:8000/employees";
  let employees = [];
  let editingEmployeeId = null;

  async function fetchEmployees() {
    try {
      const response = await fetch(BASE_URL);
      employees = await response.json();
      renderEmployees();
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  showDegreeBtn.addEventListener("click", () => {
    degreesContainer.style.display =
      degreesContainer.style.display === "none" ? "block" : "none";
    showDegreeBtn.style.display = "none";
  });

  addDegreeBtn.addEventListener("click", () => {
    addNewDegreeField();
  });

  function addNewDegreeField(degree = null) {
    const degreeDiv = document.createElement("div");
    degreeDiv.classList.add("degree");
    degreeDiv.innerHTML = `
      <label for="degree_id">Degree ID:</label>
      <input type="number" class="degree_id" placeholder="Enter degree ID" value="${
        degree ? degree.degree_id : ""
      }" ${degree ? "readonly" : ""} required>
      <label for="degree_name">Degree Name:</label>
      <input type="text" class="degree_name" placeholder="Enter degree name" value="${
        degree ? degree.degree_name : ""
      }" required>
      <label for="degree_year">Year:</label>
      <input type="number" class="degree_year" placeholder="Enter degree year" value="${
        degree ? degree.degree_year : ""
      }" required>
      <label for="degree_percentage">Percentage:</label>
      <input type="number" class="degree_percentage" placeholder="Enter percentage (0-100)" value="${
        degree ? degree.degree_percentage : ""
      }" required min="0" max="100">
      <button type="button" class="remove-degree-btn">×</button>
    `;

    degreesContainer.appendChild(degreeDiv);
    const removeBtn = degreeDiv.querySelector(".remove-degree-btn");
    removeBtn.addEventListener("click", () => degreeDiv.remove());
    degreesContainer.appendChild(addDegreeBtn);
  }

  addEmployeeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const emp_id = parseInt(document.getElementById("emp_id").value);
    const emp_name = document.getElementById("emp_name").value.trim();
    const emp_department = document
      .getElementById("emp_department")
      .value.trim();
    const emp_salary = parseInt(document.getElementById("emp_salary").value);
    const emp_contact = document.getElementById("emp_contact").value.trim();

    if (emp_contact.length !== 10 || isNaN(emp_contact)) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }

    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(emp_name) || !namePattern.test(emp_department)) {
      alert("Name and Department can only contain alphabets and spaces.");
      return;
    }

    const degrees = [];
    document.querySelectorAll(".degree").forEach((degreeElement) => {
      const degree_id = degreeElement.querySelector(".degree_id").value
        ? parseInt(degreeElement.querySelector(".degree_id").value)
        : null;
      const degree_name = degreeElement
        .querySelector(".degree_name")
        .value.trim();
      const degree_year = parseInt(
        degreeElement.querySelector(".degree_year").value
      );
      const degree_percentage = parseInt(
        degreeElement.querySelector(".degree_percentage").value
      );

      if (degree_percentage < 0 || degree_percentage > 100) {
        alert("Degree percentage must be between 0 and 100.");
        return;
      }
      degrees.push({ degree_id, degree_name, degree_year, degree_percentage });
    });

    if (degrees.length === 0) {
      alert("Please add at least one degree for the employee.");
      return;
    }

    const newEmployee = {
      emp_id,
      emp_name,
      emp_dep: emp_department,
      emp_salary,
      emp_contact,
      degrees,
    };

    try {
      const response = editingEmployeeId
        ? await fetch(`${BASE_URL}/${editingEmployeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployee),
          })
        : await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEmployee),
          });

      if (response.ok) {
        alert(
          `Employee ${editingEmployeeId ? "updated" : "added"} successfully!`
        );
        fetchEmployees();
        addEmployeeForm.reset();
        degreesContainer.style.display = "none";
        showDegreeBtn.style.display = "block";
        degreesContainer.innerHTML = "";
        addNewDegreeField();
        formTitle.textContent = "Add Employee";
        submitButton.textContent = "Add Employee";
        editingEmployeeId = null;
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Failed to save employee. Please check the data.");
      }
    } catch (error) {
      console.error("Error adding/updating employee:", error);
    }
  });

  function renderEmployees() {
    employeesContainer.innerHTML = "";
    employees.forEach((employee) => {
      const employeeDiv = document.createElement("div");
      employeeDiv.classList.add("employee-item");
      employeeDiv.innerHTML = `
        <h3>${employee.emp_id} - ${employee.emp_name}</h3>
        <p>Department: ${employee.emp_dep}</p>
        <p>Salary: ${employee.emp_salary}</p>
        <p>Contact: ${employee.emp_contact}</p>
        <button class="view-degrees">View Degrees</button>
        <button class="edit-employee">Edit</button>
        <button class="delete-employee">Delete</button>
      `;

      employeeDiv
        .querySelector(".view-degrees")
        .addEventListener("click", () => {
          viewEmployeeDetails(employee);
        });

      employeeDiv
        .querySelector(".edit-employee")
        .addEventListener("click", () => {
          editEmployee(employee);
        });

      employeeDiv
        .querySelector(".delete-employee")
        .addEventListener("click", () => {
          deleteEmployee(employee.emp_id);
        });

      employeesContainer.appendChild(employeeDiv);
    });
  }

  function viewEmployeeDetails(employee) {
    const detailsContainer = document.getElementById("employee-details");
    detailsContainer.innerHTML = `
      <h2>${employee.emp_name}</h2>
      <p>Department: ${employee.emp_dep}</p>
      <p>Salary: ${employee.emp_salary}</p>
      <p>Contact: ${employee.emp_contact}</p>
      <h3>Degrees:</h3>
      <div class="degree-grid">
        ${employee.degrees
          .map(
            (degree) => `
          <div class="degree-item">
            <h4>Degree ID: ${degree.degree_id}</h4>
            <p>Name: ${degree.degree_name}</p>
            <p>Year: ${degree.degree_year}</p>
            <p>Percentage: ${degree.degree_percentage}%</p>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    employeeDetailsModal.style.display = "block";
  }

  closeModalBtn.addEventListener("click", () => {
    employeeDetailsModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == employeeDetailsModal) {
      employeeDetailsModal.style.display = "none";
    }
  });

  function editEmployee(employee) {
    document.getElementById("emp_id").value = employee.emp_id;
    document.getElementById("emp_name").value = employee.emp_name;
    document.getElementById("emp_department").value = employee.emp_dep;
    document.getElementById("emp_salary").value = employee.emp_salary;
    document.getElementById("emp_contact").value = employee.emp_contact;

    degreesContainer.style.display = "block";
    showDegreeBtn.style.display = "none";
    degreesContainer.innerHTML = "";
    employee.degrees.forEach((degree) => addNewDegreeField(degree));

    formTitle.textContent = "Edit Employee";
    submitButton.textContent = "Update Employee";
    editingEmployeeId = employee.emp_id;
  }

  async function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        alert("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  }

  fetchEmployees();
  addNewDegreeField();
});
