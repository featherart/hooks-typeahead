import React, { useEffect, useState, useRef } from 'react'

const baseApiUrl = 'https://jsonplaceholder.typicode.com/todos/'

function App() {
  function useEffectOnce(cb) {
    const didRun = useRef(false)
    useEffect(() => {
      if (!didRun.current) {
        cb()
        didRun.current = true
      }
    })
  }

  useEffectOnce(() => {
    setData(JSON.parse(localStorage.getItem('dataSet')))
  })

  // allows use to get and set the value of param
  const [param, setParam] = useState('')
  // allows use to get and set the value of data
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const [dataSet, setDataSet] = useState({})

  const fetchData = param => {
    setLoading(true)
    console.log(param)
    const url = `${baseApiUrl}${param}`
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
    <div className="App">
      <h2>Hooks + RxJs</h2>
      <input defaultValue={param} onChange={e => setParam(e.target.value)} />
      {loading && <div> U FART? </div>}
      {data &&
        <div>
          <input type="checkbox" checked={data.completed} />
          {data.title}
        </div>}
    </div>
  )
}

export default App
