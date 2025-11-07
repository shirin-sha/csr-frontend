import React, { useEffect, useState} from 'react'
import Navbar from "../../components/navbar"
import fallback from '../../public/assets/default.jpg'
import Image from "next/image"
import styles from './news-blog.module.css'

import recentpostimage1 from '../../images/recentpost1.png'
import recentpostimage2 from '../../images/recentpost2.png'
import recentpostimage3 from '../../images/recentpost3.png'
import JoinUs from '../../components/joinus'
import { baseUrl, fetcher } from "../../hooks/useDataQuery"
import Footer from "../../components/footer"
import Link from "next/link"
import dayjs from 'dayjs'
export async function getServerSideProps() {
    console.log("dddddddddddddddddd");
    const newsResp = await fetcher({ key: "/public/get-blogs" });
    const blogs = await newsResp.data.blogs
    console.log('blogssss',blogs);
	return { props: {blogs} }

}


const newsBlog = ({blogs,src, alt, fallBackSrc = fallback.src }) => {
    const [imageError, setImageError] = useState(false);
    const [blogid,setBlogId]=useState(0)

    const[currentPage,setCurrentPage]=useState(1)
    const [postsPerPage]=useState(9)
    console.log("currentPage",currentPage);
    // get current posts

const indexOfLastPost=currentPage*postsPerPage;
const indexOfFirstPost=indexOfLastPost-postsPerPage;
const currentPosts=blogs.slice(indexOfFirstPost,indexOfLastPost);
console.log("currentPostsblogss",currentPosts)
//
// pagination

const pageNumbers=[];
for(let i=1;i<=Math.ceil((blogs.length) / postsPerPage);i++){
  pageNumbers.push(i);
}
 const [next,setNext]=useState(currentPage)
 console.log("cccccccccccccc",currentPage);
const paginate=(pageNumber)=>setCurrentPage(pageNumber)
const nextpage=()=>setCurrentPage(currentPage+1)
// 
    return (
        <div>
            <div className={styles.navoverlay}>
				<Navbar />
			</div>
        <div className={styles.bannerPic}>
        <h1>News and Blogs</h1>
      </div>
        <div className={styles.main}>
            <div className={styles.flexdiv}>
                {currentPosts?.map((newsdata, key) => {
                  
                    console.log("newsdata",newsdata);
          return(
            <Link href={'/viewnews/' + newsdata._id}>
             <div key={newsdata._id} className={styles.cards} onClick={()=> setBlogId(newsdata._id)}> 
             <div className={styles.imageflex}>
                <div className={styles.newsImage}>
                <Image layout='fill' quality={100} objectFit='cover' alt='News Image'
             src={!newsdata?.img ? fallBackSrc : `${baseUrl}/public/get-blogs/${newsdata.img}` }
             blurDataURL="/assets/default.jpg"
             onError={() => setImageError(true)}
               
                   />
                </div>
                {/* <span className={styles.name}>Business</span> */}
                <div className={styles.content}><p>{newsdata.heading}</p></div>
                </div></div>
                </Link>
                )})}
           
           {/* pagination */}
           {pageNumbers.length>1 &&(<div className={styles.nextpage}>
           <div className={styles.page}>
        <div className={styles.pagination}>
       
        {pageNumbers.map(number=>(<span key={number}>
    <a className={(currentPage==number )&& styles.active} onClick={()=>paginate(number)} >{number}</a></span>))}
    {currentPosts.length ==9 && (<a onClick={nextpage}>&raquo;</a>)}
        </div>
        </div></div>)}
            </div>
          
        </div>
       
            <JoinUs/>
    <Footer/>
    {/* new */}
      
        
{/* <div className={styles.newcards}>
{currentPosts?.map((newsdata, key) => {
    
    
      return  (
        <div className={styles.newimgewrap}>
      <div className={styles.imageandhead}>
    <Image layout='fill' quality={100} objectFit='cover'
    src={!newsdata?.img ? fallBackSrc : `https://loop.credot.dev/public/get-blogs/${newsdata.img}` }/>
    </div>
    <div className={styles.content}><p>{newsdata.heading}</p></div>

    </div>)
})}
   

</div> */}
        </div>
        
    )
}
export default newsBlog;