import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
        <>
  
    <div  className="card mx-auto" style={{width: "300px"}}>
       <div style={{display:"flex",justifyContent:'flex-end',position:"absolute",right:"0"}}> 
            <span className="badge rounded-pill bg-danger " > {source}</span>
      </div>
    <img src= {!imageUrl?"https://tinyurl.com/yhshn8rw":imageUrl} height="165px"className="card-img-top" alt="..."/>
  <div className="card-body" style={{height: "240px"}}>
 
    <h5 className="card-title">{title}....   </h5>
    <p className="card-text">{description}....</p>
    <p className="card-text"><small className='text-muted'>By {author} on {date}</small></p>
    <a href={newsUrl} target="_blank" rel="noopener  noreferrer" className="btn btn-dark ">Read More</a>
  </div>
  </div>

        </>
      
    )
  }
}


export default NewsItem