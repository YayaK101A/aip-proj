let depots = {
    "Groupe 1": [],
    "Groupe 2": [],
    "Groupe 3": []
};

function showGroup(groupe) {
    document.getElementById('home').style.display = 'none';
    document.getElementById('groupes').style.display = 'block';
    document.getElementById('groupe-title').innerText = groupe;
    document.getElementById('groupe').value = groupe;
    afficherStatistiques(groupe);
}

function changeGroup() {
    const groupe = document.getElementById('groupe').value;
    document.getElementById('groupe-title').innerText = groupe;
    afficherStatistiques(groupe);
}

function ajouterDepot() {
    const groupe = document.getElementById('groupe').value;
    const nomClient = document.getElementById('nomClient').value;
    const telephone = document.getElementById('telephone').value;
    const quartier = document.getElementById('quartier').value;
    const observation = document.getElementById('observation').value;
    const date = new Date().toLocaleString();

    if (!nomClient || !telephone || !quartier) {
        alert('Les champs Nom, Téléphone et Quartier sont obligatoires.');
        return;
    }

    const nouveauDepot = {
        nomClient,
        telephone,
        date,
        quartier,
        observation
    };

    depots[groupe].push(nouveauDepot);
    afficherStatistiques(groupe);
    alert('Dépôt ajouté avec succès.');
}

function afficherStatistiques(groupe) {
    const totalDepots = depots[groupe].length;
    const depotsParQuartier = depots[groupe].reduce((acc, depot) => {
        acc[depot.quartier] = (acc[depot.quartier] || 0) + 1;
        return acc;
    }, {});

    document.getElementById('totalDepots').innerText = `Total des dépôts enregistrés : ${totalDepots}`;

    const ctx = document.getElementById('chartQuartier').getContext('2d');
    const labels = Object.keys(depotsParQuartier);
    const data = Object.values(depotsParQuartier);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Dépôts par quartier (${groupe})`,
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function afficherDepots(groupe) {
    const depotsGroupe = depots[groupe];
    let message = `Dépôts pour ${groupe} :\n\n`;
    depotsGroupe.forEach((depot, index) => {
        message += `Dépôt ${index + 1}:\n`;
        message += `Nom du client : ${depot.nomClient}\n`;
        message += `Numéro de téléphone : ${depot.telephone}\n`;
        message += `Date : ${depot.date}\n`;
        message += `Quartier : ${depot.quartier}\n`;
        message += `Observation : ${depot.observation}\n\n`;
    });
    alert(message);
}

// Fonction pour afficher le groupe sélectionné dans l'URL
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const groupe = urlParams.get('groupe');
    if (groupe) {
        showGroup(groupe);
    }
}
