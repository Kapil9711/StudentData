// selecting  elements start

const tableBody = document.querySelector(".table-body");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const sortBtns = document.querySelectorAll(".sort-btn");

// selecting elements end

// feeding data code start

const feedData = (data) => {
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
    }) => {
      const row = ` <tr>
      <th class='td-id' scope="row">${id}</th>
      <td>🧑${" " + first_name + " " + last_name}</td>
      <td class='td'>${gender}</td>
      <td class='td'>${stdClass}</td>
      <td class='td'>${marks}</td>
      <td class='td email'>${passing}</td>
      <td class='email td'>${email.trim()}</td>
      </tr>`;

      tableRow += row;
    }
  );

  tableBody.innerHTML = tableRow;
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
  const btnId = this.id;
  if (btnId === "a-z") filterData(filteredStdData, "a-z");
  if (btnId === "z-a") filterData(filteredStdData, "z-a");
  else filterData(filteredStdData, btnId);
  feedData(filteredStdData);
}

sortBtns.forEach((btn) => {
  btn.addEventListener("click", hanldeBtnClick);
});

//sort by search input start

function hanldeInputClick() {
  const searchStr = searchInput.value.toLowerCase();
  filteredStdData = tempStdData.filter(
    ({ first_name, last_name }) =>
      first_name.toLowerCase().includes(searchStr) ||
      last_name.toLowerCase().includes(searchStr)
  );
  feedData(filteredStdData);
}

function hanldeInput() {
  if (!this.value.length) feedData(tempStdData);
}

searchBtn.addEventListener("click", hanldeInputClick);
searchInput.addEventListener("input", hanldeInput);

//sort by search input end

feedData(filteredStdData);
