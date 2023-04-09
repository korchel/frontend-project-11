import _ from 'lodash';

const getFeedandPosts = (parsedXML) => {
  const id = _.uniqueId();
  const channel = parsedXML.querySelector('channel');

  const feedTitle = channel.querySelector('title').textContent;
  const feedDescription = channel.querySelector('description').textContent;
  const feedLink = channel.querySelector('link').textContent;
  const newFeed = {
    title: feedTitle, description: feedDescription, link: feedLink, id,
  };

  const postItems = channel.querySelectorAll('item');
  const newPosts = Array.from(postItems).map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postLink = item.querySelector('link').textContent;
    return { title: postTitle, link: postLink, id };
  });

  return [newFeed, newPosts];
};

export default getFeedandPosts;
