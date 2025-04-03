const apiKey = 'd72392371300434e96c7eaa94979a39c'; // Sua chave de API
const corinthiansId = 81; // Substitua pelo ID correto do Corinthians
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = `${proxyUrl}https://api.football-data.org/v4/teams/${corinthiansId}/matches?status=SCHEDULED&dateFrom=2025-04-02&dateTo=2025-05-02`; // Usando o proxy

// Função para buscar os jogos
fetch(apiUrl, {
  method: 'GET',
  headers: {
    'X-Auth-Token': apiKey
  }
})
.then(response => response.json())
.then(data => {
  console.log(data); // Verifique os dados no console
  if (data.matches && data.matches.length > 0) {
    displayMatches(data.matches); // Exibe os jogos no console
  } else {
    console.log('Nenhum jogo encontrado para o período especificado.');
  }
})
.catch(error => console.log('Erro ao buscar dados:', error));

// Função para exibir os próximos jogos dentro da seção
function displayMatches(matches) {
  const section = document.querySelector('.section3.sections'); // Selecione a seção onde você quer adicionar os jogos
  if (!section) {
    console.log('Seção não encontrada!');
    return;
  }
  section.innerHTML = ''; // Limpar a seção antes de adicionar os novos jogos
  
  matches.forEach(match => {
    if (match.status === 'TIMED') {  // Jogos programados para o futuro
      const homeTeam = match.homeTeam.name;
      const awayTeam = match.awayTeam.name;
      const matchDate = formatDate(match.utcDate);
      const competition = match.competition.name;
      
      // Criação do card de jogo
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');

      // HTML para o card do jogo
      gameCard.innerHTML = `
        <div class="team">
          <img src="escudo-corinthians.png" alt="Corinthians" class="team-logo"> <!-- Substitua pelo URL do escudo real -->
          <span>${homeTeam}</span>
        </div>
        <div class="vs">
          <span>x</span>
        </div>
        <div class="team">
          <img src="escudo-adversario.png" alt="Adversário" class="team-logo"> <!-- Substitua pelo URL do escudo do adversário -->
          <span>${awayTeam}</span>
        </div>
        <div class="game-details">
          <p class="date">Data: ${matchDate}</p>
          <p class="competition">Competição: ${competition}</p>
        </div>
        <button class="buy-tickets-btn">Comprar Ingressos</button>
      `;

      // Adicionar o card ao contêiner
      section.appendChild(gameCard);
    }
  });
}

// Função para formatar a data
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
  return new Date(date).toLocaleString('pt-BR', options);
}
