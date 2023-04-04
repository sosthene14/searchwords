var resultHeader = document.getElementById("result-header");
const wordToSearch = document.getElementById("word_to_search");
const textArea = document.getElementById("textarea");
var userTextWithAllWordOccurence = document.getElementById("my_paragraph");
var lis = [];
var liste_information_text = [];
var liste_three = [];

document.getElementById("formId").addEventListener("submit", function (event) {
  event.preventDefault();
});
function CallMainFunctionWhenKeyEnter() {
  document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.code === "Enter" || event.key === "Enter") {
      findWord();
    }
  });
}
CallMainFunctionWhenKeyEnter();

function loadFromLocalStorage() {
  if (localStorage.length != null) {
    for (var i = 0; i < localStorage.length; i++) {
      document.getElementById("textarea").textContent =
        localStorage.getItem("text");
    }
  }
}
loadFromLocalStorage();
function renitialize() {
  textArea.value = "";
  wordToSearch.value = "";
  localStorage.setItem("text", "");
  resultHeader.textContent = "";
  userTextWithAllWordOccurence.textContent = "";
}
function get_user_entry() {
  var select_content_from_texarea = document.getElementById("textarea").value;
  var remove_space_from_text_area = select_content_from_texarea.trim();
  return remove_space_from_text_area;
}

function normalize_text_entry(text_entry) {
  var normalised_text = text_entry
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,\/#!$¿?'"%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\n/g, " ");
  return normalised_text;
}

function getListe() {
  const textarea_normalized = normalize_text_entry(textArea.value);
  const word_to_search_normalized = normalize_text_entry(wordToSearch.value);
  const myArray = textarea_normalized.split(" ");
  var liste = [];
  if (textarea_normalized.trim() && word_to_search_normalized.trim()) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i] == word_to_search_normalized.trim()) {
        liste.push(i + 1);
      }
    }
    localStorage.setItem("text", textarea_normalized.trim());
    return liste;
  }
}

function findWord() {
  const textarea_normalized = normalize_text_entry(textArea.value);
  const word_to_search_normalized = normalize_text_entry(wordToSearch.value);
  if (textarea_normalized.trim() && word_to_search_normalized.trim()) {
    var txt =
      "<span style='color:rgb(242, 102, 250);font-weight: bold;'>" +
      word_to_search_normalized.trim() +
      "</span>";
    if (getListe()[0] == null) {
      resultHeader.textContent = "Mot introuvable dans le texte";
      userTextWithAllWordOccurence.textContent = "";
    } else {
      resultHeader.classList.add("text_for_informations");
      resultHeader.textContent =
        "Le mot '" +
        word_to_search_normalized.trim() +
        "' apparait " +
        getListe().length +
        " fois dans le texte";
      var splitting_text = textarea_normalized.split(" ");
      function showResults() {
        for (i in splitting_text) {
          if (splitting_text[i] == word_to_search_normalized.trim()) {
            liste_information_text.push(i);
          }
        }
        for (i in splitting_text) {
          liste_three.push(splitting_text[i]);
        }
        for (i in liste_information_text) {
          if (
            liste_three[liste_information_text[i]] ==
            word_to_search_normalized.trim()
          ) {
            liste_three[liste_information_text[i]] = txt;
          }
        }
        var three = liste_three.toString().replaceAll(",", " ");
        lis[0] = three;
        userTextWithAllWordOccurence.innerHTML = lis[0];
        liste_three = [];
      }
      showResults();
    }
  }
}
