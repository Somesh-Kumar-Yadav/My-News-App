var data;
var news = document.getElementsByClassName("news")[0];
async function getNewsData() {
  try {
    let res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=40dd3e5dce9f42f6a9b841a2e9f71ab3`
    );
    data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
async function main() {
  data = await getNewsData();
  console.log(data);
  for (var i = 0; i < 10; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "news_cart");
    let img_div = document.createElement("div");
    let con_div = document.createElement("div");
    let img = document.createElement("img");
    img.src = data.articles[i].urlToImage;

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
