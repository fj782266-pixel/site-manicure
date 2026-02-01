// ====== FIREBASE ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ COLOQUE SUAS CHAVES AQUI
const firebaseConfig = {
  apiKey: "AIzaSyCkt4DXVTjBkTIKH36Rl3xV7p3IX_5Bf0w",
  authDomain: "agenda-manicure-d4904.firebaseapp.com",
  projectId: "agenda-manicure-d4904",
  storageBucket: "agenda-manicure-d4904.firebasestorage.app",
  messagingSenderId: "1041100320286",
  appId: "1:1041100320286:web:8c5d938947d2cbacb3c80f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====== PEGAR UID DA MANICURE DA URL ======
const params = new URLSearchParams(window.location.search);
const manicureUID = params.get("manicure");

if (!manicureUID) {
  alert("Link inválido. Manicure não encontrada.");
  throw new Error("UID da manicure não encontrado");
}

// ====== FORMULÁRIO ======
const form = document.getElementById("form-agendamento");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const servico = document.getElementById("servico").value;

  try {
    await addDoc(
      collection(db, "manicures", manicureUID, "agendamentos"),
      {
        nome,
        telefone,
        data,
        hora,
        servico,
        criadoEm: new Date()
      }
    );

    alert("Agendamento realizado com sucesso 💅✨");
    form.reset();

  } catch (error) {
    console.error("Erro ao agendar:", error);
    alert("Erro ao realizar agendamento");
  }
});

