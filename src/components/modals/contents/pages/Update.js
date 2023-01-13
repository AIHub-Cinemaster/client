import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import axios from "axios";
import { getReview } from "lib/api/review";

const Update = ({
  setUpdateIsOpen,
  reviewId,
  getReviewData,
  movieId,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    getReview(cookies.userData.shortId, reviewId).then((response) => {
      setUpdateData(response.data);
    });
  }, []);

  const onChangeUpdateData = (event) => {
    // value 값에 따라 별 색칠
    if (event.target.name === "star") {
      $(`.star .color_star`).css({ width: `${event.target.value * 10 * 2}%` });
    }

    setUpdateData({
      ...updateData,
      [event.target.name]: event.target.value,
    });
  };

  const onClickUpdateButton = () => {
    updateData(updateData).then((response) => {
        getReviewData(movieId);
        setUpdateIsOpen(false);
      })
  };

  return (
    <div className="review-create-card">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          TITLE
        </label>
        <input
          type="text"
          className="form-control"
          defaultValue={updateData.title}
          onChange={onChangeUpdateData}
          name="title"
          id="title"
          placeholder="Title Here"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="star" className="form-label">
          STAR
        </label>
        <br />
        <span className="star">
          ★★★★★
          <span
            className="color_star"
            style={{ width: `${Number(updateData.star) * 10 * 2}%` }}
          >
            ★★★★★
          </span>
          <input
            name="star"
            type="range"
            step=".5"
            min="0"
            max="5"
            defaultValue={updateData.star}
            onChange={onChangeUpdateData}
          />
        </span>
      </div>

      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          CONTENT
        </label>
        <textarea
          className="form-control"
          defaultValue={updateData.content}
          onChange={onChangeUpdateData}
          name="content"
          id="content"
          rows="5"
          placeholder="Content Here"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          defaultValue={updateData.author}
          disabled
        />
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          type="button"
          onClick={() => onClickUpdateButton()}
          className="button grey-button-small"
          style={{ marginRight: "5px" }}
        >
          UPDATE
        </button>
        <button
          type="button"
          onClick={() => {
            setUpdateIsOpen(false);
          }}
          className="button grey-button-small"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default Update;
