const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
script.onload = () => {
  emailjs.init("zZ0Ngt7VyUhvCPYgr");
};
document.head.appendChild(script);

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
  }
}

document.querySelectorAll("button#nextBtn").forEach(btn => {
  btn.addEventListener("click", nextQuestion);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputAtual = questions[current].querySelector('input, textarea');
  if (!inputAtual.checkValidity()) {
    inputAtual.reportValidity();
    return;
  }

  const nome = document.getElementById("nome").value;

  emailjs.sendForm("zZ0Ngt7VyUhvCPYgr", "template_svsphyx", this)
    .then(() => {
      form.style.display = "none";
      mensagemFinal.style.display = "block";
      mensagemFinal.textContent = `Entraremos em contato em breve. ${nome.toUpperCase()}`;
    })
    .catch((err) => {
      alert("Erro ao enviar. Tente novamente.");
      console.error(err);
    });
});
