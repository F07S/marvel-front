// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

// const Favourites = () => {
//   const favoriteFromLocalStorage = localStorage.getItem("name", "img");
//   const [favourite, setFavourite] = useState([favoriteFromLocalStorage]);

//   const location = useLocation();
//   const { characterToken, characterNameData, characterImgData } =
//     location.state;

//   console.log(characterToken);
//   window.localStorage.setItem("name", characterNameData);
//   window.localStorage.setItem("img", characterImgData);

//   const [favCart, setFavCart] = useState([characterNameData, characterImgData]);

//   useEffect(() => {
//     try {
//       window.localStorage.setItem("name", favCart[0]);
//       window.localStorage.setItem("img", favCart[1]);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [favourite]);

//   return (
//     favourite && (
//       <div>
//         <div>
//           <p>{favCart[0]}</p>
//           <img src={favCart[1]} alt="" />
//         </div>
//       </div>
//     )
//   );
// };
// export default Favourites;

{
  /* <button
                          className="add-favourites"
                          onClick={() => {
                            addFavourite(characterData);
                            console.log(characterData);
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
                        </button> */
}
