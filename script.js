<script>
document.addEventListener("DOMContentLoaded", function () {
  let current = 0;
  const questions = document.querySelectorAll(".question");
  const total = questions.length;
  const form = document.getElementById("rpgForm");
  const mensagemFinal = document.getElementById("mensagemFinal");

  function nextQuestion() {
    const inputAtual = questions[current].querySelector('input, textarea');
    if (!inputAtual.checkValidity()) {
      inputAtual.reportValidity();
      return;
    }

    questions[current].classList.remove("active");
    current++;

    if (current < total) {
      questions[current].classList.add("active");

      // Scroll suave para a pergunta
      setTimeout(() => {
        questions[current].scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }

  document.querySelectorAll("button.nextBtn").forEach(btn => {
    btn.addEventListener("click", nextQuestion);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputAtual = questions[current].querySelector('input, textarea');
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
          mensagemFinal.innerHTML = `Entraremos em contato em breve, <strong>${nome.toUpperCase()}</strong>.`;
          mensagemFinal.classList.add("show");
          mensagemFinal.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          return response.json().then(data => {
            throw new Error(data.error || "Erro ao enviar formulário.");
          });
        }
      })
      .catch((err) => {
        alert("Erro ao enviar. Tente novamente.");
        console.error(err);
      });
  });
});
</script>
