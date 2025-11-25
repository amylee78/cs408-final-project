document.getElementById("send-data").onclick = function () {

    // Generate ID
  
      let id = crypto.randomUUID().toString().substring(0, 8)

    // Gets user inputs
    
    let name = document.getElementById("new-name").value;
    let email = document.getElementById("new-email").value;
    let topic = document.getElementById("new-topic").value;
    let description = document.getElementById("new-description").value;

    // Creates new HTTP request
    let xhr = new XMLHttpRequest();

    // Send PUT request to your AWS endpoint
    xhr.open("PUT", "https://3xxc05472j.execute-api.us-east-2.amazonaws.com/inquiry");
    xhr.setRequestHeader("Content-Type", "application/json");

   
    xhr.addEventListener("load", function () {
        alert("Your inquiry has been submitted!");
        
    });

    if (!name || !email || !topic || !description) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    if (!email.includes("@") || !email.includes(".com")  )
    {
       alert("email must contain a @ and a .com , please try again");
    }
   

    // Send data
    xhr.send(JSON.stringify({
        id: id,
        name: name,
        email: email,
        topic: topic,
        description: description
    }));

    // Clears input fields
    
    document.getElementById("new-name").value = "";
    document.getElementById("new-email").value = "";
    document.getElementById("new-topic").value = "";
    document.getElementById("new-description").value = "";
};


window.onload = loadItems;