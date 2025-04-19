async function loadClubInfo() {
  const clubTag = '#2RPY9PR9Y'; // Vervang dit met je clubtag
  const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdmNGM0OTJmLTc5YmEtNGQ4Ni1iNjAwLTY3ZWI0ZGUyYjQ1YyIsImlhdCI6MTc0MzE3NTUzNSwic3ViIjoiZGV2ZWxvcGVyLzZmZDJmNzBhLTFkNGUtNmZmOC1kNjI5LWI3OGE3YTBkNDYxYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzcuMTY5Ljk0LjEzNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UORHkPcursTCrJwYSTbT-DQE0bzIBtJJuZWKQBZP-zOzijVUrlH4AdgBNbXKMnGcBTPtjReHdiMkU1Z7mJgmNw'; // Vul hier je eigen API-sleutel in

  try {
    const response = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });

    if (!response.ok) {
      throw new Error('Fout bij het ophalen van clubgegevens');
    }

    const clubData = await response.json();
    // Toon de clubnaam en het aantal leden
    document.getElementById('club-name').innerText = clubData.name;
    document.getElementById('club-level').innerText = clubData.level;
    document.getElementById('club-members').innerText = clubData.members.length;

    // Haal spelersinformatie op
    loadPlayersTrophies(clubData.members);
  } catch (error) {
    console.error('Error:', error);
    alert('Er is een fout opgetreden bij het ophalen van de clubinformatie');
  }
}

async function loadPlayersTrophies(members) {
  const apiKey = 'YOUR_API_KEY';  // Vul hier je eigen API-sleutel in

  // Leden weergeven
  const membersContainer = document.getElementById('ranking-container');
  membersContainer.innerHTML = '';

  for (let member of members) {
    try {
      const playerResponse = await fetch(`https://api.brawlstars.com/v1/players/${member.tag}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        }
      });

      if (!playerResponse.ok) {
        throw new Error(`Fout bij het ophalen van speler ${member.name}`);
      }

      const playerData = await playerResponse.json();
      const playerTrophies = playerData.trophies;

      // Voeg de speler en zijn trophies toe aan de HTML
      const playerDiv = document.createElement('div');
      playerDiv.classList.add('player');
      playerDiv.innerHTML = `
        <h3>${member.name}</h3>
        <p>Trophies: ${playerTrophies}</p>
      `;
      membersContainer.appendChild(playerDiv);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Voeg functionaliteit toe om ranglijst per periode (dag, week, maand) te tonen
function loadRanking(period) {
  console.log(`Laad ranglijst voor de ${period}`);
  // Hier kun je logica toevoegen voor dagelijkse, wekelijkse of maandelijkse ranglijsten
}
