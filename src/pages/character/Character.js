import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  // console.log(id);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/character/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };
    const fetchRelatedComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics/character/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };
    fetchCharacter();
    fetchRelatedComics();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="main-character-info">
      <div>
        <div className="character-comic-page">
          <div className="character-profile">
            <img
              className="character-picture"
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt="character"
            />
            <p className="character-n">{data.name}</p>
            <div className="character-d">{data.description}</div>
          </div>
          <div className="related-comics">
            {data.comics.map((comics) => {
              // console.log(comics.thumbnail.path);

              return (
                <article className="related-comic-card">
                  {comics.thumbnail &&
                    comics.thumbnail.path &&
                    comics.thumbnail.extension && (
                      <img
                        className="comic-picture"
                        src={
                          comics.thumbnail.path +
                          "." +
                          comics.thumbnail.extension
                        }
                        alt="character"
                      />
                    )}
                  <p className="comic-n">{comics.title}</p>
                  {/* <div className="comic-d-box">
                    <div className="comic-d">{comics.description}</div>
                  </div> */}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Character;
