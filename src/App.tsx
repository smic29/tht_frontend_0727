import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Table from './components/table';
import Button from './components/button';

function App() {
  const [data, setData] = useState<any[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
  const [isLoading, setIsLoading] = useState<boolean>(data.length < 15)
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null)
  
  const fetchData = async () => {
    if (data.length >= 15) {
      return
    }

    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch('/random', {signal})
      if (!response.ok) {
        throw new Error(`${response.statusText}`)
      }
      const result = await response.json()
      
      setData(prevData => {
        const updatedData = [...prevData, result]
        if (updatedData.length >= 15) {
          localStorage.setItem('tasks', JSON.stringify(updatedData.slice(0, 15)))
          setIsLoading(false)
          abortControllerRef.current?.abort()
        }
        return updatedData
      })

      if (data.length < 15) {
        fetchData();
      }
      
    } catch (error:any) {
      if (error.name !== 'AbortError') {
        setError(error.message)
        setIsLoading(false)
      }
    } 
  };

  useEffect(() => {
    if (isLoading) {
      fetchData()
    }

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [isLoading])

  const printToConsole = () => {
    console.log(data)
    alert("Data printed on console, use inspect to view")
  }

  return (
    <div className="App container mx-auto px-4 py-4">
      { isLoading ? `Loading Data...${data.length}/15` : error ? `Something went wrong: ${error}` :
      <>
        <Table taskData={data} />
        <div className="flex flex-row justify-center">
          <Button text="JSON" data={data} />
          <Button text="CSV" data={data} />
          <Button text="Console" onClick={printToConsole} />
        </div>
      </>
      }
    </div>
  );
}

export default App;
