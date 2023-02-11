import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

  
  static defaultProps={
    country:"in",
    pageSize: 8,
    category: "general"
  }

  
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  
  }
  captilizationFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  fetchMoreData = async() => {
  this.setState({page: this.state.page+1})
  let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=76fda6e0174d4e4eaffe02d4c9db3c88&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url)
  let parseData= await data.json()
  this.setState({
    article: this.state.article.concat(parseData.articles),
    totalResult: parseData.totalResults,
  })
  
  };

  constructor(props){
    super(props);
    this.state={
      article: [],
      loading: false,
      page:1,
      totalResult:0

    }
    document.title=`${this.captilizationFirstLetter(this.props.category)} --NewsMania`
  }

  updateNews=async()=>{
    this.props.setProgress(0)
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=76fda6e0174d4e4eaffe02d4c9db3c88&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url)
    this.props.setProgress(30)
    let parseData= await data.json()
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(70)
    this.props.setProgress(100)

  }

  async componentDidMount(){
    /*
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=76fda6e0174d4e4eaffe02d4c9db3c88&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url)
    let parseData= await data.json()
    this.setState({
      article: parseData.articles,
      totalResult: parseData.totalResults,
      loading: false
    })
    */
   this.updateNews()
  }

  handlePrevClick = async()=>{
    /*
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=76fda6e0174d4e4eaffe02d4c9db3c88&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url)
    let parseData= await data.json()
    this.setState({
      article: parseData.articles,
      page: this.state.page-1,
      loading: false
      
    })
    */
   this.setState({
    page:this.state.page-1
   })
   this.updateNews()
  }

  handleNextClick = async()=>{
    /*
if(this.state.page+1>(Math.ceil(this.state.totalResult/15))){

}
else{
  let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=76fda6e0174d4e4eaffe02d4c9db3c88&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url)
  let parseData= await data.json()
  this.setState({
    article: parseData.articles,
    page: this.state.page+1,
    loading: false
  })
}
  */
 this.setState({
  page:this.state.page+1
 })
 this.updateNews()
}


  render() {
    return (
     <>
      <h3 className='text-center'>The NewsMania -Top Headlines On {this.captilizationFirstLetter(this.props.category)}</h3>

      {/* {this.state.loading && <Spinner/>} */}
      
     <div className='container my-3'>
      <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResult}
          loader={<Spinner/>}
        >
      <div className="row">
    { this.state.article.map((e)=>{
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
}


export default News