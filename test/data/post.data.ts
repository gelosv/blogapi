import { Role } from '@prisma/client'
import bcrypt from 'bcrypt'

export const posts = [
  {
    id: 1,
    title: "Introducción a JavaScript",
    content: "JavaScript es un lenguaje de programación versátil utilizado para el desarrollo web.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 2,
    title: "Ventajas de TypeScript",
    content: "TypeScript agrega tipado estático a JavaScript, mejorando la mantenibilidad del código.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 3,
    title: "Qué es React y por qué usarlo",
    content: "React es una biblioteca de JavaScript para construir interfaces de usuario de manera eficiente.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 4,
    title: "Programación funcional en JavaScript",
    content: "La programación funcional permite escribir código más limpio y predecible.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 5,
    title: "Cómo funciona el event loop en JavaScript",
    content: "El event loop es fundamental para entender la ejecución asíncrona en JavaScript.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 6,
    title: "Manejo de errores en JavaScript",
    content: "Usar try-catch y promesas correctamente mejora la estabilidad de las aplicaciones.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 7,
    title: "Introducción a Node.js",
    content: "Node.js permite ejecutar JavaScript en el backend, utilizando el motor V8 de Chrome.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 8,
    title: "Diferencias entre var, let y const",
    content: "Es importante conocer el alcance y comportamiento de cada tipo de variable en JavaScript.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 9,
    title: "Uso de Fetch API en JavaScript",
    content: "Fetch API permite realizar peticiones HTTP de manera sencilla y moderna.",
    writerId: 2,
    categorieId: 1
  },
  {
    id: 10,
    title: "Closures en JavaScript",
    content: "Los closures permiten mantener el estado de una función incluso después de que esta se haya ejecutado.",
    writerId: 2,
    categorieId: 1
  }
]

export const categories = [
  {
    id: 1,
    name: 'Informática'
  }
]

export const users = [
  {
    id: 1,
    name: 'Pedro',
    nickname: 'pedrin',
    password: bcrypt.hashSync('1234', 10),
    rol: Role.USER
  },
  {
    id: 2,
    name: 'Marco',
    nickname: 'marcx',
    password: bcrypt.hashSync('1234', 10),
    rol: Role.WRITER
  }
]