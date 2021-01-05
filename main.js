"use strict";

function replaceEnglish(str){
  let res = str
  res = res.toString().replace(/1/g,"१");
  res = res.toString().replace(/2/g,"२");
  res = res.toString().replace(/3/g,"३");
  res = res.toString().replace(/4/g,"४");
  res = res.toString().replace(/5/g,"५");
  res = res.toString().replace(/6/g,"६");
  res = res.toString().replace(/7/g,"७");
  res = res.toString().replace(/8/g,"८");
  res = res.toString().replace(/9/g,"९");
  res = res.toString().replace(/0/g,"०");
  console.log("res: " +  res)
  return res;
  
}


const input = document.querySelector(".input");
const result = document.querySelector(".result");
const deleteBtn = document.querySelector(".delete");
const keys = document.querySelectorAll(".bottom span");

var operation = "";
var answer;
var decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress (e) {
  const key = e.target.dataset.key;
  console.log(key)
  const lastChar = operation[operation.length - 1];
  console.log(lastChar)

  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(key) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && key === "-") {
    operation += key;
    input.innerHTML = replaceEnglish(operation);
    return;
  }

  if (operation.length === 0 && operators.indexOf(key) !== -1) {
    input.innerHTML = replaceEnglish(operation);
    return;
  }

  if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
    operation = operation.replace(/.$/, key);
    input.innerHTML = replaceEnglish(operation);
    return;
  }

  if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
    input.innerHTML = replaceEnglish(operation);
    return;
  }

}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    answer = "";
    result.innerHTML = replaceEnglish(answer);
    return;
  }

  try {

    if (operation[0] === "0" && operation[1] !== "." && operation.length > 1) {
      operation = operation.slice(1);
    }

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");
    answer = +(eval(final)).toFixed(5);

    if (key === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      answer = "";
      input.innerHTML = replaceEnglish(operation);
      result.innerHTML = replaceEnglish(answer);
      return;
    }

    result.innerHTML = replaceEnglish(answer);

  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      input.innerHTML = `<span class="error">${replaceEnglish(operation)}</span>`;
      result.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }

}

function clearInput (e) {

  if (e.ctrlKey) {
    operation = "";
    answer = "";
    input.innerHTML = replaceEnglish(operation);
    result.innerHTML = replaceEnglish(answer);
    return;
  }

  operation = operation.slice(0, -1);
  input.innerHTML = replaceEnglish(operation);

}

function clearEverything(){
  location.reload()
}

deleteBtn.addEventListener("click", clearInput);
deleteBtn.addEventListener("dblclick", clearEverything);
keys.forEach(key => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});
