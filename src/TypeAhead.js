import React, { useEffect, useState } from 'react'
import { Loading } from './Loading'

const baseApiUrl = 'https://any-api.com:8443/http://xkcd.com/'

// adopted from david walsh debounce
function debounce(func, wait) {
  let timeout

  return function executedFunction() {
    const context = this
    const args = arguments
    const later = function() {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export const TypeAhead = () => {
  // allows use to get and set the value of param
  const [param, setParam] = useState('')
  // allows use to get and set the value of data
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  async function fetchData(param) {
    setLoading(true)
    const url = `${baseApiUrl}${param}/info.0.json`
    return await fetch(url, {
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
        const newData = debounce(fetchData(param), 500)
      }
    },
    [param]
  )

  return (
    <div className="typeahead-container">
      <input defaultValue={param} onChange={e => setParam(e.target.value)} />
      {loading && <Loading />}
      {!loading &&
        data &&
        <div>
          <img src={data.img} />
        </div>}
    </div>
  )
}
