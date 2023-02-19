import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [favourite, setFavourite] = useState([]);
  const [counter, setCounter] = useState(0);

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/characters?name=${search}&skip=${skip}`
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

  const addFavourite = (fav) => {
    setFavourite([...favourite, fav]);
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section>
      <main className="main-character-page">
        <div className="character-page-large-img">
          <img
            src="https://cdn.shopify.com/s/files/1/0152/6487/4560/products/BlackWidow_003.jpg?v=1593471870&width=3000"
            alt=""
          />
        </div>
        <div className="character-box">
          <div className="search-pagination-box">
            <div className="pagination-buttons">
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
            <span>CHARACTERS</span>
          </div>
          <div className="character-card-box">
            <div className="character-card">
              {data.results.map((character) => {
                const characterData = [
                  character.name,
                  character.thumbnail.path +
                    "." +
                    character.thumbnail.extension,
                ];
                return (
                  <article key={character._id}>
                    <Link to={`/character/${character._id}`}>
                      <img
                        src={
                          character.thumbnail.path +
                          "." +
                          character.thumbnail.extension
                        }
                        alt="character"
                      />
                    </Link>
                    <div className="title-favButton">
                      <p>{character.name}</p>
                      <button
                        className="add-favourites"
                        onClick={() => {
                          addFavourite(characterData);
                          // console.log(characterData);
                          // const name = character.name;
                          // console.log(name);
                          // const img =
                          //   character.thumbnail.path +
                          //   "." +
                          //   character.thumbnail.extension;
                          // console.log(img);
                          const token = character._id;
                          Cookies.set("token", token, {
                            expires: 10,
                          });

                          navigate("/favourites", {
                            state: {
                              // characterName: { name },
                              // characterImg: { img },
                              characterToken: { token },
                              characterNameData: characterData[0],
                              characterImgData: characterData[1],
                            },
                          });
                        }}
                      >
                        add fav
                      </button>
                    </div>
                    <div className="character-desc">
                      {character.description}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
export default Home;
