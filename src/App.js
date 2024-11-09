import './App.css';
import { useEffect, useState } from "react"

function App() {
  const [keyword, setKeyword] = useState("")
  const [isLoading, setisLoading] = useState(true)
  const [track, setTrack] = useState([]);

  const getTrack = async () => {
    setisLoading(true)
    let data = await fetch(`https://v1.nocodeapi.com/rohit_1309/spotify/pkbiLcnmKqRTgQOq/search?q=${keyword===""?"trending":keyword}&type=track`)
    let convertData = await data.json()
    setTrack(convertData.tracks.items);
    setisLoading(false);
  }

  useEffect(() => {
    getTrack()
  }, [])
  

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href='/'>v-music</a>
          <div
            className='collapse navbar-collapse d-flex justify-content-center'
            id='navbarSupportedContent'>

            <input
              value={keyword}
              onChange={event => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTrack} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
        <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>

          </div>
        </div>
        <div className="row">
          {
            track.map((element) => {
              return (
                <div key={element.id} className="col-lg-3 col-md-6 py-4">

                  <div className="card" style={{ width: "18rem" }}>
                    <img src={element.album.images[0].url} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                      <p className="card-text">
                        Artist: {element.album.artists[0].name}
                      </p>
                      <p className="card-text">
                        release date: {element.album.release_date}
                      </p>
                      <audio src={element.preview_url}
                        controls
                        className='w-100'
                      ></audio>
                    </div>
                  </div>

                </div>)
            })
          }
        </div>
      </div>
    </>
  )
}

export default App;
