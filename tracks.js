// Configuration Supabase
const supabaseUrl = 'https://sxwppdcaahnzhkqdvdpd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4d3BwZGNhYWhuemhrcWR2ZHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.UHtyHqsOPDExggrz5lQmeKAyuOJZhXeVSlASKc6z5sc';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Charger la liste des pays au démarrage
document.addEventListener('DOMContentLoaded', async () => {
    await loadCountries();
    setupForm();
});

// Charger les pays depuis Supabase
async function loadCountries() {
    const countrySelect = document.getElementById('country');
    const { data: countries, error } = await supabase
        .from('countries')
        .select('id, name')
        .order('name', { ascending: true });

    if (error) {
        showMessage('Erreur lors du chargement des pays: ' + error.message, 'error');
        return;
    }

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}

// Configurer le formulaire
function setupForm() {
    const form = document.getElementById('trackForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const country_id = document.getElementById('country').value;
        const audio_url = document.getElementById('audio_url').value;
        const description = document.getElementById('description').value;

        // Validation simple
        if (!title || !artist || !country_id) {
            showMessage('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        // Envoyer les données à Supabase
        const { data, error } = await supabase
            .from('tracks')
            .insert([
                { 
                    title, 
                    artist, 
                    country_id,
                    audio_url: audio_url || null,
                    description: description || null
                }
            ])
            .select();

        if (error) {
            showMessage('Erreur lors de l\'ajout: ' + error.message, 'error');
        } else {
            showMessage('Morceau ajouté avec succès! ID: ' + data[0].id, 'success');
            form.reset();
        }
    });
}

// Afficher un message à l'utilisateur
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.style.backgroundColor = type === 'error' ? '#ffdddd' : '#ddffdd';
    messageDiv.style.color = type === 'error' ? '#ff0000' : '#007700';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
