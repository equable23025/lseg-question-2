import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface CategoryAPI {
  count: number;
  categories: string[]
}

function App() {
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://api.publicapis.org/categories').then(r => r.json()).then((data: CategoryAPI) => {
      setCategories(data.categories);
    })
  }, [])

  useEffect(() => {
    setResults(categories.filter(c => c.includes(search)))
  }, [search, categories])

  return (
    <div>
      <div>
        <span>Category Search: </span>
        <input value={search} onChange={(e) => { setSearch(e.target.value) }}></input>
      </div>
      <p style={{ fontWeight: 'bold' }}>Categories</p>
      <table>
        <tbody>
          {results.map(category => (<tr><td>{category}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
