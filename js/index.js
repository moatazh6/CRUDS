var siteNameInput = document.getElementById("input1");
var siteUrlInput = document.getElementById("input2");
var searchInput = document.getElementById("searchInput");

var siteList ;
if (localStorage.getItem("sites") === null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("sites"));
}

// Create Element
function addsites() {
  if (
    validationInputs(siteNameInput, "msgName") === true &&
    validationInputs(siteUrlInput, "msgUrl") === true
  ) {
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

// Show Element
function display() {
  cartona = "";
  for (var i = 0; i < siteList.length; i++) {
    cartona += createHtml(i);
    document.getElementById("tableContent").innerHTML = cartona;
  }
}

// Delete Element
function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  display();
  document.getElementById("tableContent").innerHTML = cartona;
}

// Search
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

// Element
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
        <button onclick="deleteItem(${i})" class="btn btn-outline-danger">Delete</button>
           </td>
      </tr>
  `;
}

// validationInputs
function validationInputs(element, msgId) {
  var text = element.value;

  var regex = {
    input1: /^[a-z]{2,15}$/i,
    input2:
      /^(https?|ftp):\/\/([^\s$.?#].[^\s]*)(\.com|\.org|\.edu|\.net|\.info|\.gov|\.eg)$/i,
  };

  var msg = document.getElementById(msgId);

  if (regex[element.id]) {
    if (regex[element.id].test(text)) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      msg.classList.add("d-none");
      return true;
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
      msg.classList.remove("d-none");
      return false;
    }
  } else {
    console.error("No regex pattern found for element ID:", element.id);
    return false;
  }
}

// clear
function clear() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}
