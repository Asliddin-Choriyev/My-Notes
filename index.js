"use strict";

let data = [];
let id = 0;

// element
const list = document?.querySelector(".list");
const form = document?.querySelector(".form");
let listItme;
const today = document.querySelector(".title>span");
today.textContent = `${
  new Date().getMonth() + 1 < 10
    ? "0" + new Date().getMonth() + 1
    : new Date().getMonth() + 1
}.${
  new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()
}.${
  new Date().getFullYear() < 10
    ? "0" + new Date().getFullYear
    : new Date().getFullYear()
}`;
// buttons
const plusBtn = document?.querySelector(".plus-btn");
const createBtn = document?.querySelector(".button");
// input

const input = document.querySelector(".input");

// logics
// ===============================================
plusBtn?.addEventListener("click", (e) => {
  form?.classList.remove("hidden");
  plusBtn?.classList.add("hidden");
});

const createElement = () => {
  list.innerHTML = "";
  if (data?.length > 0) {
    data.forEach((d) => {
      list.insertAdjacentHTML(
        "afterbegin",
        `<li class="list-item  ${d.isChecked ? "isChecked" : ""}" data-set="${
          d?.id
        }">
        <span class="check">${d.isChecked ? "checked" : "check"}</span>
      <p class="name">${d?.listName}</p>
      <span class="edit-s">edit</span>
      <span class="del-s">del</span>
      <div class="createdAt"><span>${d?.createdAt}</span></div>
    </li>`
      );
    });
  }
};

createBtn?.addEventListener("click", (e) => {
  e?.preventDefault();
  if (id === 0) {
    const date = new Date();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const listObj = {
      id: date.getTime(),
      isChecked: false,
      listName: input?.value,
      createdAt: `${hour}:${
        date.getMinutes() <= 10 ? "0" + date.getMinutes() : date.getMinutes()
      } ${hour <= 12 ? "AM" : "PM"}`,
    };
    data.push(listObj);
  } else {
    data = data.map((d) => {
      if (d.id === id) {
        return {
          id: d.id,
          listName: input.value,
          isChecked: d.isChecked,
        };
      } else {
        return d;
      }
    });
    id = 0;
  }

  createElement();
  input.value = "";
  form.classList.add("hidden");
  plusBtn.classList.remove("hidden");
});

list.addEventListener("click", (e) => {
  console.log("salom");
  const target = e.target.classList[0];
  const dataset = +e.target.parentElement.dataset.set;
  if (target === "check") {
    data = data.map((d) => {
      if (d.id === dataset) {
        const newObj = {
          id: d.id,
          listName: d.listName,
          createdAt: d.createdAt,
          isChecked: !d.isChecked,
        };
        return newObj;
      } else {
        return d;
      }
    });
    createElement();
  } else if (target === "del-s") {
    data = data.filter((d) => d.id !== dataset);
    createElement();
  } else if (target === "edit-s") {
    form?.classList.remove("hidden");
    plusBtn?.classList.add("hidden");
    input.value = data.filter((d) => d.id === dataset)[0].listName;
    id = dataset;
  }
});
