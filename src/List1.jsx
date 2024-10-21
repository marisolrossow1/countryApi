import React, { useState, useEffect } from 'react'

const List = () => {

    const [ listado, setListado ] = useState([])
    const [ page, setPage ] = useState(0)

    const getDatos = async () => {
        try {
            const uri = "https://restcountries.com/v3.1/all"
            const paises = await fetch(uri)
            const jsonPaises = await paises.json()
            setListado(jsonPaises.results)
        } catch (error) {
            console.error(error)
        }  
    }
    console.log(listado)

    useEffect( () => {
      if( listado.length == 0 || listado.length == undefined ){
        getDatos("https://restcountries.com/v3.1/all")
      } else {
        getDatos("")
      }
      getDatos()
    }, [page])

  return (
    <ul>
      {/* <button onClick={getDatos}>Hacer Fetch</button> */}
      {
        listado.map( (pais, indice) => {
          return <li key={indice}>{pais.name}</li>
        })
      }
    </ul>
  )
}

export default List