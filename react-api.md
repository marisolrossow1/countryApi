# Consumo de API REST con React Hooks

## Objetivo
Crear un componente React que obtenga datos de una API REST y los muestre en una interfaz de usuario utilizando hooks.

## Descripción
En este ejercicio, desarrollarás un componente React llamado `List` que realizará una solicitud a la API de JSONPlaceholder o alguna otra api que ustedes conozcan que no tenga autenticacion para obtener una lista y mostrarla en la interfaz.

## Requisitos

1. Utilizar React con hooks (useState y useEffect).
2. Realizar una solicitud GET a la API de JSONPlaceholder (https://jsonplaceholder.typicode.com/users) o alguna otra api que ustedes conozcan que no tenga autenticacion.
3. Mostrar la información de los usuarios en una lista o grid.
4. Manejar los estados de carga y error.

## Pasos

1. Crea un nuevo proyecto de React (si aún no lo has hecho).
2. Crea un nuevo componente llamado `List.js`.
3. Implementa la lógica para obtener los datos de la API usando `fetch` y el hook `useEffect`.
4. Utiliza el hook `useState` para manejar el estado del listado, la carga y los errores.
6. Implementa el manejo de errores y el estado de carga.
7. Importa y utiliza el componente `List` en tu componente principal (por ejemplo, `App.js`).

## Código base

Aquí tienes un código base para comenzar:

```jsx
import React, { useState, useEffect } from 'react';

const List = () => {
  const [item, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Implementa la lógica para obtener los usuarios de la API
  }, []);

  // Implementa el renderizado de la lista de usuarios

  return (
    // Retorna el JSX para mostrar la lista de usuarios
  );
};

export default List;
```

## Tareas adicionales (opcionales)

1. Implementa una función de búsqueda para filtrar usuarios por nombre.
2. Agrega paginación para mostrar un número limitado de usuarios por página.

## Recursos

- [Documentación de React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Documentación de la API de JSONPlaceholder](https://jsonplaceholder.typicode.com/)
