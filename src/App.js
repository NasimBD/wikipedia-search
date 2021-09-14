import {useState} from "react";

function App() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [searchInfo, setSearchInfo] = useState({});

    const handleSearch = e => {
        e.preventDefault();

        const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=15&srsearch=${search}`;

        fetch(wikiURL)
            .then(res => res.json())
            .then(res => {
            setResults(res.query.search);
            setSearchInfo(res.query.searchinfo);
            }).catch( err => { console.log('e',err) } )
    }

  return (
    <div className="App">
          <h1>Search Wikipedia</h1>
          <form className="search-box" onSubmit={handleSearch}>
              <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Wikipedia"/>
          </form>
          {( searchInfo.totalhits) ? <p><span className="results-number">{searchInfo.totalhits}</span> Results</p> : ''}
        <div className="results">
            {results.map((result, i) => {
                const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
                return (
                    <div className="result" key={i}>
                        <h3>{ result.title }</h3>
                        <p dangerouslySetInnerHTML={{__html: result.snippet}}></p>
                        <a href={url} target="_blank" rel="noreferrer">Read more</a>
                    </div>
                )
            })}
        </div>
    </div>
  );
}

export default App;