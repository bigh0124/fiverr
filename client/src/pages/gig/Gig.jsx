import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/request";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const params = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: [`gig`],
    queryFn: () => {
      return newRequest.get(`/gigs/${params.id}`).then((res) => res.data);
    },
  });
  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
    refetch,
  } = useQuery({
    queryKey: [`user`],
    queryFn: () => {
      return newRequest.get(`/users/${data.userId}`).then((res) => res.data);
    },
    enabled: !!userId,
  });
  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">{"Liverr > Graphics & Design >"}</span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img className="pp" src={data.cover} alt="" />
                <span>{dataUser.username}</span>
                {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img, i) => (
                <img src={img} key={i} />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              {isLoadingUser ? (
                "Loading"
              ) : errorUser ? (
                "Something went wrong"
              ) : (
                <div className="user">
                  <img src={dataUser.img} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    <div className="stars">
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <img src="/img/star.png" alt="" />
                      <span>5</span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>
              )}
              {isLoadingUser ? (
                "Loading"
              ) : errorUser ? (
                "Something went wrong"
              ) : (
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country.toUpperCase()}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              )}
            </div>
            <Reviews gigId={params.id} />
          </div>

          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => {
                return (
                  <div className="item" key={feature}>
                    <img src="/img/greencheck.png" alt="" />
                    <span>{feature}</span>
                  </div>
                );
              })}
            </div>
            <Link to={`/pay/${params.id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
