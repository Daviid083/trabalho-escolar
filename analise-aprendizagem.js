// Recupera as aulas que foram registradas na página Registrar aula
const aulas = JSON.parse(localStorage.getItem("aulas")) || [];

// Elementos dos indicadores
const totalAulas = document.getElementById("total-aulas");
const totalDisciplinas = document.getElementById("total-disciplinas");
const totalTurmas = document.getElementById("total-turmas");

// Elementos das listas
const disciplinasLista = document.getElementById("disciplinas-lista");
const turmasLista = document.getElementById("turmas-lista");
const conteudosLista = document.getElementById("conteudos-lista");

// Mensagens exibidas quando não existem dados
const disciplinasVazio = document.getElementById("disciplinas-vazio");
const turmasVazio = document.getElementById("turmas-vazio");
const conteudosVazio = document.getElementById("conteudos-vazio");

// Retira espaços extras e evita considerar campos vazios como categorias
function textoValido(valor) {
    return typeof valor === "string" ? valor.trim() : "";
}

// Conta quantas aulas existem
totalAulas.textContent = aulas.length;

// Organiza a quantidade de aulas por disciplina
const quantidadePorDisciplina = {};

aulas.forEach(function(aula) {
    const disciplina = textoValido(aula.disciplina);

    if (disciplina !== "") {
        quantidadePorDisciplina[disciplina] =
            (quantidadePorDisciplina[disciplina] || 0) + 1;
    }
});

const disciplinas = Object.keys(quantidadePorDisciplina);
totalDisciplinas.textContent = disciplinas.length;

// Organiza as turmas sem repetir nomes
const turmas = [...new Set(
    aulas.map(function(aula) {
        return textoValido(aula.turma);
    }).filter(function(turma) {
        return turma !== "";
    })
)];

totalTurmas.textContent = turmas.length;

// Mostra a quantidade de aulas por disciplina
if (disciplinas.length > 0) {
    disciplinasVazio.style.display = "none";

    const maiorQuantidade = Math.max(
        ...Object.values(quantidadePorDisciplina)
    );

    disciplinas.sort(function(a, b) {
        return quantidadePorDisciplina[b] - quantidadePorDisciplina[a];
    });

    disciplinas.forEach(function(disciplina) {
        const linha = document.createElement("div");
        linha.classList.add("discipline-row");

        const nome = document.createElement("span");
        nome.classList.add("discipline-name");
        nome.textContent = disciplina;

        const trilho = document.createElement("div");
        trilho.classList.add("progress-track");

        const barra = document.createElement("div");
        barra.classList.add("progress-fill");
        barra.style.width =
            (quantidadePorDisciplina[disciplina] / maiorQuantidade * 100) + "%";

        trilho.appendChild(barra);

        const quantidade = document.createElement("span");
        quantidade.classList.add("discipline-count");
        quantidade.textContent = quantidadePorDisciplina[disciplina];

        linha.appendChild(nome);
        linha.appendChild(trilho);
        linha.appendChild(quantidade);

        disciplinasLista.appendChild(linha);
    });
}

// Mostra as turmas atendidas
if (turmas.length > 0) {
    turmasVazio.style.display = "none";

    turmas.sort().forEach(function(turma) {
        const etiqueta = document.createElement("span");
        etiqueta.classList.add("class-tag");
        etiqueta.textContent = turma;

        turmasLista.appendChild(etiqueta);
    });
}

// Mostra os conteúdos mais recentes primeiro
const aulasComConteudo = aulas.filter(function(aula) {
    return textoValido(aula.conteudo) !== "";
}).slice().reverse();

if (aulasComConteudo.length > 0) {
    conteudosVazio.style.display = "none";

    aulasComConteudo.forEach(function(aula) {
        const item = document.createElement("article");
        item.classList.add("content-item");

        const titulo = document.createElement("h3");
        titulo.textContent = textoValido(aula.conteudo);

        const descricao = document.createElement("p");
        descricao.textContent = textoValido(aula.descricao) ||
            "Nenhuma descrição informada.";

        const meta = document.createElement("p");
        meta.classList.add("content-meta");

        let dataFormatada = "Data não informada";

        if (textoValido(aula.data)) {
            const partes = aula.data.split("-");
            if (partes.length === 3) {
                dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];
            }
        }

        meta.textContent =
            (textoValido(aula.disciplina) || "Disciplina não informada") +
            " • " +
            (textoValido(aula.turma) || "Turma não informada") +
            " • " +
            dataFormatada;

        item.appendChild(titulo);
        item.appendChild(descricao);
        item.appendChild(meta);

        conteudosLista.appendChild(item);
    });
}
