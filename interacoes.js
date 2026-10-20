/* 1. BOTÃO PARA AUMENTAR E REDUZIR O TEXTO */
const botaoFonte = document.querySelector("#botao-fonte");

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


/* 2. VALIDAÇÃO DO FORMULÁRIO DE CONTATO */
const formContato = document.querySelector("#form-contato");

if (formContato) {
    formContato.addEventListener("submit", function (evento) {
        // Impede o recarregamento da página.
        evento.preventDefault();

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const mensagem = document.querySelector("#mensagem");
        const resultado =
            document.querySelector("#resultado-contato");

        // Limpa a mensagem anterior.
        resultado.textContent = "";

        // Verifica se os campos foram preenchidos.
        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            mensagem.value.trim() === ""
        ) {
            resultado.textContent =
                "Preencha todos os campos antes de continuar.";

            if (nome.value.trim() === "") {
                nome.focus();
            } else if (email.value.trim() === "") {
                email.focus();
            } else {
                mensagem.focus();
            }

            return;
        }

        // Confere o formato básico do e-mail.
        if (!email.validity.valid) {
            resultado.textContent =
                "Digite um e-mail de teste válido.";

            email.focus();
            return;
        }

        // Evita aceitar mensagens muito curtas.
        if (mensagem.value.trim().length < 10) {
            resultado.textContent =
                "Escreva uma mensagem com pelo menos 10 caracteres.";

            mensagem.focus();
            return;
        }

        // Não envia nem armazena os dados.
        resultado.textContent =
            "Mensagem de teste conferida com sucesso! " +
            "Nenhum dado foi enviado ou armazenado.";

        // Limpa os campos após a validação.
        formContato.reset();
    });
}