import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { AiOutlineFund } from "react-icons/ai";
import { VscProject } from "react-icons/vsc";
import ReactPlayer from "react-player";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./AboutUs1.module.css";
import Container from "../../components/commen/Container";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import JoinUs from "../../components/joinus";
import FeatureIcon from "../../components/FeatureIcons";
import ClientSays from "../../components/ClientSays";
import { RiCommunityLine } from "react-icons/ri";

const AboutUsPage1 = () => {
  return (
    <div>
      <div className={styles.navoverlay}>
        <Navbar />
      </div>
      <div className={styles.bannerPic}>
        <div className={styles.bannerContent}>
          <h1 className={styles.funding}>Funding Platforms</h1>
          <p className={styles.subTitle}>
            We Help at Every Steps From Concept to Market
          </p>
        </div>
      </div>
      <Container>
        <div className={styles.whoWeAre}>
          <div className={styles.gallery}>
            <img
              src="/assets/Aboutgroup.png"
              alt="gallery"
              className={styles.img}
            />
          </div>
          <div className={styles.imgContent}>
            <h5 className={styles.smallhead}>
              CSR Kuwait - Where Ideas Meet Investment
            </h5>
            <h1 className={styles.mainHead}>Fund Your Dreams</h1>
            <p className={styles.content}>
              Embark on your entrepreneurial journey with CSR Kuwait, the
              ultimate Funding Marketplace. Secure the support you need by
              showcasing your project to a community of eager sponsors and
              investors. CSR Kuwait provides a transparent and secure platform,
              ensuring a seamless connection between visionaries and backers.
              Register now as an applicant to find a sponsor or as a sponsor to
              discover projects aligned with your investment criteria.
              Experience the power of collaboration at CSR Kuwait, where dreams
              find the fuel to soar.
            </p>

            <div className={styles.readbtn}>
              {/* <button type="button" className={styles.readMore}>Read More</button> */}
            </div>
          </div>
        </div>

        {/* what we do */}
        <div className={styles.whatWeWant}>
          <h5 className={styles.smallhead} style={{ textAlign: "center" }}>
            WHAT WE DO
          </h5>
          <h1 className={styles.mainHead} style={{ textAlign: "center" }}>
            Why Choose Us
          </h1>
          <div className={styles.chooseUs}>
            <div className={styles.chooseSection}>
              <div className={styles.subChoose}>
                <div className={styles.circleDiv}>
                  <div className={styles.circle}>
                    <AiOutlineFund className={styles.payIcon} />
                  </div>
                </div>

                <h5 className={styles.paymentHead}>Trusted Funding Platform</h5>
                <p className={styles.payDetail}>
                  CSR Kuwait ensures a secure and transparent environment,
                  earning your trust in the investment process.
                </p>
                {/* <div className={styles.arrowDiv}>
                  <div className={styles.arrowCircle}>
                    <FaArrowRight style={{ fontSize: "12px" }} />
                  </div>
                </div> */}
              </div>
              <div className={styles.subChoose}>
                <div className={styles.circleDiv}>
                  <div className={styles.circle}>
                    <VscProject className={styles.payIcon} />
                  </div>
                </div>
                <h5 className={styles.paymentHead}>
                  Seamless Project Connection
                </h5>
                <p className={styles.payDetail}>
                  Experience effortless collaboration - post your project, find
                  sponsors or investors easily on CSR Kuwait.
                </p>
                {/* <div className={styles.arrowDiv}>
                  <div className={styles.arrowCircle}>
                    <FaArrowRight style={{ fontSize: "12px" }} />
                  </div>
                </div> */}
              </div>
              <div className={styles.subChoose}>
                <div className={styles.circleDiv}>
                  <div className={styles.circle}>
                    <RiCommunityLine className={styles.payIcon} />
                  </div>
                </div>
                <h5 className={styles.paymentHead}>Community-Driven Success</h5>
                <p className={styles.payDetail}>
                  Join a supportive community at CSR Kuwait, where ideas meet
                  resources, fostering successful partnerships and growth.
                </p>
                {/* <div className={styles.arrowDiv}>
                  <div className={styles.arrowCircle}>
                    <FaArrowRight style={{ fontSize: "12px" }} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.videoDiv}>
					<div className={styles.topBorder} />
					<div className="playerwrapper">
						<ReactPlayer
							className={styles.reactPlayer}
							url="https://www.youtube.com/watch?v=wWgIAphfn2U"
							width="100%"
							height="450px"
						/>
					</div>
					<div className={styles.bottomBorder} />
				</div> */}
      </Container>

      {/* <div>
				<ClientSays />
			</div> */}

      {/* end client */}

      {/* <FeatureIcon /> */}
      <JoinUs />
      <Footer />
    </div>
  );
};
export default AboutUsPage1;
