const komorki = document.querySelectorAll(".komorka")
const btnNew = document.querySelector(".btn_new-game")
let aktualnyGracz = "O"
let plansza = ["", "", "", "", "", "", "", "", ""]
let koniecGry = false
const kombinacje = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
]
function sprawdzWygrana() {
    for(let i = 0; i < kombinacje.length; i++) {
        const [a, b, c] = kombinacje[i]
        
        if(plansza[a] !== "" && plansza[a] === plansza[b] && plansza[a] === plansza[c]) {
            alert(plansza[a] + " wygrywa!")
            koniecGry = true 
            return true
        }
    }
    return false
}
komorki.forEach(function(komorka,index) {
    komorka.addEventListener("click", function() {
        if(koniecGry) return

        if(komorka.classList.contains("krzyzyk") || komorka.querySelector("svg")){
            return
        }
     
        if(aktualnyGracz === "X"){
          komorka.classList.add("krzyzyk")
      }else {
         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
         circle.setAttribute("cx", "50")
         circle.setAttribute("cy", "50")
         circle.setAttribute("r", "40")
         svg.setAttribute("viewBox", "0 0 100 100")
         svg.appendChild(circle)
         komorka.appendChild(svg)
      }
     plansza[index] = aktualnyGracz
    sprawdzWygrana()

      if(aktualnyGracz === "X") {
      aktualnyGracz = "O"
     } else {
      aktualnyGracz = "X"
    }
    
    
})

})

btnNew.addEventListener("click", function() {
    koniecGry = false
    aktualnyGracz = "O"
    plansza = ["", "", "", "", "", "", "", "", ""]
    
    komorki.forEach(function(komorka, index) {
        setTimeout(function() {
            komorka.classList.remove("krzyzyk")
            komorka.innerHTML = ""
        }, index * 100)
    })
  
})






