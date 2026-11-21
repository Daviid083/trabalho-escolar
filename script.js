const formLogin = document.getElementById("formLogin");
const campoIdentificacao = document.getElementById("usuario");
const lembrarUsuario = document.getElementById("lembrar");

// Preenche o usuário/email salvo anteriormente, se houver.
const identificacaoSalva = localStorage.getItem("identificacaoLembrada");
if (identificacaoSalva) {
    campoIdentificacao.value = identificacaoSalva;
    lembrarUsuario.checked = true;
}

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const identificacao = document.getElementById("usuario").value.trim().toLowerCase();
    const senha = document.getElementById("senha").value;

    if (identificacao === "" || senha === "") {
        alert("Preencha o usuário/email e a senha!");
        return;
    }

    // Recupera os usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura uma conta que corresponda ao usuário ou email e à senha
    const usuarioEncontrado = usuarios.find(function(conta) {
        return (
            (conta.usuario.toLowerCase() === identificacao ||
             conta.email === identificacao) &&
            conta.senha === senha
        );
    });

    if (usuarioEncontrado) {
        // Lembra somente o usuário/email, nunca a senha.
        if (lembrarUsuario.checked) {
            localStorage.setItem("identificacaoLembrada", identificacao);
        } else {
            localStorage.removeItem("identificacaoLembrada");
        }

        // Guarda apenas os dados básicos da sessão atual
        const sessao = {
            usuario: usuarioEncontrado.usuario,
            email: usuarioEncontrado.email
        };

        sessionStorage.setItem("usuarioLogado", JSON.stringify(sessao));

        alert("Login realizado com sucesso!");
        window.location.href = "dashboard.html";
    } else {
        alert("Usuário/email ou senha incorretos!");
    }
});

// O link de recuperação ainda não possui uma funcionalidade implementada
document.getElementById("link-esqueci").addEventListener("click", function(event) {
    event.preventDefault();
    alert("A recuperação de senha ainda não está disponível.");
});
