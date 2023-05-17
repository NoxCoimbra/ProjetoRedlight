# RedLight Summer Internship 2023 - Dev Challenge

![banner](/assets/banner.png)

---

In this challenge we expect you to **implement** a web platform to manage internship applications in a company 😉 

The aim of this challenge is to build a simple web platform that helps to manage different role submissions for that company.

---

### Goals
This web platform should allow the user to:

- Create new applicants
- List existing applicants
- Show an existing applicant
- Update existing applicants
- Delete an existing applicant
- Search for applicants
- Create new roles
- List existing roles
- Show an existing role
- Update existing roles
- Delete an existing role
- Search for roles
- Change the applicant status on a given role

---

### Phases

##### The frontend

On the frontend phase we want to see web pages where you can complete the goals established before. That is, create, list, search, update, and delete both applicants and roles.

Feel free to use any CSS frameworks like **Tailwind**, **Bootstrap**, or any similar one if your are familiar with it. If you want a challenge you can also try to finish this step using any web framework such as **React**, **Angular** or **VueJS**.

##### The backend

For the backend you should develop a server that responds to the frontend requests and integrates with a database that stores the information about the applicants and roles.

Here you're also free to use any backend technology you're familiar with, be it **Ruby on Rails**, **.NET**, **Django**, **ExpressJS**, or any other of your choosing. For database technologies you can achieve this either using relational databases such as **PostgreSQL** and **MySQL** or by using non-relational databases such as **MongoDB**.

##### Some extras

Once the application allows the user to perform the main goals, you can also develop the following extras:

- 	Make the mentioned entities soft deletable.
-	Turn the status enum into a database type instead of using ints as values for this column.
-	Validate that the backend can only receive the parameters you want it to receive, no more, no less.
-	Create validations for the form fields.
-	Upload an avatar for an applicant
-	Add an option to create multiple applicants at once

##### Tips

Take advantage of your strengths. If you feel that the backend is not going so well then focus more on the frontend and vice versa.

---

### Notes

An applicant is composed of:

- name
- phone number
- email
- avatar (optional)
- status (enum which can have the following values: approved, rejected or under analysis)
- roles in which the candidate fits

Example:

- name: Otto Blevins
- phone number: 239239239
- email: ottoblevins@gmail.com
- status: Under analysis
- roles: Frontend, Backend

A role is composed of:

- name
- applicants that fit in this role

Example:

- name: Frontend
- applicants:
	- Otto Blevins
	- Clara Hoffman
	- Clementine Hewitt
---
### Delivery 

**Consider adding a README.md file to the project with documentation on how to set up and run the project when testing it, as well as any important general information that we should know about the project and its code.** 

When you're done, you should fork this repository and upload your work there to share it with us or you can simply send everything in a .zip folder or a WeTransfer link. Please try to share your process going through the steps you took to reach your final version.