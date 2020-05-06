/* eslint-disable no-extend-native */

import React, { useState, useEffect } from 'react';

import { map, filter, forEach, reduce } from '../../lib/ArrayMethods';

const RESULT_PER_PAGE = 4;

const RssReader = (props) => {
    const [rssUrl, setRssUrl] = useState('https://www.espn.com/espn/rss/news');
    const [rssFeed, setRssFeed] = useState({});
    const [error, setError] = useState('');
    const [
        defaultResultsAmountPerPages,
        setdefaultResultsAmountPerPages,
    ] = useState(props.defaultResultsAmountPerPages || RESULT_PER_PAGE);
    const [totalResultsToShow, setTotalResultsToShow] = useState(
        props.defaultResultsAmountPerPages || RESULT_PER_PAGE,
    );
    const getNextData = () => {
        setTotalResultsToShow(
            totalResultsToShow + defaultResultsAmountPerPages,
        );
    };

    const canGoNext = () => {
        return (
            rssFeed.items &&
            rssFeed.items.length >
                totalResultsToShow + defaultResultsAmountPerPages
        );
    };

    const reset = () => {
        setError('');
        setTotalResultsToShow(defaultResultsAmountPerPages);
    };

    const getRssData = () => {
        fetch('/corsToJson', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: rssUrl,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError('Unable to load RSS feed');
                } else {
                    setRssFeed(data);
                    reset();
                }
            })
            .catch((e) => {
                setError('Unable to load RSS feed');
                console.log(e);
            });
    };

    useEffect(() => {
        // Override Array method with customs one from lib
        Array.prototype.map = map;
        Array.prototype.filter = filter;
        Array.prototype.forEach = forEach;
        Array.prototype.reduce = reduce;

        // Load rss data
        getRssData();
    }, []);

    return (
        <div className="rss-reader">
            <div className="title"> RSS Reader</div>
            <div className="content">
                <div className="search-container">
                    <input
                        value={rssUrl}
                        onChange={(e) => {
                            setRssUrl(e.target.value);
                        }}
                    />
                    <div
                        className="button fetch-data-button"
                        onClick={getRssData}
                    >
                        Load RSS >
                    </div>
                </div>
                {error && <div className="error">{error}</div>}

                {rssFeed && (
                    <div className="description">
                        <div>
                            <b>{rssFeed.title}</b>
                        </div>
                        <div>
                            <b>{rssFeed.description}</b>
                        </div>
                        <div>
                            <b>
                                <a href={rssFeed.link}>website</a>
                            </b>
                        </div>
                    </div>
                )}
                <div className="rss-results">
                    {rssFeed &&
                        rssFeed.items &&
                        rssFeed.items.length &&
                        rssFeed.items
                            .filter((rssElement, index) => {
                                return index < totalResultsToShow;
                            })
                            .map((rssElement) => {
                                return (
                                    <RssBlock
                                        key={rssElement.guid}
                                        rssElement={rssElement}
                                    />
                                );
                            })}
                </div>
                <div className="rss-bottom">
                    {canGoNext() && (
                        <div className="button" onClick={() => getNextData()}>
                            more ...
                        </div>
                    )}
                    {rssFeed.items &&
                        rssFeed.items.length > 0 &&
                        !canGoNext() && (
                            <div className="no-more-result">
                                No more result left to load
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default RssReader;

const RssBlock = (props) => {
    const { rssElement } = props;
    const { title, description, image, link, pubDate } = rssElement;

    return (
        <div className="rss-block">
            {image && (
                <div className="left">
                    <img alt={title} src={image} />
                </div>
            )}
            <div className="right">
                <b>{title}</b>

                <p>{description}</p>
                <div className="bottom">
                    <div>{pubDate}</div>
                    <a href={link}>Read more...</a>
                </div>
            </div>
        </div>
    );
};
