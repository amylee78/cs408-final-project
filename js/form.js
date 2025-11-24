function loadCommissionTypes() {
     const xhr = new XMLHttpRequest();
     xhr.open("GET", "https://6ip75gssuf.execute-api.us-east-2.amazonaws.com/price");
    
      xhr.onload = function() {
        if (xhr.status === 200) {
            const items = JSON.parse(xhr.responseText);
            items.sort((a, b) => b.type.localeCompare(a.type)); //sorts from z to a
            
            const select = document.getElementById("commission-type");
          
            
            items.forEach(item => {
                const option = document.createElement("option");
                option.value = item.type;
                option.textContent = `${item.type} — $${item.price}`;
                select.appendChild(option);
            });
        } 
        else {
            alert("Error loading commission prices");
        }
    };

    xhr.send();
}

 document.getElementById("send-data").onclick = function() {
  
    const name = document.getElementById("new-name").value;
    const email = document.getElementById("new-email").value;
    const type = document.getElementById("commission-type").value;
    const species = document.getElementById("new-species").value;
    const description = document.getElementById("new-description").value;


    // Generates a unique ID
     let id = crypto.randomUUID().toString().substring(0, 8)

   

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://27izq2bl24.execute-api.us-east-2.amazonaws.com/cart");
    xhr.setRequestHeader("Content-Type", "application/json");

     xhr.addEventListener("load", function () {
        alert("Your commission form has been submitted!");
        
    });

    
    

       if (!email.includes("@") || !email.includes(".com")  )
    {
       alert("email must contain a @ and a .com , please try again")
    }

      xhr.send(JSON.stringify({
        id: id,
        name: name,
        email: email,
        type: type,
        species: species,        
        description: description
    }));

    
    document.getElementById("new-name").value = "";
    document.getElementById("new-email").value = "";
    document.getElementById("commission-type").value = "";
     document.getElementById("new-species").value = "";
    document.getElementById("new-description").value = "";

    
};

// Load commission types when page loads
window.onload = loadCommissionTypes;