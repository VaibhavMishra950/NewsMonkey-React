import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'


export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false, 
      page: 1,
      totalResults: 0
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d9334573533495aa2596839c005d44b&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    });

  }

  handlePrevClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d9334573533495aa2596839c005d44b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page - 1,
      totalResults: data.totalResults,
      loading: false
    });
  }
  
  handleNextClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d9334573533495aa2596839c005d44b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      page: this.state.page + 1,
      totalResults: data.totalResults,
      loading: false
    });
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center my-3 py-3'>NewsMonkey - {this.props.category} Headlines</h1>
        {this.state.loading && <Loader/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
            <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
            )
          })}
        </div>
          <div className="container d-flex justify-content-between my-3" style={{width: "96%"}}>
            <button type='button' disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}><i className="fa-duotone fa-chevrons-left"></i> Prevoius</button>
            <button type='button' disabled={this.state.page === Math.ceil(this.state.totalResults/6)} className="btn btn-dark" onClick={this.handleNextClick}>Next <i className="fa-duotone fa-chevrons-right"></i></button>
          </div>
      </div>
    )
  }
}

export default News