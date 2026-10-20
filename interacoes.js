const botaoFonte = document.querySelector("#botao-fonte");

// Botão para ampliar e reduzir o texto
if (botaoFonte) {
    botaoFonte.addEventListener("click", function () {
        const ampliada =
            document.body.classList.toggle("fonte-ampliada");

        botaoFonte.textContent = ampliada
            ? "Reduzir texto"
            : "Ampliar texto";

        botaoFonte.setAttribute(
            "aria-pressed",
            String(ampliada)
        );
    });
}

// Formulário de contato
const formContato = document.querySelector("#form-contato");

if (formContato) {
    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const mensagem = document.querySelector("#mensagem");
        const resultado =
            document.querySelector("#resultado-contato");

        if (!resultado) {
            console.error("Elemento de resultado não encontrado.");
            return;
        }

        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            mensagem.value.trim() === ""
        ) {
            resultado.textContent = "Preencha todos os campos.";
            return;
        }

        if (!email.validity.valid) {
            resultado.textContent =
                "Digite um endereço de e-mail válido.";
            email.focus();
            return;
        }

        if (mensagem.value.trim().length < 10) {
            resultado.textContent =
                "A mensagem deve ter pelo menos 10 caracteres.";
            mensagem.focus();
            return;
        }

        resultado.textContent =
            "Mensagem de teste validada! Nenhum dado foi enviado.";

        formContato.reset();
    });
}

console.log("JavaScript carregado com sucesso!");

// DADOS.HTML:
const abrirDados = document.querySelector("#abrir-dados");
const fecharDados = document.querySelector("#fechar-dados");
const painelDados = document.querySelector("#painel-dados");

if (abrirDados && fecharDados && painelDados) {
    abrirDados.addEventListener("click", function () {
        painelDados.hidden = false;
        abrirDados.setAttribute("aria-expanded", "true");
        fecharDados.focus();
    });

    fecharDados.addEventListener("click", function () {
        painelDados.hidden = true;
        abrirDados.setAttribute("aria-expanded", "false");
        abrirDados.focus();
    });
}
