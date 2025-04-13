// document.addEventListener("DOMContentLoaded", function () {
//   // تحميل المهام من LocalStorage عند تحميل الصفحة
//   const taskList = document.getElementById("task-list");
//   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   // عرض المهام المحفوظة في LocalStorage
//   savedTasks.forEach((taskText) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<span>${taskText}</span><button onclick="removeTask(this)">حذف</button>`;
//     taskList.appendChild(li);
//   });

//   // إضافة مهمة جديدة
//   document.getElementById("todo-form").addEventListener("submit", function (e) {
//     e.preventDefault();
//     const taskInput = document.getElementById("task-input");
//     const taskText = taskInput.value.trim();

//     if (taskText !== "") {
//       // إضافة المهمة إلى القائمة
//       const li = document.createElement("li");
//       li.innerHTML = `<span>${taskText}</span><button onclick="removeTask(this)">حذف</button>`;
//       taskList.appendChild(li);

//       // إضافة المهمة إلى LocalStorage
//       savedTasks.push(taskText);
//       localStorage.setItem("tasks", JSON.stringify(savedTasks));

//       taskInput.value = "";
//     }
//   });
// });

// localStorage.setItem("UsersArray", JSON.stringify([]));

function addNewUser() {
  let UsersArray = JSON.parse(localStorage.getItem("UsersArray")) || [];

  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pasword").value;

  console.log(email, password);

  const existingUser = UsersArray.find((user) => user.email === email);
  if (existingUser) {
    alert("User already exists with this email!");
    return;
  }

  const newUser = {
    email: email,
    password: password,
    todo: [],
  };

  UsersArray.push(newUser);

  localStorage.setItem("UsersArray", JSON.stringify(UsersArray));

  console.log("New user added:", newUser);
  alert("User registered successfully!");

  localStorage.setItem("userData", JSON.stringify(newUser));
}

// حذف المهمة من القائمة و LocalStorage
function removeTask(button) {
  const taskList = document.getElementById("task-list");
  const taskItem = button.parentElement;
  const taskText = taskItem.querySelector("span").textContent;

  // إزالة المهمة من LocalStorage
  let savedTasks = JSON.parse(localStorage.getItem("tasks"));
  savedTasks = savedTasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));

  // إزالة المهمة من القائمة
  taskList.removeChild(taskItem);
}

const UsersArray = JSON.parse(localStorage.getItem("UsersArray"));

function printValue() {
  console.log(UsersArray);

  const email = document.getElementById("email")?.value;
  const Password = document.getElementById("password")?.value;

  const checkUser = UsersArray.find(
    (user) =>
      user.email.toLowerCase() === email &&
      user.password.toLowerCase() === Password
  );

  console.log(checkUser);

  console.log(email, Password);

  if (checkUser) {
    window.location.href = "./index.html";
    window.location = "./index.html";
    console.log(";oqdjldl");
    localStorage.setItem("userData", JSON.stringify(checkUser));
  } else {
    alert("email or password are inCorrect");
  }
}

const useData = JSON.parse(localStorage.getItem("userData"));

console.log(useData);

const loginButton = document.getElementById("loginButton");
const RegisterButton = document.getElementById("register");
const toDoButton = document.getElementById("toDo");
const AddtoDoButton = document.getElementById("AddToDo");

console.log(loginButton);

if (useData) {
  loginButton.style.display = "none";
  RegisterButton.style.display = "none";
} else {
  toDoButton.style.display = "none";
  AddtoDoButton.style.display = "none";
}

const parentToDo = document.querySelector(".toDoos-container");

console.log(parentToDo);

