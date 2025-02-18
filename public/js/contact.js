(function() {
    "use strict"

 let form = document.querySelector('#contact-form')

document
.querySelector("#contact-form-button") 
.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formValid = true;
    if (!form.checkValidity()) {
        formValid = false;
    }
    form.classList.add('was-validated');
    if(formValid) {
          sendTheEmail();
}
 
}); 

function sendTheEmail(){
    console.log("You clicked the submit button.");
    let obj = {
        sub:"Someone submitted a contact form!",
        text: `${document.querySelector("#first-name").value} 
        ${document.querySelector("#last-name").value} 
        sent you a message that reads ${document.querySelector("#msg").value}. 
        Their email address is ${document.querySelector("#mail").value}`,
    };
   
    fetch("/mail", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((r) => r.json())
        .then((response) => {
          document.querySelector("#contact-form-button").innerHTML =
            response.result;
        })
        .then(() => {
          setTimeout(() => {
            document.querySelector("#contact-form-button").innerHTML = "";
          }, "5000");
        });
    }
  })();