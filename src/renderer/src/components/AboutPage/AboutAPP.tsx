export const AboutAPP = () => {
  return (
    <div className="p-10 dark:text-gray-200 text-gray-950">
      <h1 className="text-5xl font-semibold">
        Proyecto de Administración de Tareas con React y Electron
      </h1>
      <p className="text-base mt-5">
        Hemos desarrollado una aplicación de escritorio para la gestión de tareas usando React y
        Electron, combinando la modernidad del desarrollo web con la potencia de una aplicación de
        escritorio.
      </p>

      <h2 className="text-xl mt-5">Características Principales</h2>
      <ul className="ml-10 mt-2">
        <li>
          <strong>Interfaz Intuitiva</strong>: Diseño moderno y responsivo con React.
        </li>
        <li>
          <strong>Multiplataforma</strong>: Compatible con Windows, macOS y Linux gracias a
          Electron.
        </li>
        <li>
          <strong>Gestión de Tareas</strong>: Creación, edición, categorización y priorización de
          tareas con notificaciones.
        </li>
        <li>
          <strong>Atajos de Teclado</strong>: Navegación rápida y eficiente.
        </li>
        <li>
          <strong>Almacenamiento Seguro</strong>: Datos guardados localmente con opción de
          sincronización en la nube.
        </li>
      </ul>

      <h2 className="text-xl mt-5">Tecnologías Utilizadas</h2>
      <ul className="ml-10 mt-2">
        <li>
          <strong>React</strong> para la interfaz de usuario.
        </li>
        <li>
          <strong>Electron</strong> para empaquetado multiplataforma.
        </li>
        <li>
          <strong>Node.js</strong> para backend.
        </li>
      </ul>

      <h2 className="text-xl mt-5">Beneficios</h2>
      <p className="mt-2">
        Nuestra aplicación ofrece una interfaz rápida y fácil de usar, un desarrollo ágil y
        mantenimiento sencillo, mejorando la productividad y la experiencia del usuario en la
        gestión diaria de tareas.
      </p>
    </div>
  )
}
