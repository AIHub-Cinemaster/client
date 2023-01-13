import { useCookies } from "react-cookie";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import ReviewCard from "../../modals/contents/pages/ReviewCard";
import MovieModal from "../../modals/MovieModal";
import emptyBox from "./../../../assets/images/empty.png"
import { getReviewsByUser } from "lib/api/review";

const ReviewBox = ({review, getReviewDataByUser}) =>{
  const [isOpen, setOpen] = useState(false);

  useEffect(()=>{
    getReviewDataByUser()
  },[isOpen])

  return (
    <>
      <div onClick={()=>{
          setOpen(true);
          $('body').css("overflow", "hidden");
          $('.react-multiple-carousel__arrow').css("display", "none");
        }} >
          <ReviewCard 
            review={review} 
            getReviewData={getReviewDataByUser}
          />
      </div>
      
      <MovieModal isOpen={isOpen} setOpen={setOpen} movie_id={review.movieId} />
    </>
  )
}

const MyWrittenList = () => {
  const [reviewsByUser, setReviewsByUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

  useEffect(()=>{
    getReviewDataByUser()
  },[])

  const getReviewDataByUser = () => {
    getReviewsByUser(cookies.userData.shortId).then(response=>{
      setReviewsByUser(response.data);
    })
  }

  return (
    <>
      {
        reviewsByUser.length === 0 ? (
          <>
            <div style={{textAlign:"center"}}>
              <img src={emptyBox} width="300px" className="m-5"/>
            </div>
          </>
        ) : (
          <>
            {reviewsByUser.map((review, index) => (
              <ReviewBox key={index} review={review} getReviewDataByUser={getReviewDataByUser} />
            ))}
          </>
        )
      }
    </>
  );
};

export default MyWrittenList;
