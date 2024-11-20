var siteNameInput = document.getElementById("input1");
var siteUrlInput = document.getElementById("input2");
var searchInput = document.getElementById("searchInput");

var siteList = [];
if (localStorage.getItem("sites") === null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("sites"));
}
function addsites() {
  if (validationName() === true && validationUrl() === true) {
    var sites = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };

    siteList.push(sites);
    localStorage.setItem("sites", JSON.stringify(siteList));
    display();
    clear();
  }
}

function display() {
  cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += createHtml(i);
    document.getElementById("tableContent").innerHTML = cartona;
  }
}

function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  display();
  document.getElementById("tableContent").innerHTML = cartona;
}

function search() {
  var cartona = "";
  var term = searchInput.value;
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].siteName.toLowerCase().includes(term.toLowerCase())) {
      cartona += createHtml(i);
    }
    document.getElementById("tableContent").innerHTML = cartona;
  }
}

function createHtml(i) {
  var regex = new RegExp(searchInput.value, "gi");

  return `
      <tr>
      <td>${i + 1}</td>
    <td>${siteList[i].siteName.replace(
      regex,
      (match) => `<span class="bg-danger">${match}</span>`
    )}</td>
    <td>
      <a href="${
        siteList[i].siteUrl
      }" class="btn btn-outline-primary" target="_blank">Visit</a>
    </td>
    <td>
      <button onclick= "deleteItem(${i})" class="btn btn-outline-danger" >Delete</button>
    </td>
  </tr>

`;
}

function validationName() {
  var siteName = siteNameInput.value;
  var regex = /^[A-Z][a-z]{2,15}$/;
  var msgName = document.querySelector("#msgName");

  if (regex.test(siteName)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}
function validationUrl() {
  var siteUrl = siteUrlInput.value;
  var regex =
    /^(https?|ftp):\/\/([^\s$.?#].[^\s]*)\.(com|org|edu|net|info|gov|eg|)$/i;

  var msgName = document.querySelector("#msgUrl");

  if (regex.test(siteUrl)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}

function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}
