# API REST de un blog

	API que permite realizar distintas operaciones dentro de un blog

Lenguaje: TypeScript
Framework: Express
Base de datos: MySQL

### Características generales:
- Desarrollo de flujo CI / CD
- Despliegue automático en AWS ECS
- Uso de contenedores Docker (desarrollo y producción)
- Optimización de imágenes Docker para producción
- Implementación de autenticación usando JWT
- Autorización basada en roles
- Test de API
- Validación de datos
- Filtros y paginación de datos

### Lo que puede hacer la API:

- La API realiza la autenticación y autorización basada en roles, actualmente existen 2:
	- USER
	- WRITER

El USER, puede:
- Listar y filtrar los posts
- Ver un post específico
- Dar like a un post
- Realizar comentarios sobre los posts
- Entre otras cosas más.
**Para mayor información véase la documentación**

El WRITER, puede:
- Realizar todas la acciones de los usuarios.
- Crear sus propios posts
- Eliminar sus posts
**Para mayor información véase la documentación**
### Documentación

	Para mayor información de lo que puede hacer la API, se elaboró una documentación con swagger

[Ver documentación](https://blogproduction.onrender.com/api-docs/)
