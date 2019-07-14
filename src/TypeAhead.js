import React, { useEffect, useState } from 'react'
import { Loading } from './Loading'

//const baseApiUrl = 'https://jsonplaceholder.typicode.com/todos/'
const baseApiUrl = 'https://any-api.com:8443/http://xkcd.com/'

export const TypeAhead = () => {
  // allows use to get and set the value of param
  const [param, setParam] = useState('')
  // allows use to get and set the value of data
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchData = param => {
    setLoading(true)
    const url = `${baseApiUrl}${param}/info.0.json`
    return fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        setLoading(false)
        return response.json()
      })
      .then(data => setData(data))
  }

  // response to a change in the value of param
  useEffect(
    () => {
      // if param length is greater than 1 character
      if (param.length) {
        const newData = fetchData(param)
      }
    },
    [param]
  )

  return (
    <div className='typeahead-container'>
      <input defaultValue={param} onChange={e => setParam(e.target.value)} />
      {loading && <Loading />}
      {!loading && data &&
        <div>
          <img src={data.img} />
        </div>}
    </div>
  )
}
