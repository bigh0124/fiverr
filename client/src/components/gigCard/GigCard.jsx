import React, { useEffect, useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/request";
const GigCard = ({ item }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await newRequest.get(`/users/${item.userId}`);
      const { data } = res;
      setUsername(data.username);
    };
    fetchUser();
  }, []);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.images[0]} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.cover} alt="" />
            <span>{username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <img src="/img/star.png" alt="" />
            <span>
              {!isNaN(Math.round(item.totalStars / item.starNumber)) && Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
          <hr />
          <div className="details">
            <img src="/img/heart.png" alt="" />
            <div className="price">
              <span>STARTING AT</span>
              <h2>{item.price}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
