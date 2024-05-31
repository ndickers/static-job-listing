document.addEventListener("DOMContentLoaded", async function () {
  const res = await fetch("./data.json");
  const jobs = await res.json();
  const main = document.querySelector("main");
  componentsArray(jobs, main);

  main.addEventListener("click", function ({ target }) {
    const filtersDiv = document.querySelector(".filters");

    if (target.tagName === "BUTTON") {
      if (filtersDiv.classList.contains("hide-div")) {
        filtersDiv.classList.remove("hide-div");
        filtersDiv.textContent = "";
        filtersDiv.appendChild(filterBtn(target.textContent));
        const deleteBtn = document.querySelector(".x-button");
        deleteBtn.addEventListener("click", removeFilter);
        console.log(document.querySelectorAll(".x-button"));
        if (
          target.textContent === "Frontend" ||
          target.textContent === "Backend" ||
          target.textContent === "Fullstack"
        ) {
          main.textContent = "";
          componentsArray(filterJobs(jobs, target.textContent), main);
        } else if (
          target.textContent === "Midweight" ||
          target.textContent === "Junior" ||
          target.textContent === "Senior"
        ) {
          main.textContent = "";
          componentsArray(filterJobs(jobs, "", target.textContent), main);
        } else {
          main.textContent = "";
          componentsArray(filterJobs(jobs, "", "", target.textContent), main);
        }
      } else {
        filtersDiv.appendChild(filterBtn(target.textContent));
        const deleteBtn = document.querySelectorAll(".x-button");
        deleteBtn.forEach((btn) => {
          btn.addEventListener("click", removeFilter);
        });
      }
    }
  });
  const getFilters = document.querySelectorAll(".filter-item");

  // console.log(filterJobs(jobs, "Frontend", ""));

  function removeFilter(e) {
    if (e.target.tagName === "BUTTON") {
      e.target.parentElement.remove();
      componentsArray(jobs, main);
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.parentElement.remove();
      componentsArray(jobs, main);
    }
  }
});

function filterJobs(jobs, role = "", level = "", lang1 = "") {
  let newArray = jobs.filter((job) => {
    return (
      (lang1 !== ""
        ? job.languages.includes(lang1)
        : job.role.includes(role)) && job.level.includes(level)
    );
  });
  return newArray;
}

function componentsArray(listItems, domElement) {
  listItems.forEach(async (element) => {
    const article = await createHtmlComponent(element);
    domElement.appendChild(article);
  });
}

function createHtmlComponent(data) {
  const article = document.createElement("article");

  let buttons = "";
  data.languages.forEach((language) => {
    buttons += `<button class="select-click">${language}</button>`;
  });

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
    <button class="select-click">${data.role}</button>
    <button class="select-click">${data.level}</button>
    ${buttons}
  </div>`;
  //   document.querySelector(".filter-buttons").appendChild(buttons);

  article.innerHTML = insideArticle;

  return article;
}

function filterBtn(text) {
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", "filter-item");
  createDiv.innerHTML = `<div class="filter-item">
  <p>${text}</p>
  <button class="x-button">
    <img src="./images/icon-remove.svg" alt="" srcset="" />
  </button>
</div>`;
  return createDiv;
}
