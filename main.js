window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    const newTaskForm = document.getElementById('add-task');

    newTaskForm.addEventListener('submit', e => {
        e.preventDefault();
        if(e.target.elements.task.value != ''){
            const tasks = {
                content: e.target.elements.task.value,
                done: false
            };

            todos.push(tasks);

            localStorage.setItem('todos', JSON.stringify(todos));

            e.target.reset();

            displayTasks();
        }
        else {
            alert('dimohon oentoek mengisi toegas')
        }
    });

    displayTasks();
})

function displayTasks() {
    const taskList = document.getElementById('tasks-list');
    
    taskList.innerHTML = '';
    
    todos.forEach(tasks => {
        const taskItem = document.createElement('div');
        const actions = document.createElement('div');
        const content = document.createElement('div');
        const doneBtn = document.createElement('button');
        const edit = document.createElement('button');
        const deleteBtn = document.createElement('button');

        taskItem.classList.add('task-item');
        content.classList.add('content');
        actions.classList.add('content');
        deleteBtn.classList.add('delete');
        deleteBtn.classList.add('action');
        edit.classList.add('edit');
        edit.classList.add('action');
        doneBtn.classList.add('action');
        
        content.innerHTML = `${tasks.content}`;
        edit.innerHTML = 'selesai';
        deleteBtn.innerHTML = 'hilang';
        doneBtn.innerHTML = 'selesai'

        actions.appendChild(doneBtn);
        actions.appendChild(deleteBtn);
        content.appendChild(actions);
        taskItem.appendChild(content);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);

        if(tasks.done){
            taskItem.classList.add('done-task');
        }

        const input = content.querySelector('input');

        doneBtn.addEventListener('click', e => {
            temp = !tasks.done;
            tasks.done = temp;
            localStorage.setItem('todos', JSON.stringify(todos));
            // alert(tasks.done);
            
            
            if(tasks.done){
                taskItem.classList.add('done-task');
            }
            else {
                taskItem.classList.remove('done-task');
            }
            
            displayTasks();
            
        });

        deleteBtn.addEventListener('click', e => {
            todos = todos.filter( t => t != tasks);
            localStorage.setItem('todos', JSON.stringify(todos));

            displayTasks();
        })

    });
}