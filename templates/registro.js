document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let nombrePokemon = document.getElementById("nombre").value.toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon/" + nombrePokemon)
        .then(res => res.json())
        .then(data => {
            let tabla = document.querySelector("#tablaRegistros tbody");
            let fila = `<tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.abilities.map(a => a.ability.name).join(", ")}</td>
                <td>${data.stats[0].base_stat}</td>
                <td></td>
            </tr>`;
            tabla.innerHTML += fila;

            
        let habilidades = data.abilities.map(a => {
            return `${a.ability.name} (${a.is_hidden ? "Oculta" : "Visible"})`;
        }).join(", ");
        
        let tipo = data.types.map(t => {
            return `${t.type.name}`;
        }).join(", ");
        
        // agregamos el ultimo pokemon consultado a la seccion lastPokemon
        let lastPokemonSection = document.getElementById("lastPokemon");
        lastPokemonSection.innerHTML = `<h1>Ultimo pokemon que consultaste:</h1>
            <p>Has consultado a <strong>${data.name}</strong>, cuyo número en la Pokédex es <strong>${data.id}</strong>.</p>
            <p>Este Pokémon es de tipo(s): <strong>${tipo}</strong>, pesa <strong>${data.weight / 10} kg</strong>, y tiene una estadística base de <strong>${data.stats[0].base_stat}</strong>.</p>
            <p>Las habilidades de este Pokémon son: <strong>${habilidades}</strong>.</p>
            <p>Su especie es <strong>${data.species.name}</a></strong>.</p>
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="Imagen de ${data.name}">
            <p>Escucha su grito:</p>
            <audio controls>
                <source src="${data.cries.latest}" type="audio/ogg">
                Tu navegador no soporta el elemento de audio.
            </audio>`;
    })
        .catch(() => alert("No se encontró el Pokémon"));

        

});
