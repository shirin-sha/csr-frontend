import Navbar from "../../components/navbar"
import styles from "./ourproject.module.css"
import JoinUs from "../../components/joinus"
import projectimg1 from '../../images/ourprojectimg1.png'
import projectimg2 from '../../images/ourprojectimg2.png'
import projectimg3 from '../../images/ourprojectimg3.png'
import Image from 'next/image'
import Footer from "../../components/footer"
import { useEffect, useState } from "react"
import useDataQuery, { baseUrl } from "../../hooks/useDataQuery"
import { fetcher } from "../../hooks/useDataQuery"
import { number } from "prop-types"

export async function getServerSideProps() {
  console.log("dddddddddddddddddd");
  const projectResp =await fetcher({ key: "/public/get-ourProject",data:{ limit: 6, page: 1 } });
  console.log("projectResp",projectResp)
  const projects = await projectResp?.data.data.information
  const categoryArray=await projectResp?.data.data.arrayfilter
  console.log("pppppppppp",projects)
return { props: {projects,categoryArray} }

}


const ViewMore = ({projects,categoryArray}) => {
  const [allbutton,setAllButton]=useState(projects)
  const [ourProject, setOurProject] = useState([projects])
  const [filtercategory, setFiltercategory] = useState([])
  const [data, setData] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(6)

  const [imgSrc, setImgSrc] = useState("/assets/default.jpg")
// useEffect(()=>{
//   setFiltercategory(categoryArray)
//   console.log("filtercategory", filtercategory);
// },[])
  // get current posts

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = ourProject?.slice(indexOfFirstPost, indexOfLastPost);
  console.log("currentPosts", currentPosts)
  console.log("indexOfLastPost",indexOfLastPost);
 console.log("currentPagen",currentPage); 
 console.log("currentPosts", currentPosts.length)
  // pagination

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((ourProject.length) / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  // 
  const [next,setNext]=useState(currentPage)
  const nextpage=()=>{ setCurrentPage(currentPage+1)}

  // Fetch data from external API
  useEffect(() => {
    console.log("ourprojects")
   console.log("categoryArray",categoryArray)
   setOurProject(projects)
    // const projectResp = fetcher({ key: "/public/get-ourProject" }).then((data) => {
    //   console.log("fetched data", data.data.data.arrayfilter

    //   );
      // setData(data.data.data)
      // console.log("datastate", data)
      // console.log("projectdata", data.data.data.information
      // )
      // console.log("projectdataaaaaaaaaaa ", projectResp);
      // setOurProject(data.data.data.information)
      setFiltercategory(categoryArray)
    // });

    console.log("filtercategory", filtercategory);

    console.log("ourprojects", ourProject);
   
  }, []
  )


  // get current posts


  console.log("currentPosts", currentPosts)
  //
  // pagination



  // 

  const [categorydata, errors] = useDataQuery({
    key: "/public/get-categories",
    data: {},
  });
  console.log("categorydata ", categorydata);
  const categories = categorydata?.data?.categories
  console.log({ categories });




  return (
    <div >
      <div className={styles.Navbackground}> <Navbar /></div>

      <div className={styles.bannerPic}>
        <h1>OUR PROJECT</h1>
      </div>

      <div className={styles.selectbox}>
        <select className={styles.select} onChange={(e) => {
          console.log("select box val",e.target.value)
          if(!e.target.value)
          {
            return
          }
          console.log("clicked cat");
          fetcher({ key: `/public/get-ourProject`, data: { category: e?.target?.value ,limit: 6, page: currentPage } }).then((category) => {
            console.log("cattt", category.data.data)
            setOurProject(category.data.data);
          })
        }}>
      <option value="" key=""disabled selected>select a category</option>
      <option value='all'>All</option>
        {categoryArray && categoryArray.slice(0, 6).map((cat) => {
         
      return(
         <option key={cat._id} value={cat._id} 
        >
          {cat.name}</option> )
        }
        )}
       
      </select></div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          {/* <div className={styles.buttonContainer}> */}
<button className={styles.allButton} onClick={()=>{setCurrentPage(1);setOurProject(projects) ;console.log("allproject",ourProject)}}>All</button>
          {categoryArray && categoryArray.slice(0, 5).map((cat) => {
            console.log("cat",cat);
            return (<div className={styles.child}><button
              onClick={() => {
                setCurrentPage(1);
                fetcher({ key: `/public/get-ourProject`, data: { category: cat._id } }).then((category) => {
                  console.log("cattt", category.data.data)
                  setOurProject(category.data.data);
                })
              }}
            >{cat.name}</button></div>)
          })}





          {/* </div> */}

        </div>
        <div>
        <div className={styles.flexdiv}>
          {currentPosts && currentPosts.map((project) => {
            return (
              <div className={styles.imageflex}>
                <div className={styles.projectImage}>
                  <Image src={project.img ? (`${baseUrl}/public/get-ourProject/${project.img}`) : imgSrc} layout='fill' quality={100}
                  // onError={({ currentTarget }) => {
                  //   currentTarget.onerror = null; // prevents looping
                  //   currentTarget.src="/assets/default.jpg" }}
                  // placeholder="blur"
                  // blurDataURL="/assets/default.jpg"
                  />
                </div>
                <div className={styles.newsHeadline}><p >{project.heading}</p></div>
                <div className={styles.overlay}>
                  <div className={styles.hoverContent}>
                    <h5 className={styles.hoverContentHead}>{project.heading}</h5>
                    <p className={styles.hoverContentPara}>
                      {project.description}
                    </p>
                  </div></div></div>)
          })}

        </div>
        </div>
        <div className={styles.page}>

          <div className={styles.pagination}>
            {pageNumbers.map(number => (<span key={number}>
              <a className={currentPage==number && styles.activePage} onClick={() => paginate(number)} >{number}</a></span>))}
             { currentPosts.length ==6 && (<a onClick={nextpage}>&raquo;</a>)}
          </div>

        </div>
      </div>
      <div><JoinUs /></div>
      <div><Footer /></div>
    </div>
  );
};
export default ViewMore;
