const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBudget = document.getElementById("total-budget");

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
  }
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
  // Initialize a variable 'sum' to keep track of the total expense
  let sum = 0;

  // Iterate over the children of the 'expenseList' element
  for (let item of expenseList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    // Convert the extracted value string to a floating point number and log it to the console
    console.log(parseFloat(valueString));

    // Add the converted value to the 'sum' variable
    sum += parseFloat(valueString);
  }

  // Set the inner HTML of the 'totalExpense' element to the formatted total expense
  totalExpense.innerHTML = formatMoney(sum);
}
calculateExpense()

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
  // Extract the total income value from the inner HTML of the 'totalIncome' element
  const totalIncomeValue = parseFloat(totalIncome.innerHTML.replace(/,/g, ""));

  // Extract the total expense value from the inner HTML of the 'totalExpense' element
  const totalExpenseValue = parseFloat(totalExpense.innerHTML.replace(/,/g, ""));

  // Check if total expenses exceed total income
  if (totalExpenseValue > totalIncomeValue) {
    // Display an alert if total expenses are greater than total income
    alert("Warning: Total expenses exceed total income!");
  }

  // Calculate the budget by subtracting total expenses from total income
  const budget = totalIncomeValue - totalExpenseValue;

  // Set the inner HTML of the 'totalBudget' element to the formatted budget value
  totalBudget.innerHTML = formatMoney(budget);
}
calculateBudget();

/**
 * Task 3: Delete Entry
 */
function deleteEntry(listId, totalId) {
  const list = document.getElementById(listId);

  list.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".text-red-500");

    if (deleteButton) {
      const listItem = deleteButton.closest("li");
      const isIncome = listItem.querySelector(".text-green-600") !== null;
      const valueElement = listItem.querySelector(isIncome ? '.text-green-600' : '.text-red-600');

      if (valueElement) {
        const value = parseFloat(valueElement.innerHTML.replace(/,/g, ""));
        const totalElement = document.getElementById(totalId);

        totalElement.innerHTML = formatMoney(parseFloat(totalElement.innerHTML.replace(/,/g, "")) - Math.abs(value));

        calculateBudget();
        listItem.remove();
      }
    }
  });
}

function addEntry() {
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  const newEntryHtml = `
    <li class="py-2.5">
      <div class="group flex justify-between gap-2 text-sm">
        <span>${description}</span>
        <div>
          <span class="${colorClass}">${sign}${formatMoney(value)}</span>
          <span
            class="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
          >
            Delete
          </span>
        </div>
      </div>
    </li>
    `;

  // Approach 1:
  list.innerHTML += newEntryHtml;

  // update total income value
  calculateIncome();

  // update total expense value
  calculateExpense();

  // update total bugdet value
  calculateBudget();
}

addExpenseButton.addEventListener("click", addEntry);