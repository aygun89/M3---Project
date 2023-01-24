let buttons = document.querySelectorAll("button");
let leftInp = document.querySelector(".insert input");
let rightInp = document.querySelector(".result input");
let leftP = document.querySelector(".insert p");
let rightP = document.querySelector(".result p");

let base = "RUB";
let symbols = "USD";
let valueLeft;
let valueRight;
let url;

function leftFunc() {
  rightInp.value = (+leftInp.value * valueLeft).toFixed(2);
}

function rightFunc() {
  leftInp.value = (+rightInp.value * valueRight).toFixed(2);
}

async function convert() {
  buttons.forEach((item) => {
    if (
      (item.classList.contains("left-btn") && item.innerHTML == base) ||
      (item.classList.contains("right-btn") && item.innerHTML == symbols)
    ) {
      item.classList.add("active-btn");
    } else {
      item.classList.remove("active-btn");
    }
  });

  if (base != symbols) {
    url = `https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        valueLeft = +Object.values(data.rates);
        valueRight = (1 / valueLeft).toFixed(6);
        leftP.innerHTML = `1 ${base} = ${valueLeft} ${symbols}`;
        rightP.innerHTML = `1 ${symbols} = ${valueRight} ${base}`;
      });
  } else {
    valueLeft = 1;
    valueRight = 1;
    leftP.innerHTML = `1 ${base} = 1 ${symbols}`;
    rightP.innerHTML = `1 ${symbols} = 1 ${base}`;
  }

  leftInp.addEventListener("keyup", leftFunc);
  rightInp.addEventListener("keyup", rightFunc);

  leftInp.addEventListener("click", (e) => {
    e.target.value = "";
  });
  rightInp.addEventListener("click", (e) => {
    e.target.value = "";
  });
}

convert();

buttons.forEach((item) => {
  item.addEventListener("click", async () => {
    if (item.classList.contains("left-btn")) {
      base = item.innerHTML;
      await convert();
      rightFunc();
    }
    if (item.classList.contains("right-btn")) {
      symbols = item.innerHTML;
      await convert();
      leftFunc();
    }
  });
});
