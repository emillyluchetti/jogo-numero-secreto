let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag,texto){ //pega as tags de texto e aciona o link que permite a fala da tela
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
    function exibirMensagemInicial(){ //chama a funcao exibirTexto e pega os dois textos de uma vez, editando-os
        exibirTexto('h1', 'Jogo do número secreto');
        exibirTexto('p', 'Escolha um número entre 1 e 10');
    }

exibirMensagemInicial();

function verificarChute() { //verifica o valor inserido pelo usuario
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){ //quando o usuario acertar exibe uma mensagem
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; //distinguir o plural de cada tentativa
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilita o botao para reiniciar o jogo

    } else if (chute<numeroSecreto){ //quando o usuario insere um numero menor que o sorteado
        exibirTexto('h1', `O número é maior que ${chute}`);
        exibirTexto('p', 'Quase lá');

    } else { //quando o usuario insere um numero maior que o sorteado
        exibirTexto('h1', `O número é menor que ${chute}`);
        exibirTexto('p', 'Quase lá');

    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() { //evita repeticao de um numeros seguido//verifica se o numero escolhido ja foi gerado, se sim, gera um novo
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite){ //permite que cada numero seja sorteado uma vez por rodada
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ //includes: verifica se um elemento esta presente dentro da lista
        return gerarNumeroAleatorio(); //recursao: a funcao que se chama novamente
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido); //push adiciona ao final da lista um item
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){ //faz a limpeza do campo conforme verifica a entrada do usuario
    chute =  document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){ //habilita o botao reiniciar jogo e reinicia as informacoes de texto, voltando a tela principal
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
