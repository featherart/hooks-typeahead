import React, { useEffect, useState } from 'react'

const baseApiUrl = 'https://jsonplaceholder.typicode.com/todos/'

function App() {
  // useEffectOnce(() => {
  //   setData(JSON.parse(localStorage.getItem('data')))
  // })
  // allows use to get and set the value of param
  const [param, setParam] = useState('')
  // allows use to get and set the value of data
  const [data, setData] = useState({})

  const fetchData = param => {
    const url = `${baseApiUrl}${param}`
    return fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => setData(data))
  }

  // response to a change in the value of param
  useEffect(
    () => {
      console.log('hihi', param)
      // if param length is greater than 1 character
      if (param.length) fetchData(param)
    },
    [param]
  )

  return (
    <div className="App">
      <h2>Hooks + RxJs</h2>
      <input defaultValue={param} onChange={e => setParam(e.target.value)} />
      {data &&
        <div>
          <input type="checkbox" checked={data.completed} />
          {data.title}
        </div>}
    </div>
  )
}

export default App
