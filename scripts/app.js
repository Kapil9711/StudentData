// selecting  elements start

const tableBody = document.querySelector(".table-body");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const sortBtns = document.querySelectorAll(".sort-btn");
const secondTable = document.querySelector(".second-table");
const secondTableBody = document.querySelector(".second-table-body");

// selecting elements end

// feeding data code start

secondTable.style.display = "none";

const feedData = (data, parrent = tableBody) => {
  let tableRow = ``;

  data.forEach(
    ({
      id,
      first_name,
      last_name,
      gender,
      class: stdClass,
      marks,
      passing,
      email,
      img_src,
    }) => {
      const row = ` <tr>
      <th class='td-id' scope="row">${id}</th>
      <td><span><img class='std-img' src=${img_src}/></span>  ${
        " " + first_name + " " + last_name
      }</td>
      <td class='td'>${gender}</td>
      <td class='td'>${stdClass}</td>
      <td class='td'>${marks}</td>
      <td class='td email'>${passing ? "passing" : "failed"}</td>
      <td class='email td'>${email.trim()}</td>
      </tr>`;

      tableRow += row;
    }
  );

  parrent.innerHTML = tableRow;
};
// feeding data code end

//sorting data started

const tempStdData = [...studentData];
let filteredStdData = [...tempStdData];

//sort by buttons

const filterData = (data, identifier) => {
  console.log(identifier);
  if (identifier === "a-z") {
    data.sort(({ first_name: data1 }, { first_name: data2 }) => {
      if (data1 < data2) return -1;
      else return 1;
    });
  }
  if (identifier === "z-a") {
    data.sort(({ first_name: data1 }, { first_name: data2 }) => {
      if (data1 < data2) return 1;
      else return -1;
    });
  } else {
    data.sort(({ [identifier]: data1 }, { [identifier]: data2 }) => {
      if (data1 < data2) return -1;
      else return 1;
    });
  }
};

function hanldeBtnClick() {
  secondTable.style.display = "none";

  const btnId = this.id;
  if (btnId === "a-z") filterData(filteredStdData, "a-z");
  if (btnId === "z-a") filterData(filteredStdData, "z-a");
  if (btnId === "passing") {
    feedData(filteredStdData.filter(({ passing }) => passing === true));
    return;
  }
  if (btnId === "gender") {
    secondTable.style.display = "initial";
    const male = filteredStdData.filter(({ gender }) => gender === "Male");
    const female = filteredStdData.filter(({ gender }) => gender === "Female");
    feedData(male);
    feedData(female, secondTableBody);
    return;
  } else filterData(filteredStdData, btnId);
  feedData(filteredStdData);
}

sortBtns.forEach((btn) => {
  btn.addEventListener("click", hanldeBtnClick);
});

//sort by search input start

function hanldeInputClick() {
  const searchStr = searchInput.value.toLowerCase();
  filteredStdData = tempStdData.filter(
    ({ first_name, last_name, email }) =>
      first_name.toLowerCase().includes(searchStr) ||
      last_name.toLowerCase().includes(searchStr) ||
      email.toLowerCase().includes(searchStr)
  );
  feedData(filteredStdData);
}

function hanldeInput() {
  if (!this.value.length){
    secondTable.style.display = "none";
    feedData(tempStdData);
    
  }
}

searchBtn.addEventListener("click", hanldeInputClick);
searchInput.addEventListener("input", hanldeInput);

//sort by search input end

feedData(filteredStdData);
