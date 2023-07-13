function getItemsByPage(arr, page) {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;

  return arr.slice(startIndex, endIndex);
}

module.exports = getItemsByPage;
