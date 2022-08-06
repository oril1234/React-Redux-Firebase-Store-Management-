# React-Redux-Firebase-Store-Management-
A React project of a department store management in which products, customers and purchases data is handled by the user.
The user can:
- purchase products in the name of customers
- edit customers and products details, as well as deleting them
- filter purchases data by specific customers, products and dates.
The information in this app is handled using firestore database of firestore, and redux.
## Setup And Installation

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Application:

`npm start`

To Visit App:

`localhost:3000`

## firebase configuration:
1. Go to firebase, and create new project
2. Create firestore database
3. In firestore database create the following collections:
  - Products:id,name,price, quantity
  - Customers:id,firstName, lastName, city
   - Purchases:productId,customerId,date
4. create an API in the firebase project, use the fields mentioned in the screenshot created in the api and paste them in firebaseApp.js file
![image](https://user-images.githubusercontent.com/49225452/183229237-9ff3d9c5-3d9b-4dd0-aeb6-010909da9793.png)


