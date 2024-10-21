import React, { useState, useEffect } from 'react'

const List = () => {
  const [listado, setListado] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 12

  const getDatos = async () => {
    setLoading(true)
    try {
      const uri = "https://restcountries.com/v3.1/all"
      const response = await fetch(uri)
      const data = await response.json()
      setListado(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getDatos()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  };

  {/* Busqueda de paises por su nombre. */}
  const filteredList = listado.filter((pais) =>
    pais.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const startIndex = (page - 1) * limit
  const paginatedList = filteredList.slice(startIndex, startIndex + limit)

  return (
    <section className="py-32">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
          <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">Countries API REST</h1>
          <p className="text-gray-600">Here you will find all the information you need about every country in the world.</p>
          <form onSubmit={(e) => e.preventDefault()} className="items-center justify-center gap-3 sm:flex">
            <div className="relative">
              <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z" />
              </svg>
              <input
                type="text"
                placeholder="Search for a country"
                name="countrySearch"
                id="countrySearch" 
                value={search}
                onChange={handleSearch}
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg sm:max-w-xs"
              />
            </div>
            <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
              Search
            </button>
          </form>
        </div>

        {/* Manejar los estados de carga y error. */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <ul className="grid gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedList.map((pais, index) => (
                <li className="w-full bg-white rounded-lg shadow-lg p-5" key={index}>
                  <img src={pais.flags.png} alt={`${pais.name.common} Flag`} className="w-full h-32 object-cover rounded-lg" />
                  <h3 className="text-xl font-semibold mt-3">{pais.name.common}</h3>
                  <p> <span className='font-semibold'>Capital:</span> {pais.capital}</p>
                  <p> <span className='font-semibold'>Continent:</span> {pais.continents.join(', ')}</p>
                  <p> <span className='font-semibold'>Population:</span> {pais.population}</p>
                  <p> <span className='font-semibold'>Languages: </span>
                    <span>{pais.languages ? (
                      Object.entries(pais.languages).map(([code, name]) => name).join(', ')
                    ) : (
                      'No languages available'
                    )}</span>
                  </p>
                  <p className='mb-3'> <span className='font-semibold'>Currency: </span>
                    <span>{pais.currencies ? (
                      Object.entries(pais.currencies).map(([code, currency]) => currency.name).join(', ')
                    ) : (
                      'No currency available'
                    )}</span>
                  </p>
                  <a href={pais.maps.googleMaps} target='_blank' rel="noopener noreferrer" className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">Google Maps</a>
                </li>
              ))}
            </ul>

            {/* Paginación */}
            <div className='max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8'>
              <div className='flex items-center justify-between text-sm text-gray-600 font-medium'>
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className='px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 disabled:opacity-50'>Previous</button>
                <div>
                  Page {page}
                </div>
                <button disabled={startIndex + limit >= filteredList.length}
                  onClick={() => setPage(page + 1)} className='px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50 disabled:opacity-50'>Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default List
