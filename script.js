let exerciseDatabase = [
    "Liegestütze", "Kniebeugen", "Klimmzüge", "Unterarmstütze"]

function showExercise(){
    let exerciseList = document.getElementById("exercise-list");
    exerciseList.innerHTML="";

    for(let i =0; i < exerciseDatabase.length; i++){
        let li = document.createElement("li");
        li.textContent = exerciseDatabase[i];
        exerciseList.appendChild(li);
    }
}

function addExercise(){
    let newExerciseName = document.getElementById("new-exercise-name").value;
    exerciseDatabase.push(newExerciseName);
    showExercise();
}

//Trainingsplan-Konfigurator
let workoutPlan = [];

function showWorkoutPlan(){
    let workoutList = document.getElementById("workout-list");
    workoutList.innerHTML ="";

    for (let i = 0; i < workoutPlan.length; i++){
        let li = document.createElement("li");
        li.textContent = workoutPlan[i].exercise + " - " + workoutPlan[i].sets + " Sätze";
        workoutList.appendChild(li);
    }
}

function addWorkout(){
    let exerciseDropdown = document.getElementById("exercise-dropdown");
    let selectedExercise = exerciseDropdown.options[exerciseDropdown.selectedIndex].value;
    let setsInput = document.getElementById("sets-input").value;

    let workout = {exercise: selecetedExercise, sets: setsInput};
    workoutPlan.push(workout);
    showWorkoutPlan();
}

//Wochenrückblick
let weeklySummary =[];
function showWeeklySummary(){
    
    let weeklySummaryList = document.getElementById("weekly-summary");
    weeklySummaryList.innerHTML ="";

    for(let i = 0; i<weeklySummary.length; i++){
        let li = document.createElement("li");
        li.textContent = weeklySummary[i];
        weeklySummaryList.appendChild(li);
    }
}