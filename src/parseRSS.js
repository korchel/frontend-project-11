const parseRSS = (xmlString) => {
  const rssParser = new DOMParser();
  const parsedXML = rssParser.parseFromString(xmlString, 'application/xml');
  return parsedXML;
};

export default parseRSS;

// ошибка парсинга??
