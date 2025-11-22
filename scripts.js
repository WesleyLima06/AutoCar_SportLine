let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
  let resposta = await fetch("data.json");
  dados = await resposta.json();
}


function iniciarBusca() {
  const termoBusca = document.getElementById("campo-busca").value.toLowerCase();
  if (!termoBusca.trim()) {
    cardContainer.innerHTML = "";
    return;
  }

  const resultados = dados.filter(carro => 
      carro.nome.toLowerCase().includes(termoBusca)
  );

  if (resultados.length === 0) {
      cardContainer.innerHTML = "<p>Nenhum resultado encontrado ou nome digitado errado.</p>";
  } else {
      renderizarCards(resultados);
  }

}

function renderizarCards(dados) {
  cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
  for (let dado of dados){
    // Cria a estrutura do flip-card
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    flipCardInner.innerHTML = `
      <div class="flip-card-front">
        <img src="${dado.imagem}" alt="Imagem do ${dado.nome}">
      </div>
      <div class="flip-card-back">
        <h2>${dado.nome}</h2>
        <p><strong>Ano de lançamento:</strong> ${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
      </div>
    `;
    
    flipCard.appendChild(flipCardInner);
    cardContainer.appendChild(flipCard);

    // Adiciona o evento de clique para virar o card
    flipCard.addEventListener('click', () => {
      flipCardInner.classList.toggle('is-flipped');
    });
  }
}

// Carrega os dados e exibe todos os cards quando a página é carregada
carregarDados();
