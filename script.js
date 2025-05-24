document.addEventListener("DOMContentLoaded", function () {
  let current = 0;
  const questions = document.querySelectorAll(".question");
  const total = questions.length;
  const form = document.getElementById("rpgForm");
  const mensagemFinal = document.getElementById("mensagemFinal");

  function nextQuestion() {
    const inputAtual = questions[current].querySelector('input, textarea, select');
    if (!inputAtual.checkValidity()) {
      inputAtual.reportValidity();
      return;
    }

    questions[current].classList.remove("active");
    current++;

    if (current < total) {
      questions[current].classList.add("active");
      setTimeout(() => {
        questions[current].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }

  document.querySelectorAll("button.nextBtn").forEach(btn => {
    btn.addEventListener("click", nextQuestion);
  });

  // Quando o formulário for enviado, não bloqueamos o envio.
  form.addEventListener("submit", function () {
    const nomePersonagem = form.querySelector("#nomePersonagem")?.value || "Personagem";

    form.style.display = "none";
    mensagemFinal.textContent = `Te vejo em breve: ${nomePersonagem}`;
    mensagemFinal.classList.add("show");
    mensagemFinal.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
