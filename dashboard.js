// Dados utilizados no painel inicial.
// Neste momento, as aulas ainda são lidas do armazenamento do navegador.
function buscarLista(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave)) || [];
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}

const aulas = buscarLista("aulas");
const usuarios = buscarLista("usuarios");
const sessao = JSON.parse(sessionStorage.getItem("usuarioLogado")) || null;

// Atualiza os números do painel.
document.getElementById("dashboard-total-aulas").textContent = aulas.length;

const turmas = [...new Set(
    aulas.map(function(aula) {
        return typeof aula.turma === "string" ? aula.turma.trim() : "";
    }).filter(function(turma) {
        return turma !== "";
    })
)];

document.getElementById("dashboard-total-turmas").textContent = turmas.length;

// A página de recomendações possui quatro recomendações fixas.
document.getElementById("dashboard-total-recomendacoes").textContent = "4";

// Mostra o nome do professor que entrou na plataforma.
if (sessao) {
    const conta = usuarios.find(function(usuario) {
        return usuario.email === sessao.email;
    });

    const nome = conta && conta.nomeCompleto
        ? conta.nomeCompleto
        : sessao.usuario;

    document.getElementById("saudacao-professor").textContent = "Olá, " + nome + "!";
    document.querySelector(".profile span").textContent = nome;
}

// Leva o professor para a página de registro de aula.
document.getElementById("botao-registrar-aula").addEventListener("click", function() {
    window.location.href = "registrar-aula.html";
});

// Exibe as três aulas mais recentes.
const atividadesLista = document.getElementById("atividades-recentes");
const atividadesVazio = document.getElementById("atividades-vazio");
const aulasRecentes = aulas.slice().reverse().slice(0, 3);

function formatarData(data) {
    if (!data || typeof data !== "string") {
        return "Data não informada";
    }

    const partes = data.split("-");
    if (partes.length !== 3) {
        return "Data não informada";
    }

    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

if (aulasRecentes.length > 0) {
    atividadesVazio.style.display = "none";

    aulasRecentes.forEach(function(aula) {
        const card = document.createElement("article");
        card.classList.add("recent-card");

        const titulo = document.createElement("h3");
        titulo.textContent = aula.conteudo || aula.disciplina || "Aula registrada";

        const detalhes = document.createElement("p");
        detalhes.textContent =
            (aula.disciplina || "Disciplina não informada") + " • " +
            (aula.turma || "Turma não informada") + " • " +
            formatarData(aula.data);

        card.appendChild(titulo);
        card.appendChild(detalhes);
        atividadesLista.appendChild(card);
    });
}
