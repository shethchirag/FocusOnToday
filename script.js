const checkBoxesList = document.querySelectorAll(".custom_checkbox");
const inputValue = document.querySelectorAll(".goal_input");
const errorClassAdd = document.querySelector(".error_message");
const AddFocusEvent = document.querySelectorAll(".goal_input");
let progressLabel = document.querySelector(".progress_label");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Just a step away, keep going!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

const completedGoals = () => {
  return Object.values(allGoals).filter((goal) => goal.completed).length;
};

let numCompletedGoals = completedGoals();
progressLabel.innerText = allQuotes[numCompletedGoals];
checkBoxesList.forEach((list) =>
  list.addEventListener("click", (e) => {
    const allFieldFilled = [...inputValue].every((value) => value.value !== "");
    if (allFieldFilled) {
      list.classList.toggle("completed");
      document.querySelector(".error_message").style.visibility = "hidden";
      allGoals[list.nextElementSibling.id].completed =
        !allGoals[list.nextElementSibling.id].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

      // Update numCompletedGoals after the change
      numCompletedGoals = completedGoals();

      document.querySelector(
        ".progress_value > span"
      ).innerText = `${numCompletedGoals}/${
        Object.values(allGoals).length
      } Completed`;

      document.querySelector(".progress_value").style.width = `${
        (numCompletedGoals / Object.values(allGoals).length) * 100
      }%`;
    } else {
      errorClassAdd.classList.add("show_error");
    }
  })
);

AddFocusEvent.forEach((input) => {
  input.value = allGoals[input.id] ? allGoals[input.id].name : "";
  if (allGoals[input.id]) {
    if (allGoals[input.id].completed) {
      input.previousElementSibling.classList.toggle("completed");
    }
  }

  input.addEventListener("focus", () =>
    errorClassAdd.classList.remove("show_error")
  );

  input.addEventListener("input", (e) => {
    if (allGoals[input.id]) {
      if (allGoals[input.id].completed) {
        e.target.value = allGoals[input.id].name;
        return;
      }
    }

    allGoals[e.target.id] = { name: e.target.value, completed: false };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// Update progress bar width and text initially
document.querySelector(".progress_value").style.width = `${
  (numCompletedGoals / Object.values(allGoals).length) * 100
}%`;
document.querySelector(
  ".progress_value > span"
).innerText = `${numCompletedGoals}/${
  Object.values(allGoals).length
} Completed`;
