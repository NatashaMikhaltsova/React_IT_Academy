import React, { useState, useEffect } from "react";
import isoFetch from 'isomorphic-fetch';

import './NewsFeed.css';


const NewsFeed = ({ today }) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		// declare the async data fetching function
		const fetchData = async () => {
			// get the response from the api
			const response = await isoFetch('https://google-news1.p.rapidapi.com/geolocation?geo=Minsk&country=BLR&lang=en&limit=240', {
				headers: {
					'X-RapidAPI-Key': 'a23fde569amsh2fcccf77b8c2684p1cc171jsna3898ae0703d',
					'X-RapidAPI-Host': 'google-news1.p.rapidapi.com'
				},
			});
			// convert the data to json
			const data = await response.json();
			// setArticles with the result if `isSubscribed` is true
			if (isSubscribed && data.articles) {
				setArticles(data.articles.slice(0, 9));
			}
		}

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);

		// cancel any future `setData`
		return () => isSubscribed = false;
	}, [today]);

	if (articles) {
		return (
			<div className="NewsFeedWrapper">
				{articles.map((article) => {
					return (
						<a className="NewsFeedAnchorBox" target="_blank" rel="noreferrer" href={article.link} key={article.title}>
							<div className="NewsFeedArticleBox">
								<div className="NewsFeedTitle">
									{article.title.slice(0, article.title.indexOf(" - "))}
								</div>
								<div className="NewsFeedSource">{article.source.title}</div>
								<div className="NewsFeedDate">
									{article.published_date.slice(0, article.published_date.indexOf('T'))}
								</div>
							</div>
						</a>
					);
				})}
			</div>
		);
	} else {
		return <>Loading news...</>;
	}
};

export default NewsFeed;