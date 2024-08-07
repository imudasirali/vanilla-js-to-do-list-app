// Select the input field for new tasks, the list to display tasks, the form to add tasks,
// the screen reader feedback element, and the heading element
const to_do_input = document.querySelector("#todo");
const list = document.querySelector("#list");
const to_do_form = document.querySelector("#to_do_form");
const sc_feedback = document.querySelector("#sc_feedback");
const heading = document.querySelector("#heading");

// Add event listener for form submission to add a new task
to_do_form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting in the traditional way
  let task = to_do_input.value; // Get the value of the input field
  console.log(task); // Log the task for debugging purposes
  addTaskToDOM(task); // Add the new task to the DOM
  removeValue(to_do_input); // Clear the input field
  screenReaderFeedback(task); // Provide feedback for screen readers
});

// Add event listener for click events on the task list
list.addEventListener("click", function (event) {
  if (hasClassName(event.target, "delete_task")) {
    // Check if the clicked element is a delete button
    const li = event.target.closest("li"); // Find the closest list item
    const taskName = event.target.previousElementSibling.textContent; // Get the task name
    deleteTask(li); // Delete the task from the DOM
    screenReaderFeedback(taskName, "removed"); // Provide feedback for screen readers
    moveFocus(heading); // Move focus to the heading for accessibility
  }
});

// Function to delete a task from the list
function deleteTask(theTarget) {
  list.removeChild(theTarget); // Remove the specified list item from the DOM
}

// Function to move focus to a specified element
function moveFocus(element) {
  element.focus(); // Set focus to the specified element
}

// Function to add a new task to the DOM
function addTaskToDOM(task) {
  let newID = generateID(); // Generate a unique ID for the new task
  let taskItem = createElement("li", "", list, ["class", "task"]); // Create a new list item
  let theCheckbox = createElement("input", null, taskItem, [
    "type",
    "checkbox",
  ]); // Create a checkbox
  let label = createElement("label", task, taskItem, ["for", newID]); // Create a label for the checkbox
  theCheckbox.setAttribute("id", newID); // Set the ID of the checkbox
  let deleteButton = createElement("button", "Delete Task", taskItem, [
    "class",
    "delete_task",
  ]); // Create a delete button
}

// Function to clear the value of an input field
function removeValue(input) {
  input.value = ""; // Clear the input field
}

// Function to provide feedback for screen readers
function screenReaderFeedback(task, feedback = "added") {
  sc_feedback.textContent = `${task} ${feedback}.`; // Update the screen reader feedback text
}

// Function to create a new HTML element and append it to a parent element
function createElement(tagName, textNode, parent, attribute = null) {
  let node = document.createElement(tagName); // Create a new element with the specified tag name
  if (textNode != null) {
    let customTextNode = document.createTextNode(textNode); // Create a text node if text is provided
    node.appendChild(customTextNode); // Append the text node to the element
  }
  if (attribute != null) {
    node.setAttribute(attribute[0], attribute[1]); // Set the specified attribute on the element
  }
  parent.appendChild(node); // Append the element to the parent
  return node; // Return the newly created element
}

// Function to generate a unique ID for a new task
function generateID() {
  let idPrefix = "task_num_"; // Prefix for the task ID
  let tasks = document.querySelectorAll("#list>li"); // Select all existing task list items
  if (tasks.length == 0) {
    return `${idPrefix}0`; // Return ID with 0 if no tasks exist
  }
  return idPrefix + tasks.length; // Return ID with the current number of tasks
}

// Function to check if an element has a specified class name
function hasClassName(element, className) {
  if (element.classList.contains(className)) {
    return true; // Return true if the element has the specified class
  }
  return false; // Return false if the element does not have the specified class
}
