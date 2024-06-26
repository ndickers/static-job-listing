document.addEventListener("DOMContentLoaded", async function () {
  const res = await fetch("./data.json");
  const jobs = await res.json();
  const main = document.querySelector("main");
  componentsArray(jobs, main);
  // const clearBtn = document.querySelector(".clear-btn");
  // clearBtn.addEventListener("click", (e) => {
  //   e.target.previousElementSibling.remove();
  //   console.log(e.target);
  // });
  main.addEventListener("click", function ({ target }) {
    const filtersDiv = document.querySelector(".clear-div");

    if (target.tagName === "BUTTON") {
      if (filtersDiv.children.length === 0) {
        const createDiv = document.createElement("div");
        const createInnerDiv = document.createElement("div");
        createDiv.setAttribute("class", "filters");
        createInnerDiv.setAttribute("class", "add-filters");
        const clearBtn = document.createElement("button");
        clearBtn.setAttribute("class", "clear-btn");
        createDiv.appendChild(createInnerDiv);
        createDiv.appendChild(clearBtn);
        createInnerDiv.appendChild(filterBtn(target.textContent));
        createInnerDiv.addEventListener("click", deleteEachFilter);
        clearBtn.textContent = "Clear";
        clearBtn.addEventListener("click", removeGroupFilter);
        filtersDiv.appendChild(createDiv);
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
        const getDiv = document.querySelector(".add-filters");
        getDiv.appendChild(filterBtn(target.textContent));
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
      }
    }
  });

  function deleteEachFilter({ target }) {
    if (target.tagName === "BUTTON") {
      target.parentElement.remove();
    } else if (target.tagName === "IMG") {
      target.parentElement.parentElement.remove();
    }
  }

  async function removeGroupFilter({ target }) {
    target.parentElement.remove();
    const res = await fetch("./data.json");
    const jobs = await res.json();
    const main = document.querySelector("main");
    main.textContent = "";
    componentsArray(jobs, main);
  }
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

  const insideArticle = `<div class="query-display"><div>
  <div class="article-header">
  <img class="avatar-desktop" src=${data.logo} alt="" srcset="" />
    <div>
    <div class="feature-query">
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
  <p class="postion-text">${data.position}</p>
    <ul>
    <li>${data.postedAt}</li>
      <li>${data.contract}</li>
      <li>${data.location}</li>
  
    </ul>
  </div>
    </div>
  </div>
  
  </div>
  <!-- line -->
  <div class="line-through"></div>
  <div class="filter-buttons">
    <button class="select-click">${data.role}</button>
    <button class="select-click">${data.level}</button>
    ${buttons}
  </div></div>`;
  //   document.querySelector(".filter-buttons").appendChild(buttons);

  article.innerHTML = insideArticle;

  return article;
}

function filterBtn(text) {
  const createDiv = document.createElement("div");
  createDiv.setAttribute("class", "filter-item");
  createDiv.innerHTML = `
  <p>${text}</p>
  <button class="x-button">
    <img src="./images/icon-remove.svg" alt="" srcset="" />
  </button>`;
  return createDiv;
}
