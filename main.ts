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
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        value: (e.target as HTMLFormElement).todo.value
    }

    todos.push(data)

    localStorage.setItem("todos", JSON.stringify(todos))
    renderTodo(todos, elTodoList)

    elForm.reset()
})

function renderTodo(arr: TodoType[], list: Element | null) {
  if (!list) return
  list.innerHTML = ""

  arr.forEach((item: TodoType) => {
    let elItem = document.createElement("li")
    elItem.className = "flex items-center justify-between p-2 border-b text-white"

    // todo matni
    const textSpan = document.createElement("span")
    textSpan.textContent = item.value

    const btnWrapper = document.createElement("div")
    btnWrapper.className = "flex gap-2"

    //  Edit
    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.className = "text-white bg-yellow-500 rounded-md px-2 py-1 cursor-pointer hover:scale-[1.1] duration-300"
    editBtn.onclick = () => {
      const newValue = prompt("Edit todo:", item.value)
      if (newValue && newValue.trim()) {
        item.value = newValue.trim()
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTodo(todos, list)
      }
    }

    //  Delete
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "text-white bg-red-600 rounded-md px-2 py-1 cursor-pointer hover:scale-[1.1] duration-300"
    deleteBtn.onclick = () => {
      todos = todos.filter((t) => t.id !== item.id)
      localStorage.setItem("todos", JSON.stringify(todos))
      renderTodo(todos, list)
    }

    btnWrapper.appendChild(editBtn)
    btnWrapper.appendChild(deleteBtn)

    elItem.appendChild(textSpan)
    elItem.appendChild(btnWrapper)

    list.appendChild(elItem)
  })
}
