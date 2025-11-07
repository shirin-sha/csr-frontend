import React from "react";
import { fetcher } from "../../hooks/useDataQuery";
import { useRouter } from "next/router";
import ViewNews from "../../components/viewnews";

const viewDetails = ({ blogs }) => {
  return (
    <div>
      <ViewNews blogs={blogs} />
    </div>
  );
};
export default viewDetails;
// const blogs=await res.json()
// if(newsdata){
//     res.status(200).json(newsdata);
// } else {
//   res.status(404).end();
// }

// console.log("viewnewsmore",res)
// const blogs = await newsdata.data.blogs
// Pass data to the page via props
// return { props: { blogs } }'

export async function getServerSideProps(context) {
  const id = context.params.viewnewsId;
  // console.log("context ",context)
  console.log(
    "****************************************url ",context.params.viewnewsId );
  // Fetch data from external API
 
    // (await id) &&
   const newsresponse=await  fetcher({ key: "/public/view-blogs", data: {id} })
console.log({ newsresponse });
console.log("newsdata", newsresponse);
const blogs =newsresponse.data.data;
console.log("blogggssssssssss",blogs);

return { props: { blogs } };


}
