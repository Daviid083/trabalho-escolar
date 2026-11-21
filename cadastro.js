const formulario = document.getElementById("formcadastro");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value.trim().toLowerCase();

    if (usuario === "" || senha === "" || email === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Recupera os usuários que já foram cadastrados
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o email já está sendo utilizado
    const emailExiste = usuarios.some(function(conta) {
        return conta.email === email;
    });

    if (emailExiste) {
        alert("Este email já está cadastrado!");
        return;
    }

    // Cria o novo usuário
    const novoUsuario = {
        usuario: usuario,
        senha: senha,
        email: email
    };

    // Adiciona o usuário à lista e salva no navegador
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    // Leva o usuário para a página de login
    window.location.href = "index.html";
});
