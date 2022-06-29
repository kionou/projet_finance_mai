let mainListDiv = document.getElementById("mainListDiv"),
mediaButton = document.getElementById("mediaButton"),
navbar = document.querySelector('.nav');

mediaButton.onclick = function () {
    mainListDiv.style.transition = "all 0.8s ease-in-out";
    mainListDiv.classList.toggle("show_list");
    mediaButton.classList.toggle("active");
};

let solde = document.querySelector('.solde')
reduction = document.querySelector('.reduction')
frais     = document.querySelector('.frais')


solde.addEventListener('input',(e)=>{
    let sol= Math.round((e.target.value/100))
    frais.value = sol
    reduction.value= solde.value - sol;

})


let date = document.querySelectorAll('#input');
date.forEach(element => {
   convertirDate(element.value)    
});
let DateInput = document.querySelector('#detailDate')
let Datedetail = document.querySelector('.detailDate');
Datedetail.innerHTML =  convertirDate(DateInput.value) 
console.log( DateInput.value );

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


