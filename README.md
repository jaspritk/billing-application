# Introduction

Forktalk is a MEAN Stack billing appilication for restraunts and hotel owners which helps them to manage customers and their Bill details and allow restaurateurs to oversee all processes of their operations using a single solution.

# Features 

## 1. Dashboard

* The user can view the ranking of the food stuffs and the total number of unique consumers based on the Dashboard sales.

## 2. Create Bill 

* If the user already exists, the bill will be added to the previous/old bill. The user can generate bills for new customers. This facilitates finding customer information.
* When the details are successfully added to the database, a success message will be toast.
* To create a bill, the drawer simply has to input the food item's name from the dropdown menu (which is obtained from an api), the amount, and the platetype (half or full). Based on this information, the total and grandtotal will be generated with 5% of GST (standard GST on Food).
* If the customer is already registered, the drawer can add the bill with the distinct phone number without generating a new customer ID.
* Share the Cost - If a group of friends wants to split the bill, it will be divided equally among them.
* After payment, bill invoice can be shared with the user via email. 

## 3. Drawer (person who is creating bill)

* We can create, update, delete drawer details here.

## 4. Menu

* A menu is added, together with its price, name, and category, and is then recorded in a database.
* Included a categorization filter.
* Edit and remove the menu.

## Find Customer

* The consumer is listed with all the information about their visit in this component.
* Look up customers by name.

# Testing

Tested application all the possible cases of the reactive form, from client side.

# Steps to run application

1. Clone project 
2. Goto client folder and run `npm i` this will install alll the dependencies required for frontend.
3. Then do the same with server, run `npm i` in server folder.
4. After completion of all the dependencies, setup mongodb-compass and run `sudo systemctl start mongod` in terminal to start mongodb.
5. Then start server by `nodemon`
6. Atlast start angular by running `ng serve -o`.