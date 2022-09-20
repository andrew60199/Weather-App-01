const citySearched = document.getElementById('search');
const historyList = document.getElementById('history');

const search = (event) => {
    
    if (citySearched.value === '') {
        return
    } 
    
    event.preventDefault();

    // console.log(citySearched.value);

    // If the search result already exists then bring it to the front and display the content
    // Otherwise generate a new search result.
    // console.log(document.getElementById(citySearched.value))

    const doesSearchResultAlreadyExist = (document.getElementById(citySearched.value))

    if (doesSearchResultAlreadyExist !== null) {
        // console.log('match')

        oppositeToAppend(historyList, doesSearchResultAlreadyExist)

    } else {

        createSearchHistoryElement();

    }

    // Run this last otherwise the variable will be reset
    document.getElementById('search').value = "";
};

const createSearchHistoryElement = () => {
    
    const newListItem = document.createElement('li');
    newListItem.textContent = citySearched.value;
    newListItem.id = citySearched.value;
    newListItem.className = 'search-history-item';

    // Reverse list order
    oppositeToAppend(historyList, newListItem)

}

// Opposite to appendChild https://www.youtube.com/watch?v=FGS6j8MtT6U
const oppositeToAppend = (parent, toInsert) => {
    const firstChild = parent.firstChild;
    parent.insertBefore(toInsert, firstChild)
}

const loadSearchHistory = () => {

}

function init() {

    // Get search history from local storage
    loadSearchHistory();

    document.querySelector('input[type=submit]').addEventListener("click", search);

}

init()