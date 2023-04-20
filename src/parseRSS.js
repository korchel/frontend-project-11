const parseRSS = (xmlString) => {
  const rssParser = new DOMParser();
  const parsedXML = rssParser.parseFromString(xmlString, 'application/xml');
  if (parsedXML.querySelector('parsererror')) {
    throw new Error();
  }
  return parsedXML;
};

export default parseRSS;

// ошибка парсинга??
