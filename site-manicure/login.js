const usuarios = [
    { usuario: "manicure", senha: "1234" },
    { usuario: "felipe admin", senha: "felipegk@18" }
];

function login() {
    let usuarioDigitado = document.getElementById("usuario").value;
    let senhaDigitada = document.getElementById("senha").value;

    // procura o usuário correto
    let usuarioEncontrado = usuarios.find(u =>
        u.usuario === usuarioDigitado && u.senha === senhaDigitada
    );

    if (usuarioEncontrado) {
        // salva quem entrou
        localStorage.setItem("usuarioLogado", usuarioEncontrado.usuario);

        // envia para o painel
        window.location.href = "painel.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}
