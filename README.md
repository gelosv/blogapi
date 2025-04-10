# API REST de un blog

	API que permite realizar distintas operaciones dentro de un blog

### Conceptos aplicados:
- Desarrollo de flujo CI / CD utilizando Github Actions
- Despliegue automatizado en AWS ECS
- Uso de contenedores Docker para desarrollo y producción
- Optimización de imágenes Docker para producción
- Implementación de autenticación usando JWT
- Autorización basada en roles
- Realización de testing a la API usando Jest
- Validación de datos
- Filtros y paginación de datos

**Tecnologías:** TypeScript, ExpressJs, MySQL, Prisma, JWT, Docker, CI/CD (github actions), Jest, AWS ECS

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

## Ejecución

Primero se debe configurar las variables de entorno necesarias:
- PORT=3000
- JWT_KEY=ajwtkey
- DATABASE_PASSWORD=somepassword

Para levantar el proyecto se debe ejecutar el docker-compose asociado

	docker compose -f docker-compose.yml up

 El comando inicia completamente el proyecto en localhost:3000

