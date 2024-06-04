// Initialize Firebase with your config
firebase.initializeApp({
  apiKey: "AIzaSyDiLtmZCDd-cB3uadRYz4II3ue35ceFZew",
  authDomain: "mynewprojectapp-1e676.firebaseapp.com",
  projectId: "mynewprojectapp-1e676",
  storageBucket: "mynewprojectapp-1e676.appspot.com",
  messagingSenderId: "299106473292",
  appId: "1:299106473292:web:67d224b7ac62c4bbfdabe9",
  measurementId: "G-TN6PS748LV",
  });
  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
      console.log ("Task add.");
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }