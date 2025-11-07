import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Explore.module.css";
import Explore from "../../images/explore.jpeg";
// import Explore from "../../images/hoverbg.png";
import appimage from "../../images/appimage.png";
import Container from "../commen/Container";
import useDataQuery, { baseUrl, fetcher } from "../../hooks/useDataQuery";
import { useRouter } from "next/router";
import glow from "../../images/lighticon.png";

import marketImg from "../../images/marketing.jpeg";
import develop from "../../images/developing.jpeg";
import exploreevent from "../../images/exploreevent.jpg";
import medical from "../../images/b3.jpg";
import Technology from "../../images/b2.jpg";
import project2 from "../../images/b1.jpg";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,autoplay: true,
  initialSlide: 0,
  responsive: [
    // {
    // 	breakpoint: 1024,
    // 	settings: {
    // 		slidesToShow: 3,
    // 		slidesToScroll: 3,
    // 		infinite: true,
    // 		dots: true
    // 	}
    // },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function ExploreProject({ projects }) {
  const router = useRouter();
  // const [projectdata, error] = useDataQuery({ key: "/public/get-ourProject" });
  // console.log("projectdata ", projectdata);
  //console.log('staticprops',data);
  return (
    <Container>
      <div className={styles.headline}>
        <h5 className={styles.featureProject}>FEATURED PROJECTS</h5>
        <h1 className={styles.exProject}>Explore Our Projects</h1>
      </div>

      <div className="exploreProjects">
        <Slider {...settings}>
          {/* firstslide */}



          {projects &&
            projects.map((prj) => {
              return (<div
              key={prj._id}
                className={styles.image}
                onClick={() => {
                  router.push("/ourproject");
                }}
              >
                <div className={styles.imgWrap}>
                  <div className={styles.hhh}>
                  <Image
                    
                    src={`${baseUrl}/public/get-ourProject/${prj.img}`} layout="fill" 
                    //src={project2}
                    // width={'550px'} height={'500px'}
                    // style={{objectFit: 'cover'}}
                  />
</div>

                  <div key={prj._id} className={styles.overlay}>
                    <div className={styles.hoverContent}>
                      <div className={styles.imageIcon}>
                        <Image src={appimage} />
                      </div>
                      <h5 className={styles.hoverContentHead}>
                        {prj.heading}
                      </h5>
                      <p className={styles.hoverContentPara}>

                        {prj.description}
                      </p>
                      {/* <p className={styles.hoverContentPara}>Fusce luctus odio ac nibh luctus</p> */}
                      <button type="button" className={styles.readMore}>
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.bottomheadline}><div className={styles.titleproject}><p>{prj.heading}</p></div><div className={styles.light}><Image src={glow} className={styles.glowicon} /></div></div>
              </div>)
            })
          }


       

        </Slider>
      </div>
    </Container>
  );
}

export default ExploreProject;
