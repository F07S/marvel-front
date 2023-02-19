// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";

const Favourites = () => {
  //   const favoriteFromLocalStorage = localStorage.getItem("name", "img");
  //   const [favourite, setFavourite] = useState([favoriteFromLocalStorage]);

  //   const location = useLocation();
  //   const { characterToken, characterNameData, characterImgData } =
  //     location.state;

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

  return <p>Favourites Page</p>;
  //   (
  //     favourite && (
  //       <div>
  //         <div>
  //           <p>{favCart[0]}</p>
  //           <img src={favCart[1]} alt="" />
  //         </div>
  //       </div>
  //     )
  //   );
};
export default Favourites;
