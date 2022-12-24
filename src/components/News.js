import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 2,
            totalResults: 0,
            loading: true
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}- NewsPigeon`;
    }
    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        console.log(this.state.totalResults);
        this.props.setProgress(100);
    }
    componentDidMount() {
        this.updateNews();
    }
    // handleNextClick = async ()=>{
    //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page+1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }

    // handlePrevClick = async ()=>{
    //     let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page-1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });

    };

    render() {
        return (
            <>
                <h2 className='text-center'>NewsPigeon - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>
                {this.state.loading && <Loading />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4>{<Loading />}</h4>}
                >
                    <div className='container my-3'>
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                    {/* <button disabled = {this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button disabled = {this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary"  onClick={this.handleNextClick} >Next &rarr;</button> */}
                </div>
            </>
        )
    }
}
