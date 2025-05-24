let current = 0;
const questions = document.querySelectorAll(".question");
const total = questions.length;
const form = document.getElementById("rpgForm");
const mensagemFinal = document.getElementById("mensagemFinal");

function nextQuestion() {
  const inputAtual = questions[current].querySelector('input, textarea');
  
  // Validação do campo atual
  if (!inputAtual.checkValidity()) {
    inputAtual.reportValidity();
    return;
  }

  // Esconder pergunta atual
  questions[current].classList.remove("active");
  current++;

  // Mostrar próxima pergunta ou finalizar
  if (current < total) {
    questions[current].classList.add("active");
    questions[current].scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.log("Todas as perguntas respondidas.");
    // Aqui pode desabilitar botões ou fazer outras ações se desejar
  }
}

// Associar evento a todos os botões com classe nextBtn
document.querySelectorAll("button.nextBtn").forEach(btn => {
  btn.addEventListener("click", nextQuestion);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputAtual = questions[current].querySelector('input, textarea');

  // Validar última pergunta antes do envio
  if (!inputAtual.checkValidity()) {
    inputAtual.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const nome = formData.get("nome") || "Usuário";

  fetch("https://formspree.io/f/xblovjbb", {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      form.style.display = "none";
      mensagemFinal.style.display = "block";
      mensagemFinal.innerHTML = `Entraremos em contato em breve, <strong>${nome.toUpperCase()}</strong>.`;
      mensagemFinal.scrollIntoView({ behavior: "smooth" });
    } else {
      return response.json().then(data => {
        throw new Error(data.error || "Erro ao enviar formulário.");
      });
    }
  })
  .catch(err => {
    alert("Erro ao enviar. Tente novamente.");
    console.error(err);
  });
});
