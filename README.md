# SimpleReactNative
A basic task manager app using react-native

# Breif app description 
* Task Manager is a mobile productivity app built with React Native that helps users efficiently manage their daily tasks. 
* The app allows users to create, view, complete, edit, and delete tasks with a clean and intuitive interface.

# Features
* Add Tasks: Users can create new tasks with a title and optional description.

* Search Tasks: Real-time filtering of tasks based on title and description.

* Task Completion Toggle: Mark tasks as complete/incomplete; completed tasks are shown with a strikethrough.

* Edit Tasks: Edit the title and description of existing tasks.

* Delete with Confirmation: Prompt users with a confirmation dialog before deleting a task to prevent accidental deletions.

* Expandable Task Items: Tap on a task to expand and view its full description, with options to edit or delete if the task is not completed.

* Responsive UI: Clean, mobile-friendly design with reusable components like TaskForm, TaskList, and ConfirmDelete.

# How to run and install everything:
* Everything in quotes is a command to run
1) Clone the repository
2) Open a terminal and go into the task_manager directory, "cd SimpleReactNative/task_manager"
3) Now run the command: "npm install", this will install the needed packages to run the app
4) To run the app use the command: "npx expo start", this will start the app on localhost port
5) Go to the link that pops up in the terminal, default link should be `http://<host_ip>:8081` but may be different if the port is being used