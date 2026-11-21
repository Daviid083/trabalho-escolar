// CONFIGURAÇÕES DE APARÊNCIA E NOTIFICAÇÕES

const aparencia = document.getElementById("aparencia");
const notificacoesPlataforma = document.getElementById("notificacoes-plataforma");
const lembretesAtividades = document.getElementById("lembretes-atividades");

// Aplica o tema escolhido
function aplicarAparencia(modo) {
    if (modo === "escuro") {
        document.body.classList.add("modo-escuro");
    } else {
        document.body.classList.remove("modo-escuro");
    }
}

// Carrega as configurações salvas quando a página abre
const aparenciaSalva = localStorage.getItem("aparencia") || "claro";
aparencia.value = aparenciaSalva;
aplicarAparencia(aparenciaSalva);

// Salva e aplica a aparência quando o usuário muda a opção
aparencia.addEventListener("change", function () {
    localStorage.setItem("aparencia", aparencia.value);
    aplicarAparencia(aparencia.value);
});

// Recupera as preferências de notificações
const notificacoesSalvas = localStorage.getItem("notificacoesPlataforma");
const lembretesSalvos = localStorage.getItem("lembretesAtividades");

notificacoesPlataforma.checked = notificacoesSalvas === null
    ? true
    : notificacoesSalvas === "true";

lembretesAtividades.checked = lembretesSalvos === null
    ? true
    : lembretesSalvos === "true";

// Salva cada alteração dos interruptores
notificacoesPlataforma.addEventListener("change", function () {
    localStorage.setItem("notificacoesPlataforma", notificacoesPlataforma.checked);
});

lembretesAtividades.addEventListener("change", function () {
    localStorage.setItem("lembretesAtividades", lembretesAtividades.checked);
});
