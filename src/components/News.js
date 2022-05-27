import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {


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
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.props.category} Headlines`;
  }

  async updateNews() {
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let response = await fetch(url);
    this.props.setProgress(50);
    let data = await response.json();
    this.props.setProgress(80);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      page: 2,
      loading: false
    });
    this.props.setProgress(100);

  }
  
  async componentDidMount(){
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults
    });
  };

  render() {
    return (
      <>
        <h1 className='text-center my-3 py-3'>NewsMonkey - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Loader/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container py-3">

            <div className="row">
              {this.state.articles.map((element, i) => {
                return (
                  <div className="col-md-4" key={element.url + i}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                )
              })}
            </div>
          </div>

        </InfiniteScroll>
      </>
    )
  }
}

export default News