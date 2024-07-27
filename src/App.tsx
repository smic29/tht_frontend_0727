import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Table from './components/table';

function App() {
  const [data, setData] = useState<any[]>(JSON.parse(localStorage.getItem('tasks') || '[]'))
  const [isLoading, setIsLoading] = useState<boolean>(data.length < 15)
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('/random')
      if (!response.ok) {
        throw new Error('Error with response')
      }
      const result = await response.json()
      
      setData(prevData => {
        const updatedData = [...prevData, result]

        if (updatedData.length >= 15) {
          localStorage.setItem('tasks', JSON.stringify(updatedData.slice(0, 15)))
          setIsLoading(false)
        }
        return updatedData
      })

      if (data.length < 15) {
        fetchData();
      }
      
    } catch (error:any) {
      setError(error.message)
    } 
  };

  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [isLoading])

  return (
    <div className="App container mx-auto px-4 py-4">
      { isLoading ? "Loading Data..." : <Table taskData={data} />}
    </div>
  );
}

export default App;
