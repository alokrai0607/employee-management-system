# Employee Management System

A fully-functional **Employee Management System** built using **Python** 🐍, **FastAPI** ⚡, and **MySQL** 🗄️.

## 🚀 How to Run the Application

### Step-by-Step Guide

1. **Open PowerShell** 💻:

   - Navigate to your desktop and open PowerShell.

2. **Clone the Repository** 📥:

   - Run the following command to download the repository:
     ```bash
     git clone https://github.com/alokrai0607/employee-management-system.git
     ```
   - The repository will be cloned to your desktop.

3. **Open the Project in VS Code** 📝:

   - Navigate to the downloaded `employee-management-system` folder.
   - Open the folder using **Visual Studio Code**.

4. **Open the Terminal in VS Code** 💡:

   - In the VS Code menu, go to `Terminal` → `New Terminal`.
   - Make sure you’re in the `employee-management-system` directory in the terminal.

5. **Set Up and Activate the Virtual Environment** 🔄:

   - Remove any existing virtual environment:
     ```bash
     Remove-Item -Recurse -Force .\venv
     ```
   - Create a new virtual environment:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     ```bash
     .\venv\Scripts\Activate
     ```
   - Install the required packages:
     ```bash
     pip install -r requirements.txt
     ```
   - If `requirements.txt` is not present, manually install the required packages:
     ```bash
     pip install uvicorn fastapi sqlalchemy mysqlclient
     ```
     
6. **Run the Application** 🚀:

   - Start the FastAPI server by executing:
     ```bash
     uvicorn app.main:app --reload
     ```
   - This will start the server at [http://127.0.0.1:8000](http://127.0.0.1:8000).

7. **Run the Frontend Application** 🌐:

   - Navigate to the frontend directory.
   - Run the following command to start a local HTTP server:
     ```bash
     http-server
     ```
   - This will serve your frontend application, allowing you to access the employee management interface.

8. **Visit the App** 🌐:

   - Open your web browser and go to [http://127.0.0.1:8000](http://127.0.0.1:8000) to see your Employee Management System in action!

### 🔧 Important Notes:

1. **Create the Database** 🛠️:

   - Manually create the database in MySQL.
   - The database name should match the one specified in the `config.py` file.

2. **Update Database Credentials** 🔐:

   - Open the `config.py` file.
   - Update your MySQL database credentials (username, password, host, port, and database name) according to your local MySQL setup.

---

With these steps, you’ll have your Employee Management System up and running! Feel free to contribute, raise issues, and suggest improvements. ✨
