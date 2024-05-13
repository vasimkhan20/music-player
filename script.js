const API_KEY = "085843ec610e4153837bc7bdf31d34e6";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

 async function fetchNews(query) {
    
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`,{
        method: "GET",
        headers: {
            "upgrade" : "HTTP/2.0"
        }
    });
    const data = await res.json();
    bindData(data.articles);
    
 }

function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardscontainer.innerHTML = "";
    if (articles && Array.isArray(articles)) {
        articles.forEach((article) => {
            // Do something with each item
            if(!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone,article);
            cardscontainer.appendChild(cardClone);
        });
    } else {
        console.error("articles is undefined or not an array");
    }

 }

function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone:"Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name}  ${date}`;
    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url,"_blank");
    });
} 


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('btn');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});