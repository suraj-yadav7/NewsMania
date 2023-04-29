import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";

// constructor(props){
//   super(props);
//   this.state={
//     article: [],
//     loading: false,
//     page:1,
//     totalResult:0

//   }

const News=(props)=> {
  const [articles,setArticles]=useState([])
  // eslint-disable-next-line
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResult,setTotalResult]=useState(0)
  // document.title=`${this.captilizationFirstLetter(props.category)} --NewsMania`
  
  
  const captilizationFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  const fetchMoreData = async() => {
    let url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1 }&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url)
  let parseData= await data.json()
  setArticles(articles.concat(parseData.articles))
  setTotalResult(parseData.totalResults)

  };

  const updateNews = async()=>{
    props.setProgress(0)
    let url=`https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parseData= await data.json()
    setArticles(parseData.articles)
    setTotalResult(parseData.totalResults)
    setLoading(false)
    props.setProgress(70)
    props.setProgress(100)

  }

  useEffect(()=>{
    updateNews()
  },[])
  
  
//   const handlePrevClick = async()=>{
//     setPage(page-1)
//     updateNews()
//   }
  
//   const handleNextClick = async()=>{
//     setPage(page+1)
//   updateNews()
// }

  

    return (
     <>
      <h3 className='text-center' style={{marginTop: "70px"}}>The NewsMania -Top Headlines On {captilizationFirstLetter(props.category)}</h3>

      {/* {this.state.loading && <Spinner/>} */}
      
     <div className='container my-2'>
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner/>}
        >
      <div className="row">
    {articles.map((e)=>{
      return <div className='col-md-4 my-2' key={e.url} >
        <NewsItem title={e.title?e.title.slice(0,40):""} description={e.description?e.description.slice(0,80):""} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author?e.author.slice(0,10):"Unknow"} date={new Date(e.publishedAt).toGMTString()} source={e.source.name.split(" ")} />
      </div>
      })}
      </div>

      </InfiniteScroll>
      
      {/* //next , previous button code
          <div className="container d-flex justify-content-between my-2">
          <button  disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}> &larr; Prev</button>
          <button disabled={this.state.page+1>(Math.ceil(this.state.totalResult/15))  } type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
    */}
          
      </div>

     </>
    )
  
    
}

News.defaultProps={
  country:"in",
  pageSize: 8,
  category: "general"
}


News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}


export default News