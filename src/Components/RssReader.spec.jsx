import React from 'react';
import { shallow, mount } from 'enzyme';
import RssReader from './RssReader';

describe('RssReader', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<RssReader />)).toMatchSnapshot();
    });
});
