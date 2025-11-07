import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./viewnews.module.css";
import Navbar from "../navbar";
import LargeImage from "../../images/viewmoreimage1.png";
import recentpostimage1 from "../../images/recentpost1.png";
import recentpostimage2 from "../../images/recentpost2.png";
import recentpostimage3 from "../../images/recentpost3.png";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import JoinUs from "../joinus";
import Footer from "../footer";
import dayjs from "dayjs";
import DOMPurify from "isomorphic-dompurify";
import { baseUrl, fetcher } from "../../hooks/useDataQuery";
import Link from "next/link";

export async function getServerSideProps() {
  console.log("dddddddddddddddddd");
  const newsResp = await fetcher({ key: "/public/get-blogs" });
  const newsblogs = await newsResp.data.blogs;
  console.log("blogssss", newsblogs);
  return { props: { newsblogs } };
}
const ViewNews = ({ blogs }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogid, setBlogId] = useState(0);
  const [blognews, setBlogNews] = useState([]);
  useEffect(() => {
    console.log("itworks");
    const newsResp = fetcher({ key: "/public/get-blogs" }).then((data) => {
      console.log("mynews", data);
      setBlogNews(data.data.blogs);
    });
  }, []);
  // setBlogNews(blogs)
  console.log("blogsnews", blogs);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div>
      <div className={styles.Navbackground}>
        {" "}
        <Navbar />
      </div>

      <h4 className={styles.heading}>{blogs.heading}</h4>

      {/* <div className={styles.imagewrapdiv}>
        <Image
          layout="fill"
          quality={100}
          objectFit="cover"
          // src={LargeImage}/>
          src={`https://loop.credot.dev/public/view-blogs/${blogs.img}`}
        />
        <div className={styles.dateBox}>
          <span className={styles.datespan}>
            {dayjs(blogs.submission_date).format("D")}
          </span>
          {dayjs(blogs.submission_date).format("MMMM")}
        </div>
      </div> */}
      {/* <div className={styles.newimageAndpost}>
        <div className={styles.imagebanner}></div>
        <div className={styles.recentPostdiv}></div>
      </div> */}
      <div className={styles.flexMain}>
        <div className={styles.newsDiv}>
        <div className={styles.imagewrapdiv}>
        <Image
          layout="fill"
          quality={100}
          objectFit="cover"
          // src={LargeImage}/>
          src={`${baseUrl}/public/view-blogs/${blogs.img}`}
        />
        <div className={styles.dateBox}>
          <span className={styles.datespan}>
            {dayjs(blogs.submission_date).format("D")}
          </span>
          {dayjs(blogs.submission_date).format("MMMM")}
        </div>
      </div> 
          <div className={styles.socialMedia}>
            <div className={styles.icons}>
              <div className={styles.circleIcon}>
                <FaFacebookF className={styles.iconSpacing} />
              </div>
              <div className={styles.circleIcon}>
                <BsTwitter className={styles.iconSpacing} />
              </div>
              <div className={styles.circleIcon}>
                <BsLinkedin className={styles.iconSpacing} />
              </div>
            </div>
            <div className={styles.content}>
              {" "}
              <p>{blogs.description}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={createMarkup(blogs.content)} />
        </div>
        <div className={styles.recentPost}>
          <h4>Recent Post</h4>
          {blognews.slice(0, 6).map((item, key) => {
            console.log("itemin view", item);
            return (
              <Link href={"/viewnews/" + item._id}>
                <div
                  key={item._id}
                  className={styles.news}
                  onClick={() => {
                    setBlogId(item._id);
                  }}
                >
                  <div className={styles.recentimage}>
                    <Image
                      src={`${baseUrl}/public/get-blogs/${item.img}`}
                      layout="fill"
                    />
                  </div>
                  <div className={styles.recentnewsHead}>
                    {" "}
                    <p className={styles.newsHead}>{item.heading}</p>
                    <span className={styles.datediv}>
                      {dayjs(item.submission_date).format("MMM DD")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <JoinUs />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default ViewNews;
