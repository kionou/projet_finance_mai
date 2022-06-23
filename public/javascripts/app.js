var mainListDiv = document.getElementById("mainListDiv"),
    mediaButton = document.getElementById("mediaButton");

mediaButton.onclick = function () {
    
    "use strict";
    
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
    
};

let solde = document.querySelector('.solde')
reduction = document.querySelector('.reduction')
frais     = document.querySelector('.frais')


solde.addEventListener('input',(e)=>{
    console.log("dfh",solde.value);
    let sol= e.target.value/100
    frais.value = sol
   reduction.value= solde.value - sol;
})


function logout(){
    location.href = "/logout"
}


