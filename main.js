const cursos = {
  administracao: {
    pesoLinguagens: 5,
    pesoMat: 5,
    pesoCiencias: 2,
    pesoHumanas: 4,
    pesoRed: 3,
    Corte: 591,
  },

  "ciencias-biologicas": {
    pesoLinguagens: 5,
    pesoMat: 4,
    pesoCiencias: 5,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 550,
  },

  historia: {
    pesoLinguagens: 5,
    pesoMat: 2,
    pesoCiencias: 4,
    pesoHumanas: 5,
    pesoRed: 3,
    Corte: 544.29,
  },
  enfermagem: {
    pesoLinguagens: 5,
    pesoMat: 4,
    pesoCiencias: 5,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 667.38,
  },

  "letras-portugues": {
    pesoLinguagens: 5,
    pesoMat: 2,
    pesoCiencias: 4,
    pesoHumanas: 5,
    pesoRed: 3,
    Corte: 569.27,
  },

  matematica: {
    pesoLinguagens: 5,
    pesoMat: 5,
    pesoCiencias: 4,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 522.25,
  },

  medicina: {
    pesoLinguagens: 5,
    pesoMat: 4,
    pesoCiencias: 5,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 788.93,
  },

  nutricao: {
    pesoLinguagens: 5,
    pesoMat: 4,
    pesoCiencias: 5,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 648.27,
  },

  pedagogia: {
    pesoLinguagens: 5,
    pesoMat: 4,
    pesoCiencias: 5,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 571.53,
  },

  "sistemas-informacao": {
    pesoLinguagens: 5,
    pesoMat: 5,
    pesoCiencias: 4,
    pesoHumanas: 2,
    pesoRed: 3,
    Corte: 611.22,
  },
};

const minRedacao = 450;
const selecao = document.getElementById("opcoes");
let extrairNotas = document.querySelectorAll("input.nota");
let cursoSelecionado;
let somaPesos;
let notas = {};
let resultadoRedacao,
  resultadoMatematica,
  resultadoLinguagens,
  resultadoCiencias,
  resultadoHumanas;
let ciencias = 0;
let humanas = 0;
let matematica = 0;
let redacao = 0;
let linguagens = 0;
let notaGeral;

selecao.addEventListener("change", () => {
  //O evento "change" acontece sempre que o valor de um campo muda (e você sai dele ou troca a seleção).
  let nomecurso = selecao.value; //pega o value do option
  cursoSelecionado = cursos[nomecurso]; //busca no objeto selecionado
  calcularPeso();
  console.log(cursoSelecionado);
});

function calcularPeso() {

  const curso = cursoSelecionado;
  const exibirCorte = curso.Corte
  
  document.querySelector(".peso-ling").innerHTML = curso.pesoLinguagens;
  document.querySelector(".peso-mat").innerHTML = curso.pesoMat;
  document.querySelector(".peso-cie").innerHTML = curso.pesoCiencias;
  document.querySelector(".peso-hum").innerHTML = curso.pesoHumanas;
  document.querySelector(".peso-red").innerHTML = curso.pesoRed;
  document.querySelector(".nota-de-corte-span").innerHTML = exibirCorte
  somaPesos =
    cursoSelecionado.pesoCiencias +
    cursoSelecionado.pesoHumanas +
    cursoSelecionado.pesoLinguagens +
    cursoSelecionado.pesoMat +
    cursoSelecionado.pesoRed;
    
}

extrairNotas.forEach((input) => {
  input.addEventListener("change", (event) => {
    notas[input.id] = parseFloat(event.target.value) || 0;

    ciencias = notas.notaCiencias;
    humanas = notas.notaHumanas;
    matematica = notas.notaMatematica;
    redacao = notas.notaRedacao;
    linguagens = notas.notaLinguagens;

    if (
      ciencias !== undefined &&
      ciencias !== 0 &&
      humanas !== undefined &&
      humanas !== 0 &&
      matematica !== undefined &&
      matematica !== 0 &&
      redacao !== undefined &&
      redacao !== 0 &&
      linguagens !== undefined &&
      linguagens !== 0
    ) {
      exibirMediaPonderadaIndividual();
    }

    

  });
});

/*input.addEventListener("change", (event) => {
    console.log(event); // mostra o objeto do evento no console
    console.log(event.target); // mostra o input que disparou o evento
    console.log(event.target.value); // mostra o valor atual do input
});
*/

function exibirMediaPonderadaIndividual() {
    resultadoRedacao = notas.notaRedacao * cursoSelecionado.pesoRed;
    resultadoMatematica = notas.notaMatematica * cursoSelecionado.pesoMat;
    resultadoLinguagens = notas.notaLinguagens * cursoSelecionado.pesoLinguagens;
    resultadoCiencias = notas.notaCiencias * cursoSelecionado.pesoCiencias;
    resultadoHumanas = notas.notaHumanas * cursoSelecionado.pesoHumanas;
    console.log(resultadoLinguagens, resultadoMatematica, resultadoCiencias, resultadoHumanas, resultadoRedacao);

    document.querySelector(".rs-ling").innerHTML = resultadoLinguagens
    document.querySelector(".rs-mat").innerHTML = resultadoMatematica
    document.querySelector(".rs-cie").innerHTML = resultadoCiencias
    document.querySelector(".rs-hum").innerHTML = resultadoHumanas
    document.querySelector(".rs-red").innerHTML = resultadoRedacao
    
}

function calcularNotaGeral() {
    notaGeral = (resultadoLinguagens + resultadoMatematica + resultadoCiencias + resultadoHumanas + resultadoRedacao)/somaPesos;
    console.log(notaGeral.toFixed(2));

    document.querySelector(".resultado-final-span").innerHTML = notaGeral.toFixed(2);

}

document.getElementById("bnt-calcular").addEventListener("click", processarCalculo);

function processarCalculo() {
    if(cursoSelecionado == undefined) {
        alert(`Por favor, selecione um curso`);
        return;
    }

        const todasPreenchidas = 
        notas.notaLinguagens !== undefined && notas.notaLinguagens !== 0 &&
        notas.notaMatematica !== undefined && notas.notaMatematica !== 0 &&
        notas.notaCiencias !== undefined && notas.notaCiencias !== 0 &&
        notas.notaHumanas !== undefined && notas.notaHumanas !== 0 &&
        notas.notaRedacao !== undefined && notas.notaRedacao !== 0;

        if(!todasPreenchidas) {
            alert("Por favor, preencha todas as notas ");
            return;
        }

        if(notas.notaRedacao < minRedacao) {
          document.querySelector(".div-reprov").style.display = "flex";
          document.querySelector(".div-aprov").style.display = "none";
          alert("Você não possui nota mínima suficiente em redação! Reprovado!");
          exibirMediaPonderadaIndividual();
          calcularNotaGeral();
          return;
        }

        exibirMediaPonderadaIndividual();
        calcularNotaGeral();

        document.querySelector(".paragrafo-inserir").style.display = "none"
        const corteminimo = cursoSelecionado.Corte
        if(notaGeral <= corteminimo) {
            document.querySelector(".div-reprov").style.display = "flex";
                    document.querySelector(".div-aprov").style.display = "none";
    } else {
        document.querySelector(".div-aprov").style.display = "flex";
                    document.querySelector(".div-reprov").style.display = "none";
    }
        
}