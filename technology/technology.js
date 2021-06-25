var data;
var news = document.getElementsByClassName("news")[0];
var sec_1 = document.querySelector(".sec-1>h1");
async function getNewsData() {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=40dd3e5dce9f42f6a9b841a2e9f71ab3`
    );
    data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function main() {
  con_div = null;
  data = await getNewsData();
  console.log(data);
  for (var i = 0; i < 10; i++) {
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
main();
