let budgetInput = document.getElementById("budget-input");
let btnSubmit = document.querySelector("#budget-submit");
let budgetForm = document.querySelector("#budget-form");
let budget = document.querySelector("#budget-amount");
let balance = document.querySelector("#balance-amount");
let expenseInput = document.getElementById("expense-input");
let btnExpense = document.querySelector("#expense-submit");
let expenseForm = document.querySelector("#expense-form");
let expense = document.querySelector("#expense-amount");
let amountInput = document.querySelector("#amount-input");

const table = document.querySelector("table");
table.classList.add("table", "w-100");
let heading = document.createElement("thead");
heading.style.fontWeight = "bold";
heading.innerHTML = `<td>title</td><td>cost</td>`;
const tbody = document.createElement("tbody");
table.append(heading, tbody);

function getBudgetAmount(amount) {
  if (!amount) {
    budgetInput.placeholder = "Input can not be empty";
  } else {
    if ((expense.innerText = "")) {
      budget.innerText = amount;
      balance.innerText = amount;
    } else {
      budget.innerText = amount;
      calcExpenses();
    }
    budgetInput.value = "";
  }
}

budgetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBudgetAmount(budgetInput.value);
});

let informations = [];

function addExpenses(exp, costs) {
  if (!exp.length || !costs.length) {
    expenseInput.placeholder = "Input can not be empty";
    amountInput.placeholder = "Input can not be empty";
  } else {
    const userExp = {
      exp: exp,
      costs: parseInt(costs),
    };
    informations.push(userExp);
    displayExp(informations);
    expenseInput.value = "";
    amountInput.value = "";
  }
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpenses(expenseInput.value, amountInput.value);
});

function displayExp(informations) {
  tbody.innerHTML = null;
  for (i = 0; i < informations.length; i++) {
    const newTr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdcost = document.createElement("td");
    const iconEdit = document.createElement("td");
    const iconTrash = document.createElement("td");

    newTr.append(tdTitle, tdcost, iconEdit, iconTrash);
    tdTitle.textContent = informations[i].exp;
    tdcost.textContent = informations[i].costs;
    iconEdit.innerHTML = `<i  class="fas fa-edit"></i>`;
    iconTrash.innerHTML = `<i  class="fas fa-trash"></i>`;
    tbody.append(newTr);

    function editAndDelete() {
      let balanceUpdate =
        parseInt(balance.textContent) + parseInt(tdcost.textContent);
      balance.innerHTML = balanceUpdate;
      let expenseUpdate =
        parseInt(expense.textContent) - parseInt(tdcost.textContent);
      expense.innerHTML = expenseUpdate;
      const tr = event.target.parentNode.parentNode;
      let index = tr.rowIndex - 1;
      informations.splice(index, 1);
      tr.remove();
    }

    iconEdit.addEventListener("click", () => {
      amountInput.value = tdcost.textContent;
      expenseInput.value = tdTitle.textContent;

      editAndDelete();
    });

    iconTrash.addEventListener("click", editAndDelete);
  }
  calcExpenses();
}

function calcExpenses() {
  let totalExp = 0;
  for (i = 0; i < informations.length; i++) {
    totalExp = informations[i].costs + totalExp;
  }
  expense.innerText = totalExp;
  updateBalance();
}

function updateBalance() {
  balance.innerText = parseInt(budget.innerText) - parseInt(expense.innerText);
}
