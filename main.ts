let elForm: Element | null = document.querySelector(".todo-form")
let elTodoList: Element | null = document.querySelector(".todo-list")

interface TodoType {
  id: number,
  value: string
}
let todos: TodoType[] = JSON.parse(localStorage.getItem("todos") || "[]")

renderTodo(todos, elTodoList)

elForm?.addEventListener("submit", function (e) {
  e.preventDefault()
  const data: TodoType = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    value: (e.target as HTMLFormElement).todo.value
  }

  todos.push(data)

  localStorage.setItem("todos", JSON.stringify(todos))
  renderTodo(todos, elTodoList)

  elForm.reset()
})


function renderTodo(arr: TodoType[], list: Element | null) {
  if (list) list.innerHTML = ""

  arr.forEach((item: TodoType) => {
    let elItem = document.createElement("li")
    elItem.innerHTML = `
      <div class="flex items-center justify-between border-b p-1 text-white">
        <span class="text-white">${item.value}</span>
        <div class="flex gap-2 items-center">
          <button class="edit-btn bg-yellow-600 duration-300 hover:scale-[1.1] cursor-pointer text-white py-1 px-2 rounded-md">Edit</button>
          <button class="delete-btn bg-red-600 duration-300 hover:scale-[1.1] cursor-pointer text-white py-1 px-2 rounded-md">Delet</button>
        </div>
      </div>
    `

    // edite part 
    elItem.querySelector(".edit-btn")?.addEventListener("click", () => {
      let newValue = prompt("Yangi qiymat kiriting:", item.value)
      if (newValue) {
        item.value = newValue
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTodo(todos, list)
      }
    })

    // delete part
    elItem.querySelector(".delete-btn")?.addEventListener("click", () => {
      todos = todos.filter(e => e.id !== item.id)
      localStorage.setItem("todos", JSON.stringify(todos))
      renderTodo(todos, list)
    })

    list?.appendChild(elItem)
  })
}
