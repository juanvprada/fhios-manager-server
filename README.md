# ⚙️ FHIOS Manager (Backend)

¡Bienvenido a **FHIOS Manager**! 🎉  

La eficiencia en la gestión de proyectos es clave para el éxito de cualquier empresa. **Fhios**, una empresa comprometida con la excelencia en la gestión de proyectos tecnológicos, se encontraba buscando una herramienta que no solo optimizara la organización de sus equipos, sino que también facilitara la colaboración y la comunicación entre todos los miembros involucrados.

Fue en este contexto cuando Fhios confió en nosotros para desarrollar una solución a medida que pudiera abordar sus necesidades específicas. **FHIOS Manager** nació de esa confianza y de la visión compartida de un equipo que, con pasión y dedicación, trabajó incansablemente para ofrecer algo más que una simple herramienta de gestión de proyectos.

Nos propusimos crear una plataforma que no solo respondiera a los requisitos técnicos del cliente, sino que también mejorara la experiencia de todos los usuarios que interactuarían con ella. Desde los desarrolladores hasta los líderes de proyecto, cada rol y función fue diseñado para facilitar el trabajo en equipo, el seguimiento de tareas y la creación de reportes.

**FHIOS Manager** es el resultado de un esfuerzo conjunto de un equipo talentoso que, inspirado en metodologías ágiles como Scrum y Kanban, creó una herramienta poderosa y fácil de usar, construida sobre una arquitectura robusta y flexible.

Hoy, estamos orgullosos de presentar esta plataforma a **Fhios**, confiando en que será un catalizador para una mayor productividad, comunicación fluida y gestión efectiva de proyectos. 🚀



## 🌟 Descripción General  

El backend soporta las funcionalidades principales de la plataforma: 

- 🔒 **Autenticación y Roles**: Gestión de usuarios y permisos (Project Manager, Tech Leader, Desarrollador, HelpDesk).
  
- 🗂️ **Gestión de Proyectos y Tareas**: CRUD completo con seguimiento del progreso.
  
- 📈 **Reportes Automatizados**: Generación de informes descargables en PDF o Excel.
  
- 🔔 **Notificaciones**: Alertas automáticas para modificaciones en tiempo real.
  


## 🛠️ Tecnologías Principales  

### Backend:  

- 🟦 **Node.js**: Entorno de ejecución para JavaScript.
  
- 📦 **Express**: Framework para construir APIs robustas.
  
- 🛡️ **JWT (JSON Web Tokens)**: Para la autenticación segura de usuarios.
  
- 🔒 **bcrypt**: Hash seguro de contraseñas.
  
- 🗄️ **MySQL**: Base de datos relacional.
  
- 🧹 **Validator**: Validación de entradas del usuario.
  

### ORM y Tipado:  

- 🛠️ **Sequelize**: ORM para la gestión de bases de datos.
  
- 📝 **TypeScript**: Para un desarrollo tipado y seguro.
  

### Metodología de Trabajo:  

- 📋 **Trello**: Gestión del flujo de trabajo.
  
- 🔄 **Kanban**: Métodos ágiles para la organización de tareas.
  

## 🚀 Roadmap

Fases del proyecto:

•	📝 Diseño: Diagramas y especificación de requerimientos.

•	👨‍💻 Desarrollo: Implementación iterativa basada en sprints.

•	✅ Pruebas: Validación funcional y de integración.

•	🚢 Despliegue: Publicación en la nube.


## 📋 Instalación y Uso  

1. **Clona el repositorio:**

    ```bash Copiar
      git clone https://github.com/juanvprada/fhios-manager-server.git
    ```

2. **Instala las dependencias:**

   ```bash
     npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo .env en la raíz del proyecto con las siguientes variables:

    ```bash
    DATABASE_URL=tu_url_de_base_de_datos
    PORT=3000
    JWT_SECRET=tu_secreto
    ```
    
4. **Inicia el servidor:**
   
    ```bash
    npm run dev
    ```


## 🎯 Funcionalidades Clave

**Gestión de Proyectos y Usuarios:**

  o	CRUD completo para proyectos, tareas, usuarios y documentos.

  o	Asignación de roles y permisos personalizados.

**Notificaciones Dinámicas:**

  o	Envío de notificaciones automáticas ante cualquier cambio.

**Generación de Reportes:**

  o	Exportación en formatos descargables (PDF, Excel).


## 📚 Documentación y Manual Técnico

### 📑 Documentación de la API

Toda la documentación de la API del backend está disponible a través de Postman. En ella encontrarás una descripción detallada de todas las rutas y cómo utilizarlas.

Puedes acceder a la documentación completa desde el siguiente enlace: [![Postman Documentation](https://img.shields.io/badge/Postman-Documentation-blue?style=for-the-badge&logo=postman&link=https://documenter.getpostman.com/view/38671791/2sAYBbc8hL#99b90137-aca8-4500-9a8a-f99f1e3f88a8)](https://documenter.getpostman.com/view/38671791/2sAYBbc8hL#99b90137-aca8-4500-9a8a-f99f1e3f88a8)


### 📘 Manual Técnico

El Manual Técnico contiene información sobre la arquitectura del backend, las decisiones de diseño, los flujos de trabajo implementados, y detalles sobre las tecnologías utilizadas en el proyecto. Este documento es esencial para los desarrolladores que deseen contribuir o comprender a fondo la estructura y funcionamiento de FHIOS Manager.

Puedes consultar el Manual Técnico en formato PDF a través del siguiente enlace:[![Manual Técnico PDF](https://img.shields.io/badge/Manual%20T%C3%A9cnico-PDF-red?style=for-the-badge&logo=pdf&link=./docs/manual-tecnico.pdf)](https://github.com/juanvprada/fhios-manager-server/blob/main/FHIOS_MANAGER_MT.pdf)


  ## 👥 Equipo de Desarrollo

Detrás de **FHIOS Manager** hay un equipo increíble de desarrolladores, comprometidos con crear herramientas que transforman la gestión de proyectos. ¡Conoce a nuestro talentoso equipo! 🚀  

- **Juan Vazquez**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juanvprada/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juanvprada)

- **Mariela Adimari**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mariela-adimari/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marie-adi)

- **Arturo Mencia**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/arturomencia/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Arthurmm77)

- **Omar Lengua**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/omarlengua/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Omarlsant)

- **Mónica Serna**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/monicasernasantander/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/monicaSernaS)

- **Jhon Smith**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/smith-develop/)  
  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Smith-Develop)


## 🔗 Enlaces Útiles

Repositorio Frontend:  [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juanvprada/fhios-manager-client)


## 📜 Licencia

Este proyecto está bajo la Licencia MIT. ¡Aporta tus ideas y mejoras! 🌟 🚀