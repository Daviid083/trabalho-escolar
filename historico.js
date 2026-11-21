// Buscando as aulas salvas no navegador
let aulas = JSON.parse(localStorage.getItem("aulas")) || [];

// Localizando os elementos do HTML
const listaAulas = document.getElementById("lista-aulas");
const mensagemVazia = document.querySelector(".empty-history");

// Verificando se existem aulas registradas
if (aulas.length > 0) {

    // Escondendo a mensagem de histórico vazio
    mensagemVazia.style.display = "none";

    // Percorrendo todas as aulas salvas
    aulas.forEach(function(aula, indice) {

        // Criando um card para a aula
        const card = document.createElement("div");
        card.classList.add("aula-card");

        // Criando o título
        const titulo = document.createElement("h3");
        titulo.textContent = aula.disciplina;

        // Criando as informações
        const turma = document.createElement("p");
        turma.textContent = "Turma: " + aula.turma;

        const data = document.createElement("p");
        data.textContent = "Data: " + new Date(aula.data + "T00:00:00").toLocaleDateString("pt-BR");

        const conteudo = document.createElement("p");
        conteudo.textContent = "Conteúdo: " + aula.conteudo;

        const descricao = document.createElement("p");
        descricao.textContent = "Descrição: " + aula.descricao;

        const observacoes = document.createElement("p");
        observacoes.textContent = "Observações: " + (aula.observacoes || "Nenhuma");

        // Adicionando as informações ao card
        card.appendChild(titulo);
        card.appendChild(turma);
        card.appendChild(data);
        card.appendChild(conteudo);
        card.appendChild(descricao);
        card.appendChild(observacoes);

        // Criando o botão de excluir
const botaoExcluir = document.createElement("button");
botaoExcluir.textContent = "Excluir aula";

// Quando clicar no botão
botaoExcluir.addEventListener("click", function() {

// Perguntando se o usuário deseja excluir
const confirmar = confirm("Tem certeza que deseja excluir esta aula?");

if (confirmar) {

    // Removendo a aula da lista
    aulas.splice(indice, 1);

    // Atualizando os dados salvos
    localStorage.setItem("aulas", JSON.stringify(aulas));

    // Atualizando a página
    location.reload();

}
});

    // Adicionando o botão ao card
    card.appendChild(botaoExcluir);

        // Adicionando o card à página
        listaAulas.appendChild(card);

    });

}