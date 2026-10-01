
let goals = [
    {
        "id": 1,
        "title": "Laptop",
        "target": 30000,
        "saved": 12000,
    },
    {
        "id": 2,
        "title": "Course fee",
        "target": 4000,
        "saved": 2500,
    },
    {
        "id": 3,
        "title": "Headphones",
        "target": 1500,
        "saved": 1500,
    },
    {
        "id": 4,
        "title": "Books",
        "target": 2000,
        "saved": 500,
    },
    {
        "id": 5,
        "title": "Internet",
        "target": 1000,
        "saved": 200,
    }
]
const goalcards = document.querySelector("#goal-cards");
const goalform = document.querySelector("#goal-form");
const goaltitle = document.querySelector("#goal-title");
const goaltarget = document.querySelector("#goal-target");
const totalgoals = document.querySelector("#total-goals");
const totaltarget = document.querySelector("#total-target");
const movementform = document.querySelector("#movement-form");
const movementamount = document.getElementById("movement-amount");
const search = document.getElementById("search")
const totalsaved = document.getElementById("total-saved")
const submit = document.getElementById("submit")
const Withdraw = document.getElementById("Withdraw")
function displayGoal(goal) {

    const card = document.createElement("div");
    card.className = "card";

    card.id = "card" + goal.id
    
    const title = document.createElement("h3")
    title.textContent = goal.title;

    const target = document.createElement("p")
    target.textContent = `target:${goal.target} AFN`;

    const saved = document.createElement("p");
    saved.className = "saved"
    saved.textContent = `saved:${goal.saved}AFN`;

    const remaining = document.createElement("p")
    remaining.className = "remaining"
    remaining.textContent = `remaining : ${Math.max(0, goal.target - goal.saved)} AFN`

    const percentage = document.createElement("p")
    percentage.className = "percentage"
    percentage.textContent = `percentage : ${Math.min(100, (goal.saved / goal.target) * 100)}%`


    const badge = document.createElement("span");
    badge.className = "badge";
    badge.id = "badge" + goal.id
    if (goal.saved >= goal.target) {
        badge.className = "badge success";
        badge.textContent = "Complete";
    }else{
        badge.className = "In Progress"
        badge.textContent = "In Progress";
    }
    card.appendChild(title);
    card.appendChild(target);
    card.appendChild(saved);
    card.appendChild(badge);
    card.appendChild(percentage);
    card.appendChild(remaining);

    goalcards.appendChild(card);
}
goals.forEach(goal => {
    displayGoal(goal);
});
function updatesummary() {
    let complete = 0;
    let saved = 0;
    let target = 0;

    goals.forEach((goal) => {
        target += goal.target;
        saved += goal.saved;

        if (goal.saved >= goal.target) {
            complete++;
        }
    })
    totalgoals.textContent = complete;
    totalsaved.textContent = saved + "AFN";
    totaltarget.textContent = target +"AFN";
}
updatesummary();
goalform.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = goaltitle.value.trim();

    const target = goaltarget.value;
    const newgoal = {
        id: goals.length + 1,
        title: title,
        target: Number(target),
        saved: 0
    };
    goals.push(newgoal);
    displayGoal(newgoal);
    updatesummary();

    goaltitle.value = "";
    goaltarget.value = "";
});

movementform.addEventListener("submit", (x) => {
    x.preventDefault();

    const amount = Number(movementamount.value);
    const goalname = search.value.trim();
    const goal = goals.find((item) => item.title === goalname);

    if (!goal) {
        return;
    }

    if (x.submitter === Withdraw) {
        if (amount > goal.saved) {
            alert("You cannot withdraw more than the saved amount.");
            return;
        }

        goal.saved -= amount;
    }

    if (x.submitter === submit) {
        goal.saved += amount;
    }

    const card = document.querySelector("#card" + goal.id);
    const saved = card.querySelector(".saved");

    saved.textContent = "saved :" + goal.saved + "AFN";

    const remaining = card.querySelector(".remaining");
    remaining.textContent =
        "remaining : " + Math.max(0, goal.target - goal.saved) + " AFN";

    const percentage = card.querySelector(".percentage");
    percentage.textContent =
        "percentage : " +
        Math.min(100, (goal.saved / goal.target) * 100) +
        "%";

    const badge = document.querySelector("#badge" + goal.id);

    if (goal.saved >= goal.target) {
        badge.className = "badge success";
        badge.textContent = "Complete";
    } else {
        badge.className = "badge";
        badge.textContent = "In Progress";
    }

    updatesummary();

    search.value = "";
    movementamount.value = "";
});