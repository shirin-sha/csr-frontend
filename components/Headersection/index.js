import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import First from "./First.module.css";
import rightArrow from "../../images/rightarrow.png";
import blackArrow from "../../images/blackRightArrow.png";
import Container from "../commen/Container";
import bannerPerson from "../../images/bannerperson.png";
import { BsArrowRightShort } from "react-icons/bs";
import banner from "../../images/loopbannerneww.jpg";
import fetcher, { baseUrl } from "../../hooks/useDataQuery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Headersection() {
  const bannerimages = fetcher({ key: "/public/listBanners" });
  console.log(bannerimages);
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    dots: true,
    arrows: false,
    swipe: true,
    autoplay: true,
    pauseOnHover: false,

    // onSwipe: (dir: string) => {
    //   setIndex((e) => ({ dir: dir, isTouched: true }));
    // },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          infinite: true,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          adaptiveHeight: true,
          autoplay: true,
        },
      },
    ],
  };
  const sliderRef = useRef(null);
  return (
    <Slider {...sliderSettings} ref={sliderRef}>
          {bannerimages[0]?.data?.banners?.map((item)=>
      <div>
        <div className={First.banner}>

          <img
            className={First.sliderimage}
            src={`${baseUrl}/public/view-blogs/${item.imageUrl}`}
            alt="banner"
          />
          <div className={First.gridItem}>
            <Container>
              {/* <div className={First.bannerMain}> */}
              <div className={First.bannerContent}>
                <div>
                  <Image src={rightArrow} width={10} height={10} />
                  <span className={First.loopAgency}>
                    CSR Kuwait – Funding Marketplace
                  </span>
                </div>
                <div className={First.largeContent}>
                  <h3 className={First.headContent}>
                    CSR Kuwait Enables You To <br />
                    Find Investors For <br />
                    Your Project
                  </h3>
                </div>
                <div className={First.smallContent}>
                  <span>
                    CSR Kuwait – Funding Marketplace CSR Kuwait enables you to
                    find investors for your project Startups can find funding on
                    CSR Kuwait and investors can seize the opportunity to
                    sponsor a project.
                  </span>
                </div>
                <div className={First.exploreButton}>
                  <Link href="/about">
                    <a>Explore</a>
                  </Link>
                  {/* <div className={First.exploreButtonArrow}>
								<BsArrowRightShort className={First.arrowicon} />
								
							</div> */}
                </div>
                {/* </div> */}
                {/* <div className={First.personImage}><Image src={bannerPerson} /></div> */}
              </div>
            </Container>
          </div>
        </div>
      </div>)}
    </Slider>
  );
}

export default Headersection;
