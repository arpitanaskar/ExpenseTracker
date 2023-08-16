const form = document.querySelector('#my-form');
const ul = document.querySelector('#list');

const div = document.createElement('div');
div.className = 'd-grid gap-2 d-md-flex justify-content-md-end';

const editBtn = document.createElement('button');
editBtn.setAttribute('type', 'button');
editBtn.className = 'btn btn-warning';
editBtn.appendChild(document.createTextNode('Edit'));

const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('type', 'button');
deleteBtn.className = 'btn btn-danger';
deleteBtn.appendChild(document.createTextNode('Delete'));

const alertSection = document.querySelector('#alert-section');

const alertmsg = document.createElement('div');
alertmsg.setAttribute('role', 'alert');
alertmsg.className = 'alert';
alertSection.appendChild(alertmsg);

let key = 0;

form.addEventListener('submit', storeData);

function storeData(e) {
  e.preventDefault();

  const amount = document.querySelector('#expenseAmount').value;
  const description = document.querySelector('#description').value;
  const category = document.querySelector('#category').value;

  const expense = { amount, category, description };

  if (amount === '' || category === null) {
    makeAlert('Enter all specified field!', 'alert alert-danger');
  } else {
    localStorage.setItem(++key, JSON.stringify(expense));

    addToList(expense);
    form.reset();
    makeAlert('Data stored successfully!', 'alert alert-success');
  }
}

function addToList(expense) {
  document.querySelector('#list-section').className = 'container col-8 my-5'; // visible the list

  const li = document.createElement('li');
  li.className = 'list-group-item';
  const text = document.createTextNode(
    `Rs: ${expense.amount} - ${expense.category} - ${expense.description}`
  );

  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(div);

  ul.appendChild(li);

  editBtn.onclick = () => {
    document.querySelector('#expenseAmount').value = expense.amount;
    document.querySelector('#description').value = expense.description;
    document.querySelector('#category').value = expense.category;
    localStorage.removeItem(key);
    ul.removeChild(li);
    if (!ul.firstElementChild) {
      document.querySelector('#list-section').className = 'invisible';
    }
  };

  deleteBtn.onclick = () => {
    localStorage.removeItem(key);
    ul.removeChild(li);
    makeAlert('Data removed successfully!', 'alert alert-success');
    if (!ul.firstElementChild) {
      document.querySelector('#list-section').className = 'invisible';
    }
  };
}

function makeAlert(msg, alertType) {
  alertmsg.className = alertType;
  alertmsg.textContent = msg;

  setTimeout(() => {
    alertmsg.className = 'alert';
    alertmsg.textContent = '';
  }, 3000);
}
