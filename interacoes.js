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
const localDados = document.querySelector("#local-dados");

if (localDados) {
    fetch("dados.html")
        .then(resposta => resposta.text())
        .then(html => {
            localDados.innerHTML = html;

            const painel = document.querySelector("#painel-dados");
            const abrir = document.querySelector("#abrir-dados");
            const fechar = document.querySelector("#fechar-dados");

            abrir.addEventListener("click", function () {
                painel.hidden = false;
                abrir.setAttribute("aria-expanded", "true");
                fechar.focus();
            });

            fechar.addEventListener("click", function () {
                painel.hidden = true;
                abrir.setAttribute("aria-expanded", "false");
                abrir.focus();
            });
        })
        .catch(() => {
            console.error("Não foi possível carregar dados.html.");
        });
}


// FORMULARIOFIC.HTML
const abrirRelato = document.querySelector("#abrir-relato");
const fecharRelato = document.querySelector("#fechar-relato");
const painelRelato = document.querySelector("#painel-relato");

if (abrirRelato && fecharRelato && painelRelato) {
    abrirRelato.addEventListener("click", function () {
        painelRelato.hidden = false;
    });

    fecharRelato.addEventListener("click", function () {
        painelRelato.hidden = true;
        abrirRelato.focus();
    });
}