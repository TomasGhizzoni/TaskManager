import React, { useState } from "react";
import "./App.css";
import { createTask, deleteTask } from './taskCommands';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Compito 1", status: "Aperto" },
    { id: 2, name: "Compito 2", status: "Chiuso" },
  ]);
  const [modal, setModal] = useState({ open: false, task: null });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showClosed, setShowClosed] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const toggleModal = (task = null) => setModal({ open: !modal.open, task });

  const handleSave = () => {
    if (modal.task.id) {
      setTasks(tasks.map((t) => (t.id === modal.task.id ? modal.task : t)));
    } else {
      const newTask = createTask(modal.task.name, modal.task.status);
      setTasks([...tasks, newTask]);
    }
    toggleModal();
  };

  const confirmDeleteTask = (task) => setConfirmDelete(task);
  const handleDeleteConfirmed = () => {
    if (deleteTask(confirmDelete.id, tasks)) {
      setTasks([...tasks]);
    }
    setConfirmDelete(null);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setTasks(sortedTasks);
    setSortConfig({ key, direction });
  };

  window.createTaskCLI = (name, status = 'Abierta') => {
    const newTask = createTask(name, status);
    setTasks([...tasks, newTask]);
  };

  window.deleteTaskCLI = (id) => {
    if (deleteTask(id, tasks)) {
      setTasks([...tasks]);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <button onClick={() => toggleModal({ id: null, name: "", status: "Aperto" })}>
        ➕ Aggiungi compito
      </button>
      <button onClick={() => setShowClosed(!showClosed)} style={{ marginLeft: "10px" }}>
        {showClosed ? "Nascondi Chiusi" : "Mostra Chiusi"}
      </button>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Nome {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
              Stato {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "🔼" : "🔽") : ""}
            </th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tasks.filter(t => showClosed || t.status !== "Chiuso").map((task) => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.status}</td>
              <td>
                <button onClick={() => toggleModal(task)}>✏️ Modifica</button>
                <button onClick={() => confirmDeleteTask(task)} style={{ marginLeft: "10px" }}>
                  🗑️ Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modal.open && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              value={modal.task.name}
              onChange={(e) => setModal({ ...modal, task: { ...modal.task, name: e.target.value } })}
              placeholder="Nome del compito"
            />

            <select
              value={modal.task.status}
              onChange={(e) => setModal({ ...modal, task: { ...modal.task, status: e.target.value } })}
              style={{ marginTop: "10px" }}
            >
              <option value="Aperto">Aperto</option>
              <option value="Chiuso">Chiuso</option>
            </select>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleSave}>💾 Salva</button>
              <button onClick={toggleModal} style={{ marginLeft: "10px" }}>❌ Annulla</button>
            </div>
          </div>
        </div>
      )}

      
      {confirmDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>⚠️ ¿Sei sicuro di voler eliminare il compito "{confirmDelete.name}"?</p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleDeleteConfirmed}>✅ Sí, elimina</button>
              <button onClick={() => setConfirmDelete(null)} style={{ marginLeft: "10px" }}>❌ Annulla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
