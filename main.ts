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
      <div class="flex items-center justify-between border-b p-[2px] md:p-1 text-white">
        <span class="text-white text-[13px] md:text-[18px]">${item.value}</span>
        <div class="flex gap-2 items-center">
          <button class="edit-btn bg-yellow-600 duration-300 hover:scale-[1.1] cursor-pointer text-white text-[13px] md:text-[18px] py-[2px] px-[6px] md:py-[4px] md:px-[8px] rounded-md">Edit</button>
          <button class="delete-btn bg-red-600 duration-300 hover:scale-[1.1] cursor-pointer text-white text-[13px] md:text-[18px] py-[2px] px-[6px] md:py-[4px] md:px-[8px] rounded-md">Delet</button>
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
