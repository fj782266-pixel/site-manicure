// Carrega os agendamentos salvos
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

function atualizarHorarios() {
    let select = document.getElementById("horario");
    let data = document.getElementById("data").value;

    // Libera todos antes de bloquear novamente
    for (let option of select.options) {
        option.disabled = false;
    }

    // Se não tiver data selecionada, para aqui
    if (!data) return;

    // Verifica horários ocupados nessa data
    let ocupados = agendamentos.filter(a => a.data === data).map(a => a.horario);

    // Desabilita horários ocupados
    for (let option of select.options) {
        if (ocupados.includes(option.value)) {
            option.disabled = true;
        }
    }
}

// Atualiza horários sempre que a data mudar
document.getElementById("data").addEventListener("change", atualizarHorarios);

// Processa o agendamento
document.getElementById("form-agenda").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let data = document.getElementById("data").value;
    let horario = document.getElementById("hora").value;

    // Confere se horário está ocupado
    let ocupado = agendamentos.some(a => a.data === data && a.horario === horario);

    if (ocupado) {
        document.getElementById("mensagem").innerText = "⛔ Este horário já está ocupado!";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    // Salva o agendamento
    agendamentos.push({ nome, data, horario, status: "pendente" });
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    document.getElementById("mensagem").innerText =
        `✨ Agendamento confirmado para ${nome} em ${data} às ${horario}!`;
    document.getElementById("mensagem").style.color = "green";

    atualizarHorarios(); // Atualiza horários ocupados automaticamente
});
