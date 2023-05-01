const getFeedAndPosts = (parsedXML) => {
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

const parseRSS = (xmlString) => {
  const rssParser = new DOMParser();
  const parsedXML = rssParser.parseFromString(xmlString, 'application/xml');
  const parseError = parsedXML.querySelector('parsererror');
  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsingError = true;
    throw error;
  }
  return getFeedAndPosts(parsedXML);
};

export default parseRSS;
