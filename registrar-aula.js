
// Capturando o formulário
const formulario = document.getElementById("form-aula");

// Quando o professor enviar o formulário
formulario.addEventListener("submit", function(event) {

    // Impede a página de recarregar
    event.preventDefault();

    // Capturando os valores dos campos
    const disciplina = document.getElementById("disciplina").value.trim();
    const turma = document.getElementById("turma").value.trim();
    const data = document.getElementById("data").value;
    const conteudo = document.getElementById("conteudo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    if (!disciplina || !turma || !data || !conteudo || !descricao) {
        alert("Preencha os campos obrigatórios corretamente!");
        return;
    }

    // Criando um objeto com os dados da aula
    const aula = {
        disciplina: disciplina,
        turma: turma,
        data: data,
        conteudo: conteudo,
        descricao: descricao,
        observacoes: observacoes
    };

    // Buscando as aulas já salvas
    let aulas = JSON.parse(localStorage.getItem("aulas")) || [];

    // Adicionando a nova aula
    aulas.push(aula);

    // Salvando as aulas no navegador
    localStorage.setItem("aulas", JSON.stringify(aulas));

    // Avisando que deu certo
    alert("Aula registrada com sucesso!");

    // Limpando o formulário
    formulario.reset();

});
