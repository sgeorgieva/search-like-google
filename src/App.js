import React from 'react';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ListResults from './components/ListResults';

function App() {
  let [results, setResults] = useState([]);
  let [searchInformation, setSearchInformation] = useState({});
  let [items, setItems] = useState([]);
  let data = [
    "react js",
    "react js tutotrial",
    "react jsx",
    "react js documentation",
    "react js interview questions",
    "react json schema form",
    "react jwt",
    "react jss",
    "react jsx for loop",
    "react js hooks",
    "react js components",
    "java", 
    "javascript", 
    "php", 
    "c#", 
    "go", 
    "dart", 
    "html", 
    "http", 
    "css"
  ];

  const fetchData = (value) => {
    // fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCK0WH6eGqTdvrlrxr_tdRZFmaVav-_qvw&cx=c1a00945955654fe9&q=${value}`)
    // fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCiCEHRd-P9eWRmCIvtkpAXmi5RE2nXwqQ&cx=c1a00945955654fe9&q=${value}`)
    // fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCiCEHRd-P9eWRmCIvtkpAXmi5RE2nXwqQ&cx=c1a00945955654fe9&queries=nextPage&q=${value}`)
    // fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAC3Q6ik9U_ykisoj2xwGnSXPKXWButTLI&cx=c1a00945955654fe9&q=${value}`)
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA_Hm6-4jn8yTgM9tw1xJZ5U8scR_t2U40&cx=c1a00945955654fe9&q=${value}`)
      .then(response => response.ok ? response.json() : Promise.reject(response))
      .then(data => {
        setResults(data.items);
        setSearchInformation(data.searchInformation);
      })
      .catch(err => console.log(err));
  }

  return (
      <center>
        <header>
          <h1 className="header">SearchX</h1>
        </header>
        <SearchBar fetchHandler={(e) => fetchData(e)} results={results} items={items} data={data} setItems={setItems} />
        {results && results.length > 0 && <ListResults items={results} searchInformation={searchInformation} />}
      </center>
  );
}

export default App;
