const budgetValue = document.getElementsByClassName('budget-val')[0]
const budgetBtn = document.getElementsByClassName('budgetBtn')[0]
const budgetCard = document.getElementsByClassName('budget-cards')[0]
const expenseDetailList = document.getElementById('expense-list')


budgetBtn.addEventListener('click', function () {

    if (budgetValue.value === "") {
        alert('Enter Budget Value')
    } else {
        console.log('budget => ', budgetValue.value);
        const userBudCard = document.createElement('h4')
        userBudCard.innerHTML = `
        <h4 class="user-budget">My Budget: $ ${budgetValue.value}</h4>
        `
        budgetCard.appendChild(userBudCard)
    }

})

// Expense Form

const expenseDueDate = document.getElementById('expense-due-date')
const expenseAmount = document.getElementById('expense-amount')
const expenseCategory = document.getElementById('expense-category')
const expensePaymentDate = document.getElementById('payment-date')
const expenseDescription = document.getElementById('desc')

// Below empty array ma listItem jo append ho ga uss ka data as a object iss array ma push ho jaye ga.
let numOfTransaction = []

let expenseSum = []

const submitForm = document.getElementById('submit-form')
submitForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let expenseFormData = {
        expAmount: expenseAmount.value,
        expCat: expenseCategory.value,
        expPaymentDate: expensePaymentDate.value,
        expDesc: expenseDescription.value
    }

    const listItem = document.createElement('li')
    listItem.innerHTML = `

    <div class="ul-item">
    <i class="fa fa-circle circle" aria-hidden="true"></i>
        <div class="listItemtext">
         <p>${expenseFormData.expCat}</p>
         <p>${expenseFormData.expPaymentDate}</p>
         <p>${expenseFormData.expDesc}</p>
        </div>
    </div>
   <p id="expAmount">${expenseFormData.expAmount}</p>
   <i class="fa fa-times cross" aria-hidden="true"></i>
   `
    //    Below if condition ma agr "expenseFormData" agr empty nhi hoga tw "listItem" append hoga aur sath hi "numOfTransaction" jo hum na empty array ooper bnai ha uss ma wo object push ho jaye ga.
    if (expenseFormData !== {}) {
        expenseDetailList.appendChild(listItem)
        numOfTransaction.push(expenseFormData)

    }

    // Expense Display Data Logic in 2nd Column (For Date)
    let currDate = document.getElementsByClassName('date')[0]
    let setDate = new Date()
    currDate.innerText = setDate.toDateString()

    // Expense Display Data Logic in 2nd Column (For No. of Transactions)
    const totalTransaction = document.querySelector('.totalExpenseItems')
    totalTransaction.innerText = `No. of Transaction: ${numOfTransaction.length}`

    // Expense Display Data Logic in 2nd Column (For Sum of all Expenses)
    const totalExpAmount = document.querySelector('.sumOfExpenses')
    if (expenseFormData !== {}) {
        expenseSum.push(parseInt(expenseFormData.expAmount))
        // console.log(typeof (expenseSum));
    }
    console.log(expenseSum);

    let totalExpenses = expenseSum.reduce(function (preVal, currVal) {
        return preVal + currVal
    }, 0)
    console.log('totalExpenses => ' + totalExpenses);
    totalExpAmount.innerText = `$ ${totalExpenses}`





    // Remove Expense List-Item
    const removeExpense = listItem.getElementsByClassName('cross')[0]
    removeExpense.addEventListener('click', () => {
        listItem.remove()
        totalTransaction.innerText = `No. of Transaction: ${numOfTransaction.length - 1}`
        totalExpAmount.innerText = `$ ${totalExpenses - expenseFormData.expAmount}`


        console.log('Item Removed');
    })

})




const balanceBtn = document.querySelector(".balanceBtn")
balanceBtn.addEventListener('click', () => {
    const userExpense = document.createElement('h4')

    let totalExpenses = expenseSum.reduce(function (preVal, currVal) {
        return preVal + currVal
    }, 0)
    userExpense.innerText = `Expenses = $ ${totalExpenses}`

    budgetCard.appendChild(userExpense)

    const balance = document.createElement('h4')
    balance.innerText = `Balance = $ ${budgetValue.value - totalExpenses}`
    console.log('budgetValue => ' + budgetValue.value);
    budgetValue.value = ""
    budgetCard.appendChild(balance)

})


