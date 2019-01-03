const mysql = require('mysql');
const inquirer = require('inquirer');
const Table = require('cli-table3');
const figlet = require('figlet');

figlet("Bamazon", {
    font: "chunky"
}, function (err, data) {

    console.log(data);

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Goof4ball$",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    //   Log to verify established connection to database
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

function displayProducts() {
    const query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, data) {
        console.log(data)

        let table = new Table({
            head: ['ID', 'Product', 'Price'],
            colWidths: [5, 30, 5, 12]
        });

        for (let i = 0; i < data.length; i++) {
            table.push([
                data[i].item_id,
                data[i].product_name,
                {
                    hAlign: 'right',
                    content: data[i].price.toFixed(2)
                }
            ])
        }
        console.log(table.toString())
    })

    offerProducts()
};

function offerProducts() {
    let query = 'SELECT * FROM products'

    connection.query(query, function(err, data) {
      // console.log(data)
      inquirer
        .prompt ([
          {
            name: 'choice',
            type: 'input',
            message: 'What is the ID of the product you would like to purchase?',
            validate: function(value) {
              if (isNaN(value) === false) {
                return true
              } 
                return false
              }
          },
          {
            name: 'qty',
            type: 'input',
            message: 'How many units would you like to purchase?',
            validate: function(value) {
              if (isNaN(value) === false) {
                return true
              } 
                return false
              }
          }
        ])
        .then(function(answer) {
          // console.log(answer.choice, answer.qty)
        
          connection.query(query + ' WHERE item_id ='  + answer.choice, function(err, data) {
  
            if (parseInt(answer.qty) <= data[0].stock_quantity) {
              var newQty = data[0].stock_quantity - parseInt(answer.qty)
              // console.log("\n" + newQty)
              
              connection.query('UPDATE products SET stock_quantity =' + newQty + " WHERE item_id =" + answer.choice, function(err, response){
                // console.log(response);
                var cost = answer.qty * data[0].price,
                    tax = cost * .065,
                    total = cost + tax
              
                // var lines = process.stdout.getWindowSize()[0];
                //   for(var i = 0; i < lines; i++) {
                //     console.log('\r\n');
                //   }
  
                // console.log(cost)
                console.log('\n---------------------------------------------------------------\n',
                            '\nYour order has been accepted\n',
                            '\n(' + answer.qty + ') ' + data[0].product_name + ' @ $' + data[0].price.toFixed(2) + ' each \n',
                            '\n                                          sub-Total: $ ' + cost.toFixed(2),
                            '\n                                           6.5% Tax:  $ ' + tax.toFixed(2),
                            '\n                                         Total Cost: $ ' + total.toFixed(2) + '\n',
                            '\n THANK YOU for shopping at BAMAZON!\n',
                            '\n---------------------------------------------------------------\n')
  
                keepShopping();
                
              })
            } 
            else {
              console.log('\n---------------------------------------------------------------\n',
                          '\nBased on your request, we do not have enough of the',
                          '\n"' + data[0].product_name + '" you are looking for in stock.\n', 
                          '\nPlease try again\n',
                          '\n---------------------------------------------------------------\n')
  
              offerProducts();
  
            }
          });
        })
    })
  }

          
function keepShopping() {
    inquirer
    .prompt(
      {
        name: 'contShopping',
        type: 'list',
        message: 'Would you like to continue shopping at BAMAZON?',          
        choices: ['YES', 'NO']

      })
    .then(function(response) {
      if (response.contShopping === 'YES') {
        displayProducts()        
      }
      else {
        process.exit()
      }
    })
}