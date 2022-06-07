const postContainer = document.getElementById("container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let total = 0;
let currentSkip = 0;
let limit = 3;
loadMoreBtn.addEventListener("click", () => {
  if (currentSkip >= total) {
    loadMoreButton.hidden = true;
  } else {
    getFetchRequest(currentSkip);
  }
});
getFetchRequest(currentSkip);

function getFetchRequest() {
  fetch(`https://dummyjson.com/posts?limit=${limit}&skip=0`)
    .then((res) => res.json())
    .then((data) => {
      total = data.total;

      let html = "";
      for (let post of data.posts) {
        html += getPostHTML(post);
      }
      postContainer.insertAdjacentHTML("beforeend", html);
    });
}

function getPostHTML({ title, body, tags, reactions }) {
  return `
    <div class="post">
    <a href="post.html">
      <h4>${title}</h4>
    </a>
    <p>${body}</p>
    <p class="footer">
      <span>
        <span class="tag">${tags[1]}</span>
        <span class="tag">${tags[2]}</span>
      </span>
      <span>❤️${reactions}</span>
    </p>
  </div>
    `;
}
