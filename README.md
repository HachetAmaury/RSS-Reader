# RSS reader

Allow to parse RSS feed which respect the convention ( https://en.wikipedia.org/wiki/RSS )

Working RSS feeds :

-   https://www.wired.com/feed
-   https://www.espn.com/espn/rss/news
-   https://www.lemonde.fr/rss/en_continu.xml
-   https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss

/!\ Some RSS feeds don't respect the convention and won't work, for exemple

-   https://www.reddit.com/r/worldnews.rss

All the data are parsed using a custom versions of:

-   Array.prototype.map
-   Array.prototype.filter
-   Array.prototype.forEach
-   Array.prototype.reduce

# Getting Started

## clone the repository from github

```
git clone https://github.com/HachetAmaury/RSS-Reader.git
```

# Run with yarn

## Install the dependancies

```
yarn install
```

## Running for dev

```
yarn start:dev
```

## Running for prod

```
yarn start
```

## Running the tests

```
yarn test
```

# Run with docker

```
docker-compose up -d
```

## Running the tests

Run the test using Jest & Enzyme using this command

```
npm run test
```

## Deployment

To deploy the code simply execute this command

```
npm run build
```

# Project structure

## server.js

To prevent CORS errors when requesting from the react side an Express server has been developed.

All the fetching and working on the RSS is done server side.

The client only display the json object received from the Express server

## ./lib

```
/lib/
 - ArrayMethods.js
 - ArrayMethods.spec.js
```

Contains the definition and test of those methods :

-   Array.prototype.map
-   Array.prototype.filter
-   Array.prototype.forEach
-   Array.prototype.reduce

## ./src/Components

```
/src/Components
 - RssReader.jsx
 - RssReader.spec.jsx
 - RssReaderStyle.scss
```

Contains the main component : RssReader with its style and test

## ./src/Styles

```
/src/Styles
 - Contants.scss
```

Contains the scss constants needed for the responsive design

## ./src/Styles

```
/src/
 - index.html
 - index.jsx
 - styles.scss
```

The files calling the main component and the sass

## All the other files are config files

## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [SASS](https://sass-lang.com/) - CSS with superpowers
-   [Webpack](https://webpack.js.org/) - A static module bundler for modern JavaScript applications
-   [Enzyme](https://airbnb.io/enzyme/) - A JavaScript Testing utility for React that makes it easier to test your React Components' output
-   [Jest](https://jestjs.io/) - A delightful JavaScript Testing Framework with a focus on simplicity
-   [Webpack](hhttps://webpack.js.org/)
-   [Docker](https://www.docker.com/)

## Authors

-   **Amaury Hachet** - [github](https://github.com/hachetamaury)
