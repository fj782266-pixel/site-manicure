let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
// 👉 Corrigir agendamentos antigos sem status
agendamentos = agendamentos.map(a => {
    if (!a.status) {
        a.status = "pendente";
    }
    return a;
});

// 👉 Salva de volta corrigido
localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

function carregarAgendamentos(filtroData = "") {
    const lista = document.getElementById("lista-agendamentos");
    lista.innerHTML = "";

    let filtrados = filtroData
        ? agendamentos.filter(a => a.data === filtroData)
        : agendamentos;

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
        return;
    }

    filtrados.forEach((item, index) => {
        let card = document.createElement("div");
        card.className = "card";

        if (item.status === "finalizado") {
            card.classList.add("finalizado");
        }

        card.innerHTML = `
<p class="status-text">Status: ${item.status ? item.status.toUpperCase() : "PENDENTE"}</p>
            <p><strong>Cliente:</strong> ${item.nome}</p>
            <p><strong>Data:</strong> ${item.data}</p>
            <p><strong>Horário:</strong> ${item.horario}</p>
            
            ${
                item.status === "pendente"
                ? `<button class="btn-finalizar" data-index="${index}">Finalizar Atendimento</button>`
                : ""
            }

            <button class="btn-excluir" data-index="${index}">Excluir</button>
        `;

        lista.appendChild(card);
    });

    // Botão de finalizar
    document.querySelectorAll(".btn-finalizar").forEach(btn => {
        btn.addEventListener("click", function () {
            let idx = this.getAttribute("data-index");

            agendamentos[idx].status = "finalizado";
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

            carregarAgendamentos(filtroData);
        });
    });

    // Botão de excluir
    document.querySelectorAll(".btn-excluir").forEach(btn => {
        btn.addEventListener("click", function () {
            let idx = this.getAttribute("data-index");

            agendamentos.splice(idx, 1);
            localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

            carregarAgendamentos(filtroData);
        });
    });
}

document.getElementById("btnFiltro").addEventListener("click", () => {
    let data = document.getElementById("dataFiltro").value;
    carregarAgendamentos(data);
});

carregarAgendamentos();
let diasBloqueados = JSON.parse(localStorage.getItem("diasBloqueados")) || [];

function bloquearDia() {
    let data = document.getElementById("dataBloqueio").value;

    if (!data) {
        alert("Escolha uma data!");
        return;
    }

    if (!diasBloqueados.includes(data)) {
        diasBloqueados.push(data);
        localStorage.setItem("diasBloqueados", JSON.stringify(diasBloqueados));
    }

    document.getElementById("msgBloqueio").innerText =
        "❌ Dia bloqueado com sucesso!";
}

function desbloquearDia() {
    let data = document.getElementById("dataBloqueio").value;

    diasBloqueados = diasBloqueados.filter(d => d !== data);
    localStorage.setItem("diasBloqueados", JSON.stringify(diasBloqueados));

    document.getElementById("msgBloqueio").innerText =
        "✅ Dia desbloqueado!";
}
