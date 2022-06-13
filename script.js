const postContainer = document.getElementById("container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let total = 0;
let currentSkip = 0;
const LIMIT = 3;
loadMoreBtn.addEventListener("click", () => {
  currentSkip += LIMIT;
  if (currentSkip >= total) {
    loadMoreButton.hidden = true;
  } else {
    getFetchRequest(currentSkip);
  }
});
getFetchRequest(currentSkip);

function getFetchRequest(skip) {
  fetch(`https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`)
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

function getPostHTML({ id, title, body, tags, reactions }) {
  return `
    <div class="post">
    <a href="post.html?postId=${id}">
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
