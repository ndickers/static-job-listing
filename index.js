document.addEventListener("DOMContentLoaded", async function () {
  const res = await fetch("./data.json");
  const jobs = await res.json();
  const main = document.querySelector("main");
  jobs.forEach(async (job) => {
    console.log(job.languages);
    const article = await createHtmlComponent(job);
    main.appendChild(article);
  });
});

function createHtmlComponent(data) {
  const article = document.createElement("article");

  let buttons = "";
  data.languages.forEach((language) => {
    buttons += `<button>${language}</button>`;
  });
  console.log(buttons);

  const insideArticle = `<div class="article-header">
    <div class="image-div">
      <img class="avatar" src=${data.logo} alt="" srcset="" />
      <p class="img-name" >${data.company}</p>
    </div>
    <div class="job-feature">
      ${data.new ? "<p>NEW!</p>" : "<p class='dont-show'></p>"}
      ${data.featured ? "<p>FEATURED</p>" : "<p class='dont-show'></p>"}
    </div>
  </div>
  <div class="role">
    <p>${data.postedAt}</p>
    <ul>
      <li>${data.contract}</li>
      <li>${data.location}</li>
      <li></li>
    </ul>
  </div>
  <!-- line -->
  <div class="line-through"></div>
  <div class="filter-buttons">
    <button>${data.role}</button>
    <button>${data.level}</button>
    ${buttons}
  </div>`;
  //   document.querySelector(".filter-buttons").appendChild(buttons);

  article.innerHTML = insideArticle;
  return article;
}
