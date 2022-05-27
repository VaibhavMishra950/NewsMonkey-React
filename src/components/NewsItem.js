import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className="card my-2" style={{ width: "18rem", margin: "auto" }}>
          
          <img src={imageUrl ? imageUrl : "https://as2.ftcdn.net/v2/jpg/01/03/07/13/1000_F_103071304_JLRTq4aONlf9sprSFHHvMipxWOuk0BCA.jpg"} className="card-img-top" style={{ height: "160px" }} alt="..." />
          <div className="card-body">
            <span className="position-absolute badge bg-dark" style={{right: '-15px', zIndex: 1, top: '-10px', boxShadow: '0px 5px 10px #000'}}>
              {source}
            </span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text"> {description}...</p>
            <p className="card-text"><small className="text-muted">By <span style={{ color: "#111" }}>{author ? author : "Unknown"}</span> on <span style={{ color: "#111" }}>{new Date(date).toGMTString().slice(0, -3)}</span></small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem