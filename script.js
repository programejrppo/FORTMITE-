async function loadClubInfo() {
  const clubTag = '#2RPY9PR9Y';  // Vervang dit met je eigen clubtag
  const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg1Y2Q4Y2EwLWRhYTUtNDZmNi1hYjhmLWZjMzZhODk2YzNjOSIsImlhdCI6MTc0NTA4OTg1OSwic3ViIjoiZGV2ZWxvcGVyLzZmZDJmNzBhLTFkNGUtNmZmOC1kNjI5LWI3OGE3YTBkNDYxYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzcuMTY5Ljk0LjEzNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.nM05QGrYr-1oqTG8BIpYLL3GRB7KvRuVZEA4EgLzZWcxUxoBvaWQ6p71qybC0rl6qGfKuqvUn7LWxob1MGNy9Q';  // Vul hier je API-token in

  try {
    // API-aanroep om de clubgegevens op te halen
    const response = await fetch(`https://api.brawlstars.com/v1/clubs/${clubTag}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,  // Voeg je API-token toe in de header
      }
    });

    // Als de response niet OK is, werp een fout
    if (!response.ok) {
      throw new Error(`Fout bij het ophalen van clubgegevens: ${response.statusText}`);
    }

    // Parse de response als JSON
    const clubData = await response.json();

    // Foutopsporing: toon de volledige response in de console
    console.log('Clubdata:', clubData);

    // Controleer of clubgegevens aanwezig zijn
    if (clubData && clubData.name && clubData.level) {
      // Toon de clubnaam, niveau en aantal leden
      document.getElementById('club-name').innerText = clubData.name;
      document.getElementById('club-level').innerText = clubData.level;
      document.getElementById('club-members').innerText = clubData.members.length;
    } else {
      // Als de clubgegevens niet goed zijn, geef een foutmelding weer
      console.error('Clubgegevens zijn niet correct of ontbreken.');
    }

    // Haal de spelersinformatie op
    loadPlayersTrophies(clubData.members);
  } catch (error) {
    // Foutmelding als de API-aanroep mislukt
    console.error('Er is een fout opgetreden:', error);
    alert('Er is een fout opgetreden bij het ophalen van de clubinformatie');
  }
}
