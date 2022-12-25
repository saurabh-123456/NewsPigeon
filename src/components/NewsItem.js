import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card" style={{ width: "18rem" }}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{ left: "90%", zIndex: "1" }}>{source.name ? source.name : ""} </span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}
export default NewsItem;
