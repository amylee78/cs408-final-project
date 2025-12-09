  function loadCartItems() {
        let xhr = new XMLHttpRequest();

         xhr.addEventListener("load", function () {
            let data = JSON.parse(xhr.responseText);
            let table = document.getElementById("loaded-items");
            let total = 0;

       
            while (table.rows.length > 1) {
                  table.deleteRow(1);
                }

       
            data.forEach(function (item) {
              let row = table.insertRow();
              let cellId = row.insertCell();
              let cellType = row.insertCell();
              let cellPrice = row.insertCell();
              let cellDescription = row.insertCell();
              let cellAction = row.insertCell();

             cellId.textContent = item.id;
             cellType.textContent = item.type; 
             cellDescription.textContent = item.description; 
             cellPrice.textContent = `$${item.price}`;

            
            let btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.onclick = function () { deleteItem(item.id); };
            cellAction.appendChild(btn);
             total += item.price;
        });

           document.getElementById("total-price").textContent =
            "Total: $" + total.toFixed(2);

    });

    xhr.open("GET", "https://27izq2bl24.execute-api.us-east-2.amazonaws.com/cart");
    xhr.send();
}

function deleteItem(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://27izq2bl24.execute-api.us-east-2.amazonaws.com/cart/${id}`);
    xhr.addEventListener("load", function () {
      loadCartItems(); 
        });
    xhr.send();
  }

function checkout() {
 
  let xhr = new XMLHttpRequest();

    xhr.onload = function () {

    let data = JSON.parse(xhr.responseText);

    let total = 0;
    data.forEach(function (item) {
      total += item.price;
    });

    let name = document.getElementById("card-name").value;
    let cardNumber = document.getElementById("card-number").value;
    let expiration = document.getElementById("card-expiration").value;
    let cvc = document.getElementById("card-cvc").value;

    if (!name || !cardNumber || !expiration || !cvc) {
      alert("Please fill out all card fields.");
      return;
    }

    let payXhr = new XMLHttpRequest();
    payXhr.open("PUT", "https://ysx7n7v4j6.execute-api.us-east-2.amazonaws.com/card");
    payXhr.setRequestHeader("Content-Type", "application/json");
    
    payXhr.onload = function () {
    
      alert("Payment successful!");

      
      let checkoutXhr = new XMLHttpRequest();
      checkoutXhr.open("DELETE", "https://27izq2bl24.execute-api.us-east-2.amazonaws.com/cart");

      checkoutXhr.onload = function () {
      
        loadCartItems();
        document.getElementById("total-price").textContent = "Total: $0.00";
      };

      checkoutXhr.send();

  
      document.getElementById("card-name").value = "";
      document.getElementById("card-number").value = "";
      document.getElementById("card-expiration").value = "";
      document.getElementById("card-cvc").value = "";
    };

    payXhr.send(JSON.stringify({
      cardNumber: cardNumber,
      name: name,
      expiration: expiration,
      cvc: cvc,
      totalPrice: total
    }));
  };

  xhr.open("GET", "https://27izq2bl24.execute-api.us-east-2.amazonaws.com/cart");
  xhr.send();
}

window.onload = function () {
  loadCartItems(); //automatically loads table
  document.getElementById("checkout").onclick = checkout;
};
