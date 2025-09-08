document.addEventListener("DOMContentLoaded", () => {
    const notas = document.querySelectorAll(".nota");
    const pesos = document.querySelectorAll(".peso");
    const notaPonderadas = document.querySelectorAll(".nota-ponderada");
    const cursoSelect = document.getElementById("curso");
    const notaDeCorteSpan = document.querySelector(".nota-de-corte span");
    const notaMinimaRedacaoSpan = document.querySelector(".nota-minima-red span");
    const resultadoFinalSpan = document.querySelector(".resultado-final span");
    const mensagemFinal = document.querySelector(".inserir-nota p");
    const botaoCalcular = document.querySelector(".botao-enviar input");

    // Configuração por curso
    const cursos = {
        "medicina": {
            corte: 800,
            redacaoMin: 700,
            pesos: [2, 4, 3, 2, 5] // linguagens, matemática, natureza, humanas, redação
        },
        "administracao": {
            corte: 650,
            redacaoMin: 500,
            pesos: [2, 2, 2, 2, 2]
        },
        "sistemas-informacao": {
            corte: 720,
            redacaoMin: 600,
            pesos: [2, 4, 3, 1, 3]
        },
        "ciencias-biologicas": {
            corte: 630,
            redacaoMin: 500,
            pesos: [2, 2, 3, 2, 2]
        },
        "matematica": {
            corte: 610,
            redacaoMin: 400,
            pesos: [1, 5, 2, 2, 1]
        },
        "nutricao": {
            corte: 680,
            redacaoMin: 550,
            pesos: [2, 2, 3, 2, 3]
        },
        "pedagogia": {
            corte: 590,
            redacaoMin: 450,
            pesos: [3, 1, 1, 4, 3]
        },
        "letras-portugues": {
            corte: 600,
            redacaoMin: 500,
            pesos: [4, 1, 1, 3, 3]
        },
        "ciencias-natureza": {
            corte: 620,
            redacaoMin: 500,
            pesos: [2, 2, 4, 2, 2]
        },
        "historia": {
            corte: 600,
            redacaoMin: 500,
            pesos: [2, 1, 1, 4, 2]
        },
        "enfermagem": {
            corte: 690,
            redacaoMin: 600,
            pesos: [2, 2, 4, 1, 3]
        }
    };

    function atualizarCurso() {
        const curso = cursoSelect.value;
        const dadosCurso = cursos[curso];

        // Atualiza pesos visuais
        dadosCurso.pesos.forEach((peso, i) => {
            pesos[i].textContent = peso;
        });

        // Atualiza nota de corte e redação mínima
        notaDeCorteSpan.textContent = dadosCurso.corte;
        notaMinimaRedacaoSpan.textContent = dadosCurso.redacaoMin;

        // Limpa resultado e mensagens
        resultadoFinalSpan.textContent = "0.00";
        mensagemFinal.textContent = "Insira suas notas para ver seu resultado";
        notaPonderadas.forEach(np => np.textContent = "0.00");
    }

    function calcularMedia() {
        const curso = cursoSelect.value;
        const dadosCurso = cursos[curso];
        const pesosNumericos = dadosCurso.pesos;
        const notaCorte = dadosCurso.corte;
        const redMin = dadosCurso.redacaoMin;

        let somaPonderada = 0;
        let somaPesos = 0;
        let notasValidas = true;

        notas.forEach((input, i) => {
            const nota = parseFloat(input.value);
            const peso = pesosNumericos[i];

            if (isNaN(nota)) {
                notasValidas = false;
                notaPonderadas[i].textContent = "0.00";
                return;
            }

            const ponderada = nota * peso;
            notaPonderadas[i].textContent = ponderada.toFixed(2);
            somaPonderada += ponderada;
            somaPesos += peso;
        });

        if (!notasValidas) {
            mensagemFinal.textContent = "Preencha todas as notas para calcular.";
            resultadoFinalSpan.textContent = "0.00";
            return;
        }

        const media = somaPonderada / somaPesos;
        resultadoFinalSpan.textContent = media.toFixed(2);

        const notaRedacao = parseFloat(notas[4].value); // Redação sempre na posição 4

        if (media >= notaCorte && notaRedacao >= redMin) {
            mensagemFinal.textContent = "✅ Parabéns! Você passou!";
        } else if (notaRedacao < redMin) {
            mensagemFinal.textContent = "❌ Sua nota de redação está abaixo do mínimo.";
        } else {
            mensagemFinal.textContent = "❌ Você não atingiu a nota de corte.";
        }
    }

    cursoSelect.addEventListener("change", atualizarCurso);
    botaoCalcular.addEventListener("click", calcularMedia);

    // Inicializa pesos ao carregar
    atualizarCurso();
});
