let siteForm = document.getElementById("siteForm");

//On site and url submit
const submitForm = (e) => {
   e.preventDefault();
  let inputValue = document.querySelector(".siteInput").value;
  let urlValue = document.querySelector(".siteUrl").value;

  if (!validateForm(urlValue)) {
    return true;
  }

  let webmarker = {
    site: inputValue,
    url: urlValue
  };

  let webmarkers = [];
  //save local storage
  if (localStorage.getItem("webmarkers") === null) {
    //initial array and push webmarker

    webmarkers.push(webmarker);

    //set item to local storage
    localStorage.setItem("webmarkers", JSON.stringify(webmarkers));
  } else {
    //get item from array
    let webmarkers = JSON.parse(localStorage.getItem("webmarkers"));
    webmarkers.push(webmarker);
    localStorage.setItem("webmarkers", JSON.stringify(webmarkers));
  }

  //clear the form
  siteForm.reset();

  //fetch all bookmarks
  allBooks()

 
  
}

//Output to the dom
const allBooks = () => {
  //get site from storage
  let webmarkers = JSON.parse(localStorage.getItem("webmarkers"));
  //Output to the dom
  let markerOutput = document.getElementById("webOutput");

  markerOutput.innerHTML = "";
  for (let i = 0; i < webmarkers.length; i++) {
    let site = webmarkers[i].site;
    let url = webmarkers[i].url;
   
   markerOutput.innerHTML +=
     "<div>" +
     `<h3>${site}</h3>
                      <a class="visit-link" href="${url}"><i class="fas fa-link"></i>Visit</a>` +
     `<a onclick="delMarker('${url}')" id="delBtn" class="del-link" href="#"><i class="far fa-trash-alt"></i>Delete</a>` +
     "</div>";
  }
};

//delete url
const delMarker = (url) => {
  let webmarkers = JSON.parse(localStorage.getItem("webmarkers"));
  let filteredMarker = webmarkers.filter(item => item.url !== url)
  
  localStorage.setItem("webmarkers", JSON.stringify(filteredMarker))
  allBooks();
}

//validate url
function validateForm(siteUrl) {
  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regexURL = new RegExp(expression);

  //  Check valid URL.
  if (!siteUrl.match(regexURL)) {
    alert("Invalid url");
    return false;
  }
  return true;
}



//easy hhtp copy text
// let copyhttp = "https://";
// let iconTag = document.getElementById("iconTag");


// const copyText = () => {
//   console.log(copyhttp)
//   copyhttp.select();
//   copyhttp.setSelectionRange(0, 99999);
//   document.execCommand("copy")
// }

// iconTag.addEventListener("click", copyText);
//form event listener
siteForm.addEventListener("submit", submitForm);
window.addEventListener("DOMContentLoaded", allBooks);


