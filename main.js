let elForm = document.querySelector(".todo-form");
let elTodoList = document.querySelector(".todo-list");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
renderTodo(todos, elTodoList);
elForm === null || elForm === void 0 ? void 0 : elForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        value: e.target.todo.value
    };
    todos.push(data);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodo(todos, elTodoList);
    elForm.reset();
});
function renderTodo(arr, list) {
    if (list)
        list.innerHTML = "";
    arr.forEach((item) => {
        var _a, _b;
        let elItem = document.createElement("li");
        elItem.innerHTML = `
      <div class="flex items-center justify-between border-b p-[2px] md:p-1 text-white">
        <span class="text-white text-[13px] md:text-[18px]">${item.value}</span>
        <div class="flex gap-2 items-center">
          <button class="edit-btn bg-yellow-600 duration-300 hover:scale-[1.1] cursor-pointer text-white text-[13px] md:text-[18px] py-[2px] px-[6px] md:py-[4px] md:px-[8px] rounded-md">Edit</button>
          <button class="delete-btn bg-red-600 duration-300 hover:scale-[1.1] cursor-pointer text-white text-[13px] md:text-[18px] py-[2px] px-[6px] md:py-[4px] md:px-[8px] rounded-md">Delet</button>
        </div>
      </div>
    `;
        // edite part 
        (_a = elItem.querySelector(".edit-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let newValue = prompt("Yangi qiymat kiriting:", item.value);
            if (newValue) {
                item.value = newValue;
                localStorage.setItem("todos", JSON.stringify(todos));
                renderTodo(todos, list);
            }
        });
        // delete part
        (_b = elItem.querySelector(".delete-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            todos = todos.filter(e => e.id !== item.id);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodo(todos, list);
        });
        list === null || list === void 0 ? void 0 : list.appendChild(elItem);
    });
}
export {};
//# sourceMappingURL=main.js.map