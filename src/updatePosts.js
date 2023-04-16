import axios from 'axios';
import _ from 'lodash';
import parseRSS from './parseRSS.js';
import getFeedandPosts from './getFeedandPosts.js';

const updatePosts = (watchedState, state) => {
  const { feeds } = state.rss;
  feeds.forEach((feed) => {
    const { rssUrl } = feed;
    const feedId = feed.id;
    const oldPosts = state.rss.posts.filter((post) => post.feedId === feedId);
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${rssUrl}`)
      .then((responce) => {
        const xmlString = responce.data.contents;
        const parsedXML = parseRSS(xmlString);
        const [, posts] = getFeedandPosts(parsedXML);
        const newPosts = _.differenceBy(posts, oldPosts, (post) => post.title);
        watchedState.rss.posts.push(...newPosts);
      });
  });
  setTimeout(updatePosts, 5000, state, watchedState);
};

export default updatePosts;
