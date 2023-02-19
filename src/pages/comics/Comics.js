import { useEffect, useState } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics?title=${search}&skip=${skip}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, skip]);

  // onChange Input Handlers
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="main-comic-page">
      <div className="comic-page-large-img">
        <img
          src="https://cdn.shopify.com/s/files/1/0152/6487/4560/products/Superior_Iron_Man__43863_e70e939d-cc31-4f45-a8e7-4519feae4d9a.jpg?v=1578760221"
          alt=""
        />
      </div>
      <div className="comic-box">
        <div className="search-pagination-box-comics">
          <div className="pagination-buttons-comics">
            <button
              className={counter === 0 ? "hidden" : "display"}
              value={skip}
              onClick={(event) => {
                console.log(skip);
                event.preventDefault();
                setSkip(skip - 100);
                setCounter(counter - 1);
              }}
            >
              BACK
            </button>
            <button
              value={skip}
              onClick={(event) => {
                console.log(skip);
                event.preventDefault();
                setSkip(0);
                setCounter(0);
              }}
            >
              {counter}
            </button>
            <button
              value={skip}
              onClick={(event) => {
                console.log(skip);
                event.preventDefault();
                setSkip(skip + 100);
                setCounter(counter + 1);
              }}
            >
              Next
            </button>
          </div>

          <input
            type="text"
            placeholder="Search here"
            onChange={handleSearchChange}
            value={search}
          />
          <span>COMICS</span>
        </div>
        <div className="comic-card-box">
          <div className="comic-card">
            {data.results.map((comic) => {
              return (
                <article key={comic._id}>
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt="character"
                  />
                  <p>{comic.title}</p>
                  <div className="comic-desc">{comic.description}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Comics;
