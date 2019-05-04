/* ---------------------------
    Name:       bamazonCustomer.js
    Developer:  German Garcia
    Date of last update: May 3, 2019

    Purpose: Connect to MySQL database and perform db operations on bamazon_db.
*/

var mysql = require("mysql");
var inquirer = require("inquirer");

selectedProduct = 0;
selectedQuantity = 0;
totalCost = 0;
itemPrice = 0;

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "passw0rd",
    database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
  queryAllProducts();
  
});

function updateProductsTbl(selectionId, quantity) {
    //console.log("updateProductsTbl..."); 
    var query = connection.query("UPDATE products_tbl SET ? WHERE ?", [{
        stock_quantity: quantity
    }, {
        item_id : selectionId 
    }], function(err, res){
        if (err) throw err;
        console.log("Total cost is " + totalCost + ". ");
        console.log("Thank you for buying with us");
        
    });
    connection.end(); 
    //console.log("end of updateProductsTbl..."); 
}

function processTransaction(itemSelected){
    console.log("ProcessTransaction..., itemSelected: " + itemSelected); 

    connection.query("SELECT stock_quantity FROM products_tbl WHERE ?", {
        item_id: itemSelected
    }, function(err, res){
        if (err) throw err;
        
        if (selectedQuantity > res[0].stock_quantity){
        
            console.log("Sorry, Insufficient quantity! Not enough units to fulfill your order");
        } else if (selectedQuantity < res[0].stock_quantity){
        
            updateProductsTbl(itemId, totalQuantity);
        }
    });

    console.log("end of ProcessTransaction");
}

function queryAllProducts() {
  connection.query("SELECT * FROM products_tbl", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " \t| " + res[i].product_name + " \t| " + res[i].department_name + " \t\t| " + res[i].price + " \t| " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    inquirer.prompt([
        {
            name: "productId",
            type: "input", 
            message: "\nWhat is the id of the product you would like to buy (first column)?"
        },
        {
            name: "productQuantity",
            type: "input", 
            message: "\nHow many units would you like to buy?"
        }
    ]).then(function(answer){
        selectedQuantity = parseInt(answer.productQuantity);

        //console.log("selected Quantity:  " + selectedQuantity);
        
        selectedProduct = parseInt(answer.productId);
        itemId = parseInt(answer.productId); // To pass to function processTransaction

        //console.log("selected P: " + selectedProduct);
        
        // product Id and res(index - 1).item_id are not the same. Need to make them equal:
        for (var i = 0; i < res[i].item_id; i++) {
            //console.log("i: " + i + " res[i].item_id: " + res[i].item_id);
            if (selectedProduct === res[i].item_id){
                selectedProduct = i;
                //console.log("iguales: " + selectedProduct + " " + i);
                break;
            }
        }
      
        totalQuantity = res[selectedProduct].stock_quantity - selectedQuantity;
        itemPrice = res[selectedProduct].price;
        totalCost = selectedQuantity * itemPrice; 

        processTransaction(itemId);

    })
  });
}
