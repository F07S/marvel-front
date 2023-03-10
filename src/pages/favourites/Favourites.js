import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Favourites = ({ token }) => {
  const [data, setData] = useState();
  const [commentsData, setCommentsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--zb2pjvnm674v.code.run/favourites`
          // `http://localhost:4000/favourites`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchFavourites();
  }, []);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        // "http://localhost:4000/favourites/comments",
        "https://site--marvel-backend--zb2pjvnm674v.code.run/favourites/comments",

        {
          name: name,
          comment: comment,
        }
      );
      setCommentsData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--zb2pjvnm674v.code.run/comments`
          // `http://localhost:4000/comments`
        );
        // console.log(response.data);
        setCommentsData(response.data);
        setIsCommentLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchComments();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="fav-com">
      <section className="favourites">
        {!token
          ? navigate("/")
          : data.favourites.map((fav) => {
              // console.log(fav._id);
              return (
                <div className="favourite-card" key={fav._id}>
                  <p>{fav.name}</p>
                  <img className="favImage" src={fav.image} alt="character" />
                  <button
                    onClick={async () => {
                      try {
                        const response = await axios.delete(
                          `https://site--marvel-backend--zb2pjvnm674v.code.run/favourites/delete/${fav._id}`
                          // `http://localhost:4000/favourites/delete/${fav._id}`
                        );
                        setData(response.data);
                        // console.log(response.data);
                      } catch (error) {
                        console.log(error.response.data);
                      }
                    }}
                  >
                    delete fav
                  </button>
                </div>
              );
            })}
      </section>
      {isCommentLoading ? (
        <p>Loading comments...</p>
      ) : (
        <section className="comment-section">
          <form
            className="input-area"
            onSubmit={(event) => {
              event.preventDefault();
              handleCommentSubmit();
            }}
          >
            <p>Leave a comment...</p>

            <input
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
              value={name}
            />
            <textarea
              placeholder="Write your comment here..."
              rows={4}
              cols={40}
              onChange={handleCommentChange}
              value={comment}
            />

            <button>Post</button>
          </form>
          <div>
            {commentsData.comments.map((com) => {
              // console.log(com._id);
              return (
                <div className="comments" key={com._id}>
                  <p className="user">{com.name}</p>
                  <p>{com.comment}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </section>
  );
};
export default Favourites;
