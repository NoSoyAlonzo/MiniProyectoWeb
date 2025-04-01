document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let nombrePokemon = document.getElementById("nombre").value.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon)
        .then(res => res.json())
        .then(data => {
            let tabla = document.querySelector("#tablaRegistros tbody");
            tabla.innerHTML = "";
            
            let fila = `<tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.abilities.map(a => a.ability.name).join(", ")}</td>
                <td>${data.stats[0].base_stat}</td>
                <td></td>
            </tr>`;
            
            tabla.innerHTML += fila;
        })
        .catch(() => alert("No se encontró el Pokémon"));
});
