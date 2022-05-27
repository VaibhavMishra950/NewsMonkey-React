import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
  // Temporary Key
  apiKey = "be4c55d55228451690b7db072adb6949"

  // Original API Key
  // apiKey = "7d9334573533495aa2596839c005d44b"


  static defaultProps = {
    country: 'in',
    pageSize: 2,
    category: 'General'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = `NewsMonkey - ${this.props.category} Headlines`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url);
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    });
  }
  
  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    await this.updateNews();
  }

  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    await this.updateNews();
  }

  
  
  
  
  // fetchMoreData = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.setState({loading: true});
  //   console.log(this.state.page);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let response = await fetch(url);
  //   let data = await response.json();

  //   this.setState({
  //     articles: this.state.articles.concat(data.articles),
  //     totalResults: data.totalResults,
  //     loading: false
  //   });
  // };

 


  render() {
    return (
      <>
        <h1 className='text-center my-3 py-3'>NewsMonkey - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Loader/>}
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        > */}
          <div className="container">
            <div className="row">
              {!this.state.loading && this.state.articles.map((element, i) => {
                return (
                  <div className="col-md-4" key={element.url + i}>
                    {/* <div className="col-md-4" key={element.url}> */}
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                )
              })}
            </div>
          </div>

        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between my-3" style={{ width: "96%" }}>
          <button type='button' disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}><i className="fa-duotone fa-chevrons-left"></i> Prevoius</button>
          <button type='button' disabled={this.state.page === Math.ceil(this.state.totalResults / 6)} className="btn btn-dark" onClick={this.handleNextClick}>Next <i className="fa-duotone fa-chevrons-right"></i></button>
        </div>
      </>
    )
  }
}

export default News