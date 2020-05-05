import React from 'react';

const RssReader = (props) => {
    return (
        <div className="rss-reader">
            <div className="container">
                <div className="title"> RSS Reader</div>
                <div clasName="content"></div>
            </div>
        </div>
    );
};

export default RssReader;

const RssBlock = (props) => {
    return <div>{props.rssElement}</div>;
};
