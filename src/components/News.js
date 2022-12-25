import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=>{
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const updateNews = async()=> {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(()=>{
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)}- NewsPigeon`;
        updateNews();
    },[])
    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)

    };

        return (
            <>
                <h2 className='text-center' style={{margin: "35px 0px", marginTop:"90px"}}>NewsPigeon - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h2>
                {loading && <Loading />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<h4>{<Loading />}</h4>}
                >
                    <div className='container my-3'>
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                    {/* <button disabled = {page<=1} type="button" className="btn btn-primary" onClick={handlePrevClick} >&larr; Previous</button>
        <button disabled = {page+1> Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-primary"  onClick={handleNextClick} >Next &rarr;</button> */}
                </div>
            </>
        )
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general",
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
}
export default News;