document.getElementById('myForm').addEventListener('submit', saveBookmark);


function saveBookmark(e){
  //console.log('It works');

  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName,siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url : siteUrl
  }

  //localStorage.setItem('test','HelloWorld');
if(localStorage.getItem('bookmarks') === null){

  var bookmarks = [];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
else {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Add bookmark to array

  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

  document.getElementById('myForm').reset();
  fetchBookmarks();
  e.preventDefault();
}

function deleteBookmark(url){
  //console.log(url);
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for(var j=0; j< bookmarks.length; j++)
    {
      if(bookmarks[j].url == url)
      {
        bookmarks.splice(j, 1);
      }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function fetchBookmarks(){

  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){

    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  ' <a onclick = "deleteBookmark(\''+url+'\')"class="btn btn-danger" href="#">Delete</a>'
                                  '</h3>'+
                                  '</div>';

  }

}

function validateForm(siteName, siteUrl){

    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
      alert('Please use a valid url');
      return false;
    }

    return true;
}
