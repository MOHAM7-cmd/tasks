let form = document.querySelector(".form");
let input = document.querySelector(".input");
let list = document.querySelector(".list");


// نجيب المهام المخزنة إذا موجودة
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// دالة لحفظ المهام في localStorage
function saveTasks(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}




// دالة لعرض المهام على الشاشة
function renderTasks() {
  list.innerHTML = ""; // نفرغ القائمة
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <h4 class="${task.done ? "done" : ""}">${task.text}</h4>
      <div class="icon">
        <i class="fas fa-check-square"></i>
        <i class="fas fa-trash"></i>
      </div>
    `;
    if(task.done) li.classList.add("done");


    // أزرار
    const checkBtn = li.querySelector(".fa-check-square");
    const deleteBtn = li.querySelector(".fa-trash");

    



    // حدث إنجاز المهمة
    checkBtn.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });

    

    // حدث حذف المهمة
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    list.appendChild(li);
  });
}

// عند إضافة مهمة جديدة
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false }); // نضيف المهمة
  saveTasks(); // نخزن
  renderTasks(); // نعرض
  input.value = ""; // نفرغ الحقل
});

// أول ما يفتح الموقع → نعرض المخزن
renderTasks();