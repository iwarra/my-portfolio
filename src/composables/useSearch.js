import MiniSearch from 'minisearch';

export const useSearch = (searchTerm, source) => {
  if (!searchTerm) return source
  
  let miniSearch = new MiniSearch({
    idField: '_id',
    fields: ['title', 'body'],
    storeFields: ['title', 'date', 'summary'],
  });

  miniSearch.addAll(source);

  return miniSearch.search(searchTerm, {
    combineWith: 'AND'
  });
}
