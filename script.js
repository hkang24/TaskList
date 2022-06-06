
class Task {
    constructor(description) {
      this.description = description;
      this.status = false;
    }
  
    static fromJSON(json) {
      return new Task(
        json.description,
        json.status,
      );
    }
  }
  
  class UI {
    constructor() {
      this.form = document.getElementById('form');
  
      this.description = document.getElementById('task-input');
  
      this.tableBody = document.getElementById('table-body');
  
      this.form.addEventListener('submit', (e) => this.onFormSubmit(e));
  
      this.tasks = [];
      this.loadTasksFromLocalStorage();
      this.renderTaskTable();
    }
  
    onFormSubmit(e) {
      e.preventDefault();
  
      const task = new Task(
        this.description.value
      );
  
      this.tasks.push(task);
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }
  
    renderTaskTable() {
      this.tableBody.innerHTML = '';
  
      for (let i = 0; i < this.tasks.length; i++) {
        const type = this.tasks[i];
  
        const tr = this.createTaskTableRow(type);
        this.tableBody.appendChild(tr);
      }
    }
  
    /*
      <tr>
        <td></td> // title
        <td></td> // author
        <td></td> // isbn 
        <td></td> // actions
      </tr>
    */
    createTaskTableRow(task) {
      const tr = document.createElement('tr');
  
      const tdDescription = document.createElement('td');
      const tdStatus = document.createElement('td');
      const tdActions = document.createElement('td');
  
      tdDescription.innerHTML = task.description;
      //tdStatus.innerHTML = task.Status;
  
      const removeButton = this.createRemoveTaskButton(task);
      tdActions.appendChild(removeButton);

      const statusButton = this.createStatusCheck(task);
      tdStatus.appendChild(statusButton);

  
      tr.appendChild(tdDescription);
      tr.appendChild(tdStatus);
      tr.appendChild(tdActions);
  
      return tr;
    }
  
    createRemoveTaskButton(task) {
      const button = document.createElement('button');
  
      button.setAttribute('class', 'btn btn-danger btn-sm');
      button.innerHTML = 'X'
      button.addEventListener('click', () => this.onRemoveTaskClicked(task));
  
      return button;
    }
  
    onRemoveTaskClicked(task) {
      this.tasks = this.tasks.filter((x) => {
        return task.description !== x.description;
      });
  
      this.saveTasksToLocalStorage();
      this.renderTaskTable();
    }

    createStatusCheck(task) {
        const check = document.createElement('div');

        const input = document.createElement('input');
        input.setAttribute('class', 'form-check-input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', '"flexCheckDefault"');
        if (task.status) {
            input.setAttribute('checked', 'true');
        }
        check.appendChild(input);

        return check;
    }

    onStatusClicked(task) {
        task.status = true;
        this.saveTasksToLocalStorage;
    }
  
    saveTasksToLocalStorage() {
      const json = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', json);
    }
  
    loadTasksFromLocalStorage() {
      const json = localStorage.getItem('tasks');
      if (json) {
        const taskArr = JSON.parse(json);
        this.tasks = taskArr.map(x => Task.fromJSON(x));
      }
    }
  }
  
  const ui = new UI();