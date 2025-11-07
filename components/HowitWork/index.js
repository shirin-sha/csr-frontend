import React from "react";
import Image from "next/image";
import Work from "./Work.module.css";
import stepOne from "../../images/step1.png";
import stepTwo from "../../images/step2.png";
import stepThree from "../../images/step3.png";
import stepArrow from "../../images/stepArrow.png";
import whitePlain from "../../images/whiteplain.png";
import yellowPlain from "../../images/yellowplain.png";
import Container from "../commen/Container";

const Howitwork = () => {
  return (
    <div className={Work.sectionGap}>
      <div className={Work.newHeading}>
        <div className={Work.newHeadingInner}>
          <h1>How It Works</h1>
        </div>
      </div>
      {/* <div className={Work.h1}>
				<h1>How It Works
				</h1>
				<Image src={Line} width={145} height={3} />
			</div> */}
      <Container>
        <div className={Work.howWorks}>
          <div
            className={Work.plain}
            style={{ position: "absolute", left: -105 }}
          >
            <Image src={whitePlain} layout="fill" />
          </div>
          <div className={Work.stepmain}>
            <div className={Work.substepdiv}>
              <div className={Work.lineCointainer}>
                <div className={Work.stepLine}>
                  <div className={Work.elipse}>
                    <Image src={stepOne} width={38} height={38} />
                  </div>
                  {/* <div className={Work.lineGap}><Image src={Line} width={9} height={2}/></div>
            <div className={Work.lineArrow}><Image src={stepArrow} width={10} height={10}/></div>
             */}
                </div>
              </div>
              <div>
                <p className={Work.stepTitle}>Explore Funding</p>
                <p className={Work.stepContent}>
                  CSR Kuwait serves as a dynamic, innovative Funding
                  Marketplace, providing a platform where entrepreneurs and
                  startups can connect with potential investors.
                </p>
              </div>
              {/* <div className={Work.readmore}>
            <Link href="/">
              <span>Read More</span>
            </Link>
          </div> */}
            </div>
            <div className={Work.arrow}>
              <Image src={stepArrow} layout="fill" />
            </div>
            <div className={Work.substepdiv}>
              <div className={Work.lineCointainer}>
                <div className={Work.stepLine}>
                  <div className={Work.elipse}>
                    <Image src={stepTwo} width={38} height={38} />
                  </div>
                </div>
              </div>
              <div>
                <p className={Work.stepTitle}>Secure Investments</p>
                <p className={Work.stepContent}>
                  Take advantage of a reliable space where entrepreneurs can
                  attract sponsors and investors can identify promising startups
                  that align with their investment criteria.
                </p>
              </div>
              {/* <div className={Work.readmore}>
            <Link href="/">
              <span>Read More</span>
            </Link>
          </div> */}
            </div>
            <div className={Work.arrow}>
              <Image src={stepArrow} layout="fill" />
            </div>
            <div className={Work.substepdiv}>
              <div className={Work.lineCointainer}>
                <div className={Work.stepLine}>
                  <div className={Work.elipse}>
                    <Image src={stepThree} width={38} height={38} />
                  </div>
                </div>
              </div>
              <div>
                <p className={Work.stepTitle}>Bridging the Gap</p>
                <p className={Work.stepContent}>
                  CSR Kuwait acts as a bridge, seamlessly connecting investors
                  with startups in a mutually beneficial relationship and
                  discover the perfect match for your investment goals.
                </p>
              </div>
              {/* <div className={Work.readmore}>
            <Link href="/">
              <span>Read More</span>
            </Link>
          </div> */}
            </div>

            {/* <Image src={yellowPlain} width={80} height={5}/> */}
            <div
              className={Work.plain}
              style={{ position: "absolute", right: -105 }}
            >
              <Image src={yellowPlain} layout="fill" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Howitwork;
