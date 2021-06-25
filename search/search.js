var data;
var len;
var dataAgain;
var news = document.getElementsByClassName("news")[0];
var pagination = document.getElementsByClassName("pagination")[0];
var previous = document.getElementsByClassName("previous")[0];

var next = document.getElementsByClassName("next")[0];
var sec_1 = document.querySelector(".sec-1>h1");
var keyword = localStorage.getItem("search");
async function getNewsData() {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&apiKey=40dd3e5dce9f42f6a9b841a2e9f71ab3`
    );
    data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function main() {
  data = await getNewsData();
  len = data.length / 5;
  console.log(data.length);
  showButtons(1);
  creation(0);
}
main();
function showButtons(index) {
  pagination.innerHTML = null;
  let original_id = index;
  if (index == 1) {
    previous.style.display = "none";
  } else {
    previous.style.display = "inline";
  }
  if (index == 4) {
    next.style.display = "none";
  } else {
    next.style.display = "inline";
  }
  if (index <= 2) {
    index = 2;
  }
  if (index >= 3) {
    index = 3;
  }
  for (let i = index - 1; i <= index + 1; i++) {
    let btn = document.createElement("button");
    btn.innerHTML = `${i}`;
    btn.setAttribute("id", `${i - 1}`);
    btn.setAttribute("class", `btn`);
    btn.onclick = showData;
    pagination.appendChild(btn);
  }
  let btn = document.getElementById(original_id - 1);
  localStorage.setItem("id", original_id - 1);
  btn.style.background = "green";
}

function showData() {
  let id = Number(this.id);
  showButtons(id + 1);
  creation(id);
}
function creation(id) {
  news.innerHTML = null;
  sec_1.innerHTML = `News regarding "${keyword}"`;
  sec_1.style.textTransform = "capitalize";
  for (var i = id * 5; i < id * 5 + 5; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "news_cart");
    let img_div = document.createElement("div");
    let con_div = document.createElement("div");
    let img = document.createElement("img");
    img.src = data.articles[i].urlToImage;
    if (data.articles[i].urlToImage == null) {
      img.src =
        "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg";
    }

    let link = document.createElement("a");
    link.href = data.articles[i].url;
    let title = document.createElement("h2");
    title.innerHTML = data.articles[i].title;

    let description = document.createElement("h4");
    description.innerHTML = data.articles[i].description;
    let author = document.createElement("h5");
    author.innerHTML = data.articles[i].author;
    img_div.append(img);
    con_div.append(link, description, author);
    link.append(title);
    div.append(img_div, con_div);
    news.append(div);
  }
}
function pre() {
  let d = Number(localStorage.getItem("id"));
  showButtons(d);
  creation(d - 1);
}
function nex() {
  let n = Number(localStorage.getItem("id"));
  showButtons(n + 2);
  creation(n + 1);
}
