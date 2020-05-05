/* eslint-disable no-extend-native */
import React, { useState, useEffect } from 'react';

import { map, filter, forEach, reduce } from '../../lib/ArrayMethods';

const RESULT_PER_PAGE = 4;

const RssReader = (props) => {
    const [rssUrl, setRssUrl] = useState('https://www.espn.com/espn/rss/news');
    const [rssFeed, setRssFeed] = useState({
        title: '',
        description: '',
        link: '',
        pubDate: '',
        items: [],
    });
    const [error, setError] = useState('');
    const [resultPerPages, setresultPerPages] = useState(
        props.resultPerPages || RESULT_PER_PAGE,
    );
    const [paginationFrom, setPaginationFrom] = useState(0);
    const [paginationTo, setPaginationTo] = useState(
        props.resultPerPages || RESULT_PER_PAGE,
    );

    const getPreviousData = () => {
        setPaginationFrom(paginationFrom - resultPerPages);
        setPaginationTo(paginationTo - resultPerPages);
    };
    const getNextData = () => {
        setPaginationFrom(paginationFrom + resultPerPages);
        setPaginationTo(paginationTo + resultPerPages);
    };

    const canGoNext = () => {
        return rssFeed.items.length > paginationFrom + resultPerPages;
    };

    const canGoBack = () => {
        console.log('laaaaa', paginationFrom);

        return paginationFrom > 0;
    };

    useEffect(() => {
        Array.prototype.map = map;
        Array.prototype.filter = filter;
        Array.prototype.forEach = forEach;
        Array.prototype.reduce = reduce;

        getRssData();
    }, []);

    /*
        Transform
            <item>
                <title></title>
                <description></description>
                <link></link>
            </item>
        to
            {
                item : {
                    title : "",
                    description : "",
                    link : ""
                }
            }
    */
    const xmlToJsonReducer = (accumulator, xmlElement) => {
        const temp = {
            ...accumulator,
        };
        temp[xmlElement.tagName] = xmlElement.textContent;
        return temp;
    };

    const getRssData = () => {
        fetch(rssUrl)
            .then((response) => response.text())
            .then((str) => {
                return new window.DOMParser().parseFromString(str, 'text/xml');
            })
            .then((data) => {
                const channel =
                    data.getElementsByTagName('channel') &&
                    data.getElementsByTagName('channel')[0];
                if (channel) {
                    const childNodesArray = Array.prototype.slice.call(
                        channel.childNodes,
                    );

                    const description = childNodesArray
                        .filter((e) => {
                            return (
                                e.nodeName === 'description' ||
                                e.nodeName === 'title' ||
                                e.nodeName === 'link' ||
                                e.nodeName === 'lastBuildDate' ||
                                e.nodeName === 'pubDate'
                            );
                        })
                        .reduce(xmlToJsonReducer, {});

                    description.items = childNodesArray
                        .filter((e) => {
                            return e.nodeName === 'item';
                        })
                        .map((e) =>
                            Array.prototype.slice
                                .call(e.childNodes)
                                .reduce(xmlToJsonReducer, {}),
                        );

                    setRssFeed(description);
                    setError('');
                } else {
                    setError("Can't get RSS feed");
                }
            })
            .catch((e) => {
                setError("Can't get RSS feed");
            });
    };

    return (
        <div className="rss-reader">
            <div className="title"> RSS Reader</div>
            <div className="content">
                <input
                    value={rssUrl}
                    onChange={(e) => {
                        setRssUrl(e.target.value);
                    }}
                />
                <div className="button fetch-data-button" onClick={getRssData}>
                    Get Data
                </div>
                {error}
                <div className="rss-results">
                    {rssFeed &&
                        rssFeed.items &&
                        rssFeed.items.length &&
                        rssFeed.items
                            .filter((rssElement, index) => {
                                return (
                                    index >= paginationFrom &&
                                    index < paginationTo
                                );
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
                    {canGoBack() && (
                        <div
                            className="button"
                            onClick={() => getPreviousData()}
                        >
                            PREVIOUS
                        </div>
                    )}
                    {canGoNext() && (
                        <div className="button" onClick={() => getNextData()}>
                            NEXT
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
            <div className="left">
                <img alt={title} src={image} />
            </div>
            <div className="right">
                <h1>{title}</h1>

                <p>{description}</p>
                <div className="bottom">
                    <a href={link}>{link}</a>
                    <div>{pubDate}</div>
                </div>
            </div>
        </div>
    );
};
