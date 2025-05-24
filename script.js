<script>
document.addEventListener("DOMContentLoaded", function () {
  let current = 0;
  const questions = document.querySelectorAll(".question");
  const total = questions.length;
  const form = document.getElementById("rpgForm");
  const mensagemFinal = document.getElementById("mensagemFinal");

  function validarCampos(pergunta) {
    const campos = pergunta.querySelectorAll("input, textarea, select");
    for (const campo of campos) {
      if (!campo.checkValidity()) {
        campo.reportValidity();
        return false;
      }
    }
    return true;
  }

  function nextQuestion() {
    if (!validarCampos(questions[current])) return;

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarCampos(questions[current])) return;

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
