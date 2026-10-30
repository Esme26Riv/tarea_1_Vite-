import { useState } from "react";
import "./App.css";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setTareas([...tareas, { id: Date.now(), texto, hecha: false }]);
    setTexto("");
  };

  const alternar = (id) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  };

  const eliminar = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <main className="contenedor">
      <h1>Mis Tareas</h1>

      <form onSubmit={agregar} className="formulario">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map((t) => (
          <li key={t.id} className={t.hecha ? "hecha" : ""}>
            <span onClick={() => alternar(t.id)}>{t.texto}</span>
            <button onClick={() => eliminar(t.id)}>✕</button>
          </li>
        ))}
      </ul>

      <p>
        {tareas.filter((t) => t.hecha).length} de {tareas.length} completadas
      </p>
    </main>
  );
}