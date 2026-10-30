// Importa useState, el "hook" de React que permite guardar datos que cambian
import { useState } from "react";
// Importa los estilos del archivo App.css
import "./App.css";

// Componente principal de la aplicación
export default function App() {
  // texto: lo que el usuario escribe en el input (empieza vacío)
  const [texto, setTexto] = useState("");
  // tareas: arreglo con todas las tareas (empieza vacío)
  const [tareas, setTareas] = useState([]);

  // Función que se ejecuta al enviar el formulario (agregar tarea)
  const agregar = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar
    if (!texto.trim()) return; // Si está vacío o solo espacios, no hace nada
    // Crea un arreglo nuevo con las tareas anteriores + la nueva
    // id: número único basado en la fecha, hecha: false = aún no completada
    setTareas([...tareas, { id: Date.now(), texto, hecha: false }]);
    setTexto(""); // Limpia el input
  };

  // Marca o desmarca una tarea como hecha
  const alternar = (id) => {
    setTareas(
      // Recorre las tareas; a la que coincide con el id le invierte "hecha"
      tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t))
    );
  };

  // Elimina una tarea
  const eliminar = (id) => {
    // Se queda solo con las tareas cuyo id sea distinto al eliminado
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // Lo que se muestra en pantalla (JSX)
  return (
    <main className="contenedor">
      <h1>Mis Tareas</h1>

      {/* Formulario: al enviarlo (Enter o botón) llama a agregar */}
      <form onSubmit={agregar} className="formulario">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={texto} // El input muestra lo que hay en el estado
          onChange={(e) => setTexto(e.target.value)} // Actualiza el estado al escribir
        />
        <button type="submit">Agregar</button>
      </form>

      {/* Lista de tareas */}
      <ul>
        {/* map recorre el arreglo y crea un <li> por cada tarea */}
        {tareas.map((t) => (
          // key ayuda a React a identificar cada elemento; si está hecha, agrega la clase "hecha"
          <li key={t.id} className={t.hecha ? "hecha" : ""}>
            {/* Al hacer clic en el texto, se marca/desmarca */}
            <span onClick={() => alternar(t.id)}>{t.texto}</span>
            {/* Botón para eliminar la tarea */}
            <button onClick={() => eliminar(t.id)}>✕</button>
          </li>
        ))}
      </ul>

      {/* Contador: cuenta las tareas hechas y el total */}
      <p>
        {tareas.filter((t) => t.hecha).length} de {tareas.length} completadas
      </p>
    </main>
  );
}
