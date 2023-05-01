import _ from 'lodash';

const getFeedAndPosts = (parsedXML, url) => {
  const channel = parsedXML.querySelector('channel');

  const feedTitle = channel.querySelector('title').textContent;
  const feedDescription = channel.querySelector('description').textContent;
  const feedLink = channel.querySelector('link').textContent;
  const newFeed = {
    title: feedTitle, description: feedDescription, link: feedLink,
  };

  const postItems = channel.querySelectorAll('item');
  const newPosts = Array.from(postItems).map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postLink = item.querySelector('link').textContent;
    const postDescription = item.querySelector('description').textContent;
    return {
      title: postTitle,
      link: postLink,
      description: postDescription,
    };
  });

  return [newFeed, newPosts];
};

const parseRSS = (xmlString, url = null) => {
  const rssParser = new DOMParser();
  const parsedXML = rssParser.parseFromString(xmlString, 'application/xml');
  if (parsedXML.querySelector('parsererror')) {
    throw new Error();
  }
  return getFeedAndPosts(parsedXML, url);
};

export default parseRSS;
