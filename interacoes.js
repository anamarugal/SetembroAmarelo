/* =========================================================
   INTERAÇÕES DO SITE | PROJETO SETEMBRO AMARELO
   Acessibilidade, contato, dados e painel de relatos
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. ACESSIBILIDADE: AMPLIAR E REDUZIR O TEXTO
    const botaoFonte = document.querySelector("#botao-fonte");

    if (botaoFonte) {
        botaoFonte.addEventListener("click", () => {

            const ampliada = document.body.classList.toggle("fonte-ampliada");

            botaoFonte.textContent = ampliada
                ? "Reduzir texto"
                : "Ampliar texto";

            botaoFonte.setAttribute(
                "aria-pressed",
                String(ampliada)
            );
        });
    }


    // 2. FORMULÁRIO DE CONTATO - FORMSPREE
    const formContato = document.querySelector("#form-contato");

    if (formContato) {
        formContato.addEventListener("submit", async (evento) => {

            evento.preventDefault();

            const nome = formContato.querySelector("#nome");
            const email = formContato.querySelector("#email");
            const mensagem = formContato.querySelector("#mensagem");

            const resultado = document.querySelector(
                "#resultado-contato"
            );

            if (!nome || !email || !mensagem || !resultado) {
                console.error(
                    "Não foi possível encontrar todos os campos do formulário."
                );
                return;
            }

            resultado.setAttribute("role", "status");
            resultado.setAttribute("aria-live", "polite");


            // Validar campos vazios
            if (
                nome.value.trim() === "" ||
                email.value.trim() === "" ||
                mensagem.value.trim() === ""
            ) {
                resultado.textContent = "Preencha todos os campos.";
                return;
            }


            // Validar e-mail
            if (!email.validity.valid) {

                resultado.textContent =
                    "Digite um endereço de e-mail válido.";

                email.focus();
                return;
            }


            // Validar tamanho da mensagem
            if (mensagem.value.trim().length < 10) {

                resultado.textContent =
                    "A mensagem deve ter pelo menos 10 caracteres.";

                mensagem.focus();
                return;
            }


            // Preparar os dados para envio
            const dados = new FormData();

            dados.append("nome", nome.value.trim());
            dados.append("email", email.value.trim());
            dados.append("mensagem", mensagem.value.trim());

            dados.append(
                "_subject",
                "Nova mensagem - Projeto Setembro Amarelo"
            );


            // Evitar vários envios ao mesmo tempo
            const botaoEnviar = formContato.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (botaoEnviar) {
                botaoEnviar.disabled = true;
                botaoEnviar.setAttribute("aria-busy", "true");
            }

            resultado.textContent = "Enviando sua mensagem...";


            try {

                const resposta = await fetch(
                    "https://formspree.io/f/mbggqrqw",
                    {
                        method: "POST",
                        body: dados,
                        headers: {
                            Accept: "application/json"
                        }
                    }
                );


                if (resposta.ok) {

                    resultado.textContent =
                        "Mensagem enviada com sucesso! Obrigado pelo contato.";

                    formContato.reset();

                } else {

                    resultado.textContent =
                        "Não foi possível enviar sua mensagem. Tente novamente.";

                    console.error(
                        "Erro ao enviar formulário:",
                        resposta.status
                    );
                }

            } catch (erro) {

                resultado.textContent =
                    "Erro de conexão. Verifique sua internet e tente novamente.";

                console.error("Erro no envio:", erro);

            } finally {

                if (botaoEnviar) {
                    botaoEnviar.disabled = false;
                    botaoEnviar.removeAttribute("aria-busy");
                }
            }
        });
    }


      
    // 3. CARREGAR E CONTROLAR O PAINEL DE DADOS

    const localDados = document.querySelector("#local-dados");
    const abrir = document.querySelector("#abrir-dados");

    let painelDados = null;
    let carregamentoDados = null;

    async function carregarPainelDados() {

        if (painelDados) {
            return;
        }

        if (!carregamentoDados) {

            carregamentoDados = fetch("dados.html")
                .then((resposta) => {

                    if (!resposta.ok) {
                        throw new Error("Falha ao carregar dados.html");
                    }

                    return resposta.text();
                })
                .then((html) => {

                    localDados.innerHTML = html;

                    painelDados = localDados.querySelector("#painel-dados");

                    const fechar = localDados.querySelector("#fechar-dados");

                    if (!painelDados || !fechar) {
                        throw new Error("Elementos do painel não encontrados.");
                    }

                    painelDados.hidden = true;

                    fechar.addEventListener("click", fecharPainelDados);

                })
                .catch((erro) => {

                    carregamentoDados = null;

                    console.error("Erro ao carregar os dados:", erro);

                    localDados.textContent =
                        "Não foi possível carregar os dados agora.";

                    throw erro;
                });
        }

        await carregamentoDados;
    }

    function fecharPainelDados() {

        if (!painelDados) return;

        painelDados.hidden = true;

        document.body.classList.remove("dados-abertos");

        abrir.setAttribute("aria-expanded", "false");

        abrir.focus();
    }

    if (abrir && localDados) {

        abrir.addEventListener("click", async () => {

            try {

                await carregarPainelDados();

                painelDados.hidden = false;

                document.body.classList.add("dados-abertos");

                abrir.setAttribute("aria-expanded", "true");

                const fechar = localDados.querySelector("#fechar-dados");

                fechar.focus();

            } catch (erro) {

                console.error("Não foi possível abrir o painel:", erro);

            }
        });
    }

    // 5. FECHAR PAINÉIS COM A TECLA ESC

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape" && painelDados && !painelDados.hidden) {
            fecharPainelDados();
        }

    });

});
