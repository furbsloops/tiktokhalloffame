document.addEventListener('DOMContentLoaded', function() {
    const btnAggiungi = document.getElementById('btnAggiungi');
    const inputCamera = document.getElementById('inputCamera');
    const modaleFormOggetto = document.getElementById('modaleFormOggetto');
    const formOggetto = document.getElementById('formOggetto');
    const nomeOggetto = document.getElementById('nomeOggetto');
    const categoriaOggetto = document.getElementById('categoriaOggetto');
    const paginaCategorie = document.getElementById('categorie');
    const paginaCategoria = document.getElementById('paginaCategoria');
    const tornaAlleCategorie = document.getElementById('tornaAlleCategorie');
    const titoloCategoria = document.getElementById('titoloCategoria');
    const elencoOggetti = document.getElementById('elencoOggetti');

    let immagineCorrente;

    // Dati simulati
    let categorie = {
        'Monete': [],
        'Francobolli': [],
        'Fumetti': []
    };

    // Genera le categorie
    function generaCategorie() {
        paginaCategorie.innerHTML = '';
        Object.keys(categorie).forEach(categoria => {
            const div = document.createElement('div');
            div.textContent = categoria;
            div.className = 'categoria-item';
            div.addEventListener('click', function() {
                visualizzaCategoria(categoria);
            });
            paginaCategorie.appendChild(div);
        });
    }

    // Mostra la pagina della categoria
    function visualizzaCategoria(categoria) {
        titoloCategoria.textContent = categoria;
        elencoOggetti.innerHTML = '';
        categorie[categoria].forEach(oggetto => {
            const div = document.createElement('div');
            div.className = 'oggetto-item';

            const img = document.createElement('img');
            img.src = oggetto.immagine;
            img.alt = `Immagine di ${oggetto.nome}`;
            div.appendChild(img);

            const span = document.createElement('span');
            span.textContent = ` ${oggetto.nome}`;
            div.appendChild(span);

            elencoOggetti.appendChild(div);
        });
        paginaCategorie.style.display = 'none';
        paginaCategoria.style.display = 'block';
    }

    btnAggiungi.addEventListener('click', function() {
        inputCamera.click();
    });

    inputCamera.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            immagineCorrente = URL.createObjectURL(event.target.files[0]);
            // Pulisci i campi precedenti
            nomeOggetto.value = '';
            categoriaOggetto.innerHTML = Object.keys(categorie).map(cat => `<option value="${cat}">${cat}</option>`).join('');
            // Mostra il modale per inserire i dettagli dell'oggetto
            modaleFormOggetto.style.display = 'block';
        }
    });

    formOggetto.addEventListener('submit', function(event) {
        event.preventDefault();
        // Crea un nuovo oggetto con i dettagli inseriti
        const nuovaCategoria = categoriaOggetto.value;
        const nuovoNome = nomeOggetto.value;

        // Aggiungi l'oggetto alla categoria corretta e visualizzalo
        categorie[nuovaCategoria].push({ nome: nuovoNome, immagine: immagineCorrente });
        
        // Nascondi il modale e pulisci i campi
        modaleFormOggetto.style.display = 'none';
        nomeOggetto.value = '';
        categoriaOggetto.value = '';

        // Aggiorna la visualizzazione degli oggetti
        visualizzaCategoria(nuovaCategoria);
    });

    tornaAlleCategorie.addEventListener('click', function() {
        paginaCategoria.style.display = 'none';
        paginaCategorie.style.display = 'block';
    });

    generaCategorie();
});
