/* eslint-disable no-extend-native */
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { parseString } from 'xml2js';

import { map, filter, forEach, reduce } from './lib/ArrayMethods';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve the static  react app
app.use(express.static(path.join(__dirname, './dist')));

// Override Array method with customs one from lib
Array.prototype.map = map;
Array.prototype.filter = filter;
Array.prototype.forEach = forEach;
Array.prototype.reduce = reduce;

app.post('/corsToJson', (req, res) => {
    axios
        .get(req.body.url)
        .then((response) => {
            parseString(response.data, (err, data) => {
                const channel =
                    data.rss && data.rss.channel && data.rss.channel[0];

                if (channel) {
                    // from all the keys of the object channel,
                    // only keep description, title and link
                    const description = Object.keys(channel)
                        .filter((e) => {
                            return (
                                e === 'description' ||
                                e === 'title' ||
                                e === 'link'
                            );
                        })
                        // from the 3 key kep before, get the corresponding value
                        .reduce((accumulator, element) => {
                            const result = {
                                ...accumulator,
                            };
                            result[element] = channel[element][0];

                            return result;
                        }, {});

                    // Transform the items array into a more readable one
                    description.items = channel.item.map((e) => {
                        return Object.keys(e).reduce((accumulator, element) => {
                            const result = {
                                ...accumulator,
                            };
                            result[element] = e[element][0];

                            return result;
                        }, {});
                    });

                    // Send the json object created
                    res.send(description);
                } else {
                    // Not a conventionnal RSS feed
                    res.send({
                        error: 'true',
                        message: 'wrong RSS data',
                    });
                }
            });
        })
        .catch((error) => {
            res.send({
                error: 'true',
                message: 'wrong url',
            });
        });
});

app.listen(3000, () =>
    console.log('server started : go to http://localhost:3000/ '),
);
