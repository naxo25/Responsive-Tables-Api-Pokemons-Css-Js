const tbody = document.querySelector("tbody"),
      modal = document.querySelector('.modal'),
      spinnerImg = document.querySelector('.spinnerImg')

document.addEventListener("DOMContentLoaded",  async() => {

  await fetch('https://pokeapi.co/api/v2/pokemon/?limit=7')
  .then((response) => response.json())
  .then((data) => data.results.map((item) => {
    fetch(item.url)
    .then((response) => response.json())
    .then((allpokemon) => getPokemon(allpokemon));
  }))

  const getPokemon = (pokemon) => {
    const height = document.createElement("td");
    const name = document.createElement("td");
    const types = document.createElement("td");
    const weight = document.createElement("td");
    const tdImg = document.createElement("td");
    const tdbtn = document.createElement("td");
    const img = document.createElement("img");
    const button = document.createElement("button");

    img.src2 = pokemon.sprites.other.dream_world.front_default;
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.className = 'imgBox'
    img.name = 'img'
    height.appendChild(document.createTextNode(pokemon.height))
    height.className = 'details'
    name.appendChild(document.createTextNode(pokemon.name))
    name.className = 'details'
    types.appendChild(document.createTextNode(pokemon.types[0].type.name))
    types.className = 'details'
    weight.appendChild(document.createTextNode(pokemon.weight))
    weight.className = 'details'
    button.innerText = 'See Pokemón'

    const tr = document.createElement("tr");
    tr.id = pokemon.id
    tr.setAttribute("onclick", "js: clickPokemon("+pokemon.id+")")
    tdImg.appendChild(img);
    tr.appendChild(tdImg)
    tr.appendChild(name)
    tr.appendChild(height)
    tr.appendChild(types)
    tr.appendChild(weight)
    tdbtn.appendChild(button)
    tr.appendChild(tdbtn)
    tbody.appendChild(tr)
  }

  setTimeout(function(){
    document.querySelector('.spinner').style.display = 'none'
    document.querySelector('table').style.visibility = 'visible'
  }, 1000);

});

const pokeModal = (popup) => {
  const img = document.querySelector('.modal .flex .box img')
  const ul = document.querySelectorAll('.modal table td')
  const imgtr = popup.querySelector('td img').src
  const detailstr = popup.querySelectorAll('tbody .details')
  img.src = imgtr
  detailstr.forEach((li,i) => {
    ul[i].innerText = li.innerText
  })
  modal.style.display = 'block'
}

const clickPokemon = (pos) => {
  spinnerImg.style.display = 'block'
  pokeModal(document.getElementById(pos))
  setTimeout(function(){
    spinnerImg.style.display = 'none'
  }, 800);

  // const tr = document.querySelectorAll('tbody tr')
  // tr.forEach(popup => popup.addEventListener('click', () => {
  //   // popup.classList.toggle('active')
  //   pokeModal(popup)
  // }))
}

modal.addEventListener('click', ()=> {
  spinnerImg.style.display = 'none'
  modal.style.display = 'none'
})
