// Exercicio 1 Sistema de votacao de comentarios

const comentarios = document.querySelectorAll(".comentario");

let totalGostei = 0;
let totalDesgostei = 0;

const spanGostei = document.getElementById("totalGostei");
const spanDesgostei = document.getElementById("totalDesgostei");

comentarios.forEach((comentario) => {
  const gostar = comentario.querySelector(".gostar");
  const desgostar = comentario.querySelector(".desgostar");

  const contadorGostar = comentario.querySelector(".contador1");
  const contadorDesgostar = comentario.querySelector(".contador2");

  let votou = false;

  gostar.addEventListener("click", () => {
    if (!votou) {
      contadorGostar.textContent =
        parseInt(contadorGostar.textContent) + 1;

      totalGostei++;
      spanGostei.textContent = totalGostei;

      votou = true;
    }
  });

  desgostar.addEventListener("click", () => {
    if (!votou) {
      contadorDesgostar.textContent =
        parseInt(contadorDesgostar.textContent) + 1;

      totalDesgostei++;
      spanDesgostei.textContent = totalDesgostei;

      votou = true;
    }
  });
});

// Exercicio 2 Sistema de reserva de lugares

const todosLugares = document.querySelectorAll('.lugar:not(.ocupado)');
const btnConfirmar = document.getElementById('confirmar');
const btnAdicionar = document.getElementById('btnAdicionar');
const desfazer = document.getElementById('btnDesfazer');
const inputAssento = document.getElementById('inputAssento');
const textoQuantidade = document.getElementById('quantidade');
const textoTotal = document.getElementById('total');

const PRECO = 200;

const dadosSalvos = localStorage.getItem('assentos_reservados');

// Se existir algum texto salvo (ex: "A1,C2")...
if (dadosSalvos) {

    const listaDeCodigos = dadosSalvos.split(','); 

    // Percorre essa lista e marca os lugares como OCUPADOS definitivamente
    for (let i = 0; i < listaDeCodigos.length; i++) {
        const codigo = listaDeCodigos[i];
        
        // Procura o assento na tela
        const assento = document.querySelector('.lugar[data-lugar="' + codigo + '"]');
        
        // Se achou o assento, marca como ocupado
        if (assento) {
            assento.classList.add('ocupado');
            assento.classList.remove('selecionado'); // Garante que não está selecionado
        }
    }
}

for (let i = 0; i < todosLugares.length; i++) {
    todosLugares[i].addEventListener('click', function() {

        if (this.classList.contains('ocupado')) {
            return;
        }

        // Liga ou desliga a classe 'selecionado' (verde)
        this.classList.toggle('selecionado');

        atualizarResumo();
    });
}

btnAdicionar.addEventListener('click', function() {
    const codigoDigitado = inputAssento.value.toUpperCase(); // Ex: a1 vira A1

    // Procura o elemento específico
    const assentoAlvo = document.querySelector('.lugar[data-lugar="' + codigoDigitado + '"]');

    if (assentoAlvo) {
        if (assentoAlvo.classList.contains('ocupado')) {
            alert('Lugar Ocupado!');
        } else {
            assentoAlvo.classList.add('selecionado');
            atualizarResumo();
            inputAssento.value = ''; // Limpa o campo
        }
    } else {
        alert('Código inválido');
    }
});

function atualizarResumo() {

    const selecionados = document.querySelectorAll('.lugar.selecionado');
    const quantidade = selecionados.length;

    textoQuantidade.innerText = quantidade;
    textoTotal.innerText = quantidade * PRECO;
}

btnConfirmar.addEventListener('click', function() {

    const selecionados = document.querySelectorAll('.lugar.selecionado');

    if (selecionados.length === 0) {
        alert("Selecione um lugar primeiro.");
        return;
    }

    for (let i = 0; i < selecionados.length; i++) {
        selecionados[i].classList.remove('selecionado');
        selecionados[i].classList.add('ocupado');
    }

    const todosOcupados = document.querySelectorAll('.lugar.ocupado');
    let listaParaSalvar = [];

    for (let i = 0; i < todosOcupados.length; i++) {
        const codigo = todosOcupados[i].getAttribute('data-lugar');
        listaParaSalvar.push(codigo);
    }


    const textoParaSalvar = listaParaSalvar.join(',');

    localStorage.setItem('assentos_reservados', textoParaSalvar);

    alert('Reserva guardada com sucesso!');
    atualizarResumo(); // Zera o contador de preço
});

desfazer.addEventListener("click", () => {

    if(confirm("Tem certeza que deseja apagar TODAS as reservas?")) {

        localStorage.removeItem('assentos_reservados');
        location.reload(); 
    }
});


// Exercicio 3 Sistema de login com temporizador

let botao = document.getElementById("entrar");
let resultado = document.getElementById("result");
let form = document.getElementById("formulario");

const Username = "Borregana";
const Password = "Pass123!";
let tentar = 0;
const tentativasmax = 3;


botao.addEventListener("click", function(evento) {
    evento.preventDefault();

    const inputNome = document.getElementById("usuario").value;
    const inputSenha = document.getElementsByClassName("senha").value;

    if (inputNome === username && Password) {
        result.innerText = "Welcome To Our Page!"
    setTimeout(function() {
        
    }, 3000);
} else {
    tentar++;

    if (tentar > tentativasmax) {
        resultado.innerText = "Usuário bloqueado! Muitas tentativas erradas."
        result.style.color = "red";

        document.getElementById("inputNome").disabled = true;
        document.getElementById("inputSenha").disabled = true;
        botao.disabled = true;
    } else{
        result.innerText = ` Dados incorrectos, sera bloqueado apos 3 tentativas! Tentativa ${tentar} de ${tentavivasmax} `
    }
}
});