function deleteTodo(id) {
  const useData = JSON.parse(localStorage.getItem("userData"));
  if (!useData || !Array.isArray(useData.todo)) return;

  // Filter out the todo with the given id
  const filteredToDo = useData.todo.filter((todo) => todo.id !== id);

  // Update the todos in useData
  useData.todo = filteredToDo;

  // Update UsersArray
  let UsersArray = JSON.parse(localStorage.getItem("UsersArray")) || [];
  UsersArray = UsersArray.map((user) => {
    if (user.email === useData.email) {
      // Replace the user with updated todos
      user.todo = filteredToDo;
    }
    return user;
  });

  // Save the updated userData and UsersArray back to localStorage
  localStorage.setItem("userData", JSON.stringify(useData));
  localStorage.setItem("UsersArray", JSON.stringify(UsersArray));

  console.log("Deleted todo with id:", id);
  window.location.reload(); // Optionally, you can use renderTodos() instead of reloading
}
function markAsAssign(id) {
  const useData = JSON.parse(localStorage.getItem("userData"));
  if (!useData || !Array.isArray(useData.todo)) return;

  // Find the todo item to update
  const todoToUpdate = useData.todo.find((todo) => todo.id === id);
  if (todoToUpdate) {
    // Mark as completed
    todoToUpdate.completed = true;

    // Update UsersArray to reflect the changes
    let UsersArray = JSON.parse(localStorage.getItem("UsersArray")) || [];
    UsersArray = UsersArray.map((user) => {
      if (user.email === useData.email) {
        user.todo = useData.todo;
      }
      return user;
    });

    // Save the updated userData and UsersArray back to localStorage
    localStorage.setItem("userData", JSON.stringify(useData));
    localStorage.setItem("UsersArray", JSON.stringify(UsersArray));

    console.log("Task marked as completed with id:", id);
    window.location.reload(); // Optionally, you can use renderTodos() instead of reloading
  }
}

const toDoCards = useData.todo.map((item, index) => {
  const div = document.createElement("div");
  const TodoTitle = document.createElement("h2");
  const TodoEndDate = document.createElement("p");
  const TodoButton = document.createElement("button");
  const DeleteTodoButton = document.createElement("p");
  DeleteTodoButton.addEventListener("click", () => {
    deleteTodo(item.id);
  });
  TodoButton.addEventListener("click", () => {
    markAsAssign(item.id);
  });

  TodoTitle.textContent = item.title;
  TodoEndDate.textContent = item.dueDate;
  DeleteTodoButton.textContent = "x";

  div.style.padding = "10px";
  div.style.margin = "10px 0";
  div.style.backgroundColor = "#007bff";
  div.style.border = "1px solid #ccc";
  div.style.borderRadius = "8px";
  div.style.fontFamily = "Arial, sans-serif";
  div.style.display = "block";
  div.style.width = "30%";
  div.style.textAlign = "center";
  div.style.padding = "10px";
  div.style.transform = "transelateY(-10px)";
  div.classList.add("todo-card");
  TodoButton.classList.add("todo-card-btn");
  DeleteTodoButton.classList.add("delete-todo-card-btn");

  if (item.completed) {
    div.classList.add("todo-card-finished");
    TodoButton.textContent = "done";
    TodoButton.disabled = true;
    // TodoButton.style.backgroundColor = "#52c41a";
  } else {
    TodoButton.textContent = "Assign as done";
  }

  div.append(TodoTitle);
  div.append(TodoEndDate);
  div.append(TodoButton);
  div.append(DeleteTodoButton);

  return div;
});
toDoCards.forEach((card) => parentToDo.appendChild(card));

function OpenModal() {
  const Modal = document.querySelector("#modal");
  const Modal2 = document.querySelector("#modal1");

  Modal.style.display = "flex";
  Modal2.style.display = "flex";
}

function closeModal() {
  const Modal = document.querySelector("#modal");
  const Modal2 = document.querySelector("#modal1");

  Modal.style.display = "none";
  Modal2.style.display = "none";
}

const ToDoTask = document.querySelector("#TaskTitle")?.value;
const ToDoTaskDate = document.querySelector("#date")?.value;

function addNewTask() {
  const ToDoTask = document.querySelector("#TaskTitle")?.value;
  const ToDoTaskDate = document.querySelector("#date")?.value;

  if (!ToDoTask || !ToDoTaskDate) {
    alert("Please enter both task title and due date.");
    return;
  }

  const newTodo = {
    id: Date.now(),
    title: ToDoTask,
    completed: false,
    dueDate: ToDoTaskDate,
  };

  // Get current user data
  const useData = JSON.parse(localStorage.getItem("userData"));
  useData.todo.push(newTodo);

  // Save updated userData
  localStorage.setItem("userData", JSON.stringify(useData));

  // Update UsersArray
  let UsersArray = JSON.parse(localStorage.getItem("UsersArray")) || [];
  UsersArray = UsersArray.filter((user) => user.email !== useData.email);
  UsersArray.push(useData);
  localStorage.setItem("UsersArray", JSON.stringify(UsersArray));

  window.location.reload();
}

function log_out() {
  localStorage.removeItem("userData");
  window.location.href = "./login.html";
}

if (!useData) {
  window.location.href = "./login.html";
}
