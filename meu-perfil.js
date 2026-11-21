// Elementos da página
const botaoEditar = document.getElementById("botao-editar");
const botaoCancelar = document.getElementById("botao-cancelar");
const formulario = document.getElementById("form-perfil");

// Recupera os dados do usuário que fez login
const sessao = JSON.parse(sessionStorage.getItem("usuarioLogado")) || null;
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Procura a conta cadastrada usando o e-mail da sessão
let usuarioAtual = null;

if (sessao) {
    usuarioAtual = usuarios.find(function(conta) {
        return conta.email === sessao.email;
    });
}

// Se não encontrar uma conta, usa os dados básicos da sessão
if (!usuarioAtual) {
    usuarioAtual = {
        usuario: sessao ? sessao.usuario : "Professor",
        email: sessao ? sessao.email : "",
        nomeCompleto: "",
        disciplina: "",
        escola: ""
    };
}

// Mostra as informações na página
function mostrarInformacoes() {
    const nome = usuarioAtual.nomeCompleto || usuarioAtual.usuario || "Nome do professor";

    document.getElementById("nome-perfil").textContent = nome;
    document.getElementById("nome-cabecalho").textContent = nome;
    document.getElementById("info-nome").textContent = usuarioAtual.nomeCompleto || "Não informado";
    document.getElementById("info-email").textContent = usuarioAtual.email || "Não informado";
    document.getElementById("info-disciplina").textContent = usuarioAtual.disciplina || "Não informada";
    document.getElementById("info-escola").textContent = usuarioAtual.escola || "Não informada";
}

// Abre o formulário preenchido com os dados atuais
botaoEditar.addEventListener("click", function() {
    document.getElementById("nome").value = usuarioAtual.nomeCompleto || usuarioAtual.usuario || "";
    document.getElementById("email").value = usuarioAtual.email || "";
    document.getElementById("disciplina").value = usuarioAtual.disciplina || "";
    document.getElementById("escola").value = usuarioAtual.escola || "";

    formulario.hidden = false;
    botaoEditar.hidden = true;
});

// Salva as alterações
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const disciplina = document.getElementById("disciplina").value.trim();
    const escola = document.getElementById("escola").value.trim();

    if (nome === "" || email === "") {
        alert("Preencha o nome e o e-mail!");
        return;
    }

    // Verifica se o e-mail já pertence a outra conta
    const emailEmUso = usuarios.some(function(conta) {
        return conta.email === email && conta.email !== usuarioAtual.email;
    });

    if (emailEmUso) {
        alert("Esse e-mail já está sendo usado por outra conta!");
        return;
    }

    usuarioAtual.nomeCompleto = nome;
    usuarioAtual.usuario = nome;
    usuarioAtual.email = email;
    usuarioAtual.disciplina = disciplina;
    usuarioAtual.escola = escola;

    // Atualiza os dados da conta cadastrada
    const indice = usuarios.findIndex(function(conta) {
        return conta.email === (sessao ? sessao.email : usuarioAtual.email);
    });

    if (indice !== -1) {
        usuarios[indice] = usuarioAtual;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Atualiza também os dados da sessão
    sessionStorage.setItem("usuarioLogado", JSON.stringify({
        usuario: usuarioAtual.usuario,
        email: usuarioAtual.email
    }));

    mostrarInformacoes();
    formulario.hidden = true;
    botaoEditar.hidden = false;

    alert("Perfil atualizado com sucesso!");
});

// Cancela a edição sem salvar
botaoCancelar.addEventListener("click", function() {
    formulario.hidden = true;
    botaoEditar.hidden = false;
});

// Exibe os dados assim que a página é aberta
mostrarInformacoes();
