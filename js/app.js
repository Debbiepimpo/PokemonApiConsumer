document.addEventListener("DOMContentLoaded", renderEverything);

function renderEverything(){
  for (let i = 1; i < 151; i++) {
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add('card');
    pokeContainer.setAttribute("id", i)
    pokeContainer.dataset.target = "#myModal";
    pokeContainer.dataset.toggle = "modal";
    pokeContainer.addEventListener("click",fetchPokemon);
    let pokeImage = document.createElement('img');
    pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;

    pokeContainer.append(pokeImage);
    allPokemonContainer.appendChild(pokeContainer);
  }
}

function fetchPokemon (){
  fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
  .then(response => response.json())
  .then(function(pokeData){
    renderPokemon(pokeData)
  })

}

function renderPokemon(pokeData){

  let myModal = document.getElementById('myModal');
  let modalTitle = document.getElementById('modal-title');
  let modalBody = document.getElementById('modal-body');
  let modalClose = document.getElementById('modal-close');
  modalClose.addEventListener("click", function() {myModal.style.display = "none"});
  modalTitle.innerText = pokeData.name
  let modalBodyList = document.createElement("div");
  modalBodyList.classList.add('list');
  modalBody.append(modalBodyList);
  let h4 = document.createElement('h4');
  h4.classList.add("title-list");
  h4.appendChild(document.createTextNode("Abilities:"));
  modalBodyList.append(h4);
  let ul = document.createElement('ul');
  ul.setAttribute("id", "myList");
  modalBodyList.append(ul);
  pokeData.abilities.forEach((eachAbility)=>{
    let li = document.createElement("li");
    li.innerText = eachAbility.ability.name;
    ul.appendChild(li);
  })
  myModal.style.display = "block";
}
