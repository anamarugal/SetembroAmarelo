
/* =========================================
   COMBATE.JS
   Cartões interativos de prevenção e apoio
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    function configurarCartoes(seletor) {

        const cartoes = document.querySelectorAll(seletor);

        cartoes.forEach((cartao) => {

            cartao.addEventListener("click", () => {

                const estavaAberto =
                    cartao.getAttribute("aria-expanded") === "true";

                // Fecha todos os cartões da mesma seção
                cartoes.forEach((outro) => {
                    outro.setAttribute("aria-expanded", "false");
                });

                // Abre o cartão selecionado
                cartao.setAttribute(
                    "aria-expanded",
                    String(!estavaAberto)
                );

            });

        });

    }

    configurarCartoes(".card-prevencao");
    configurarCartoes(".card-apoio");

    console.log("Combate.js carregado com sucesso!");

});
