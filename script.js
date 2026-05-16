const komorki = document.querySelectorAll(".komorka")
const btnNew = document.querySelector(".btn_new-game")


komorki.forEach(function(komorka) {
    komorka.addEventListener("click", function() {
       komorka.classList.add("krzyzyk")
    })
})



btnNew.addEventListener("click", function() {
    komorki.forEach(function(komorka) {
    komorka.classList.remove("krzyzyk")
})
  
})


