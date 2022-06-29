let mainListDiv = document.getElementById("mainListDiv"),
mediaButton = document.getElementById("mediaButton"),
navbar = document.querySelector('.nav');

mediaButton.onclick = function () {
    "use strict";
    mainListDiv.style.transition = "all 0.8s ease-in-out";
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
};

let solde = document.querySelector('.solde')
reduction = document.querySelector('.reduction')
frais     = document.querySelector('.frais')


solde.addEventListener('input',(e)=>{
    console.log("dfh",solde.value);
    let sol= Math.round((e.target.value/100))
    frais.value = sol
   reduction.value= solde.value - sol;

})


let date = document.querySelectorAll('#input');
date.forEach(element => {
    // console.log('rrrf',element.value);
convertirDate(element.value)    
});

function convertirDate(a) {
 let date = document.querySelectorAll('.date')
 let dateLocale = new Date(a).toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
   });
   console.log('dakrte',dateLocale);
    date.forEach(element => {
    element.innerHTML = dateLocale

    });
}


function logout(){
    location.href = "/logout"
}


