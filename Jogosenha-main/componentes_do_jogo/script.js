let senhaCorreta = "";

const campo = document.getElementById("senha");
const historico = document.getElementById("historico");
const mensagem = document.getElementById("mensagem");
const configuracao = document.getElementById("configuracao");
const campoSenhaSecreta = document.getElementById("senha-secreta");
const campoTamanhoSenha = document.getElementById("tamanho-senha");

const contadorTentativas = document.getElementById("tentativas");
const contadorDicas = document.getElementById("dicas");

const tamanhoMinimo = 1;
const tamanhoMaximo = 4000;
const caracteresGerador =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

let tentativas = 0;
let dicas = 0;
let jogoFinalizado = false;
let partidaIniciada = false;

campoSenhaSecreta.focus();

function iniciarComSenha(){

    iniciarPartida(campoSenhaSecreta.value);

}

function gerarSenha(){

    const tamanho = limitarTamanho(Number(campoTamanhoSenha.value));
    let senha = "";

    for(let i = 0; i < tamanho; i++){

        const indice = Math.floor(Math.random() * caracteresGerador.length);
        senha += caracteresGerador[indice];

    }

    campoSenhaSecreta.value = senha;
    iniciarPartida(senha);

}

function iniciarPartida(senha){

    if(senha.length < tamanhoMinimo){

        mensagem.textContent = "Escolha ou gere uma senha antes de iniciar.";
        campoSenhaSecreta.focus();
        return;

    }

    if(senha.length > tamanhoMaximo){

        mensagem.textContent =
            "A senha pode ter no maximo " + tamanhoMaximo + " caracteres.";
        campoSenhaSecreta.focus();
        return;

    }

    senhaCorreta = senha;
    tentativas = 0;
    dicas = 0;
    jogoFinalizado = false;
    partidaIniciada = true;

    contadorTentativas.textContent = tentativas;
    contadorDicas.textContent = dicas;
    historico.textContent = "";

    configuracao.hidden = true;
    campo.disabled = false;
    campo.value = "";

    mensagem.textContent =
        "Partida iniciada. A senha possui " +
        senhaCorreta.length +
        " caractere(s).";

    campo.focus();

}

function verificar(){

    if(!partidaIniciada){

        mensagem.textContent = "Inicie uma partida primeiro.";
        campoSenhaSecreta.focus();
        return;

    }

    if(jogoFinalizado){
        return;
    }

    const tentativa = campo.value;

    if(tentativa.length === 0){

        mensagem.textContent = "Digite alguma tentativa.";
        campo.focus();
        return;

    }

    tentativas++;
    contadorTentativas.textContent = tentativas;

    const resposta = compararTentativa(tentativa);
    adicionarAoHistorico(tentativa, resposta);

    if(tentativa === senhaCorreta){

        mensagem.textContent = "Parabens! Voce descobriu a senha!";
        jogoFinalizado = true;
        campo.disabled = true;

    }

    campo.value = "";
    campo.focus();

}

function compararTentativa(tentativa){

    const limite = Math.max(tentativa.length, senhaCorreta.length);
    const senhaMaiuscula = senhaCorreta.toUpperCase();
    const resposta = [];

    for(let i = 0; i < limite; i++){

        if(i >= tentativa.length){

            resposta.push("⬜");

        }

        else if(i >= senhaCorreta.length){

            resposta.push("❌");

        }

        else if(tentativa[i] === senhaCorreta[i]){

            resposta.push("🟢");

        }

        else if(tentativa[i].toUpperCase() === senhaCorreta[i].toUpperCase()){

            resposta.push("🔵");

        }

        else if(senhaMaiuscula.includes(tentativa[i].toUpperCase())){

            resposta.push("🟡");

        }

        else{

            resposta.push("❌");

        }

    }

    return resposta.join(" ");

}

function adicionarAoHistorico(tentativa, resposta){

    const linha = document.createElement("div");
    linha.className = "linha";

    const titulo = document.createElement("strong");
    titulo.textContent = "Tentativa " + tentativas;

    const textoTentativa = document.createElement("div");
    textoTentativa.className = "tentativa-texto";
    textoTentativa.textContent = tentativa;

    const textoResposta = document.createElement("div");
    textoResposta.className = "resultado-texto";
    textoResposta.textContent = resposta;

    linha.append(titulo, textoTentativa, textoResposta);
    historico.appendChild(linha);
    historico.scrollTop = historico.scrollHeight;

}

function darDica(){

    if(!partidaIniciada){

        mensagem.textContent = "Inicie uma partida primeiro.";
        campoSenhaSecreta.focus();
        return;

    }

    if(jogoFinalizado){
        return;
    }

    dicas++;
    contadorDicas.textContent = dicas;

    const dica = criarDica(dicas);
    mensagem.textContent = dica;

}

function criarDica(numeroDica){

    const tamanho = senhaCorreta.length;

    if(numeroDica === 1){
        return "A senha possui " + tamanho + " caractere(s).";
    }

    if(numeroDica === 2){
        return "Primeiro caractere: " + senhaCorreta[0];
    }

    if(numeroDica === 3){
        return "Ultimo caractere: " + senhaCorreta[tamanho - 1];
    }

    if(numeroDica === 4){
        return "A senha possui " + contar(/[0-9]/) + " numero(s).";
    }

    if(numeroDica === 5){
        return "A senha possui " + contar(/[A-Z]/) + " letra(s) maiuscula(s).";
    }

    if(numeroDica === 6){
        return "A senha possui " + contar(/[a-z]/) + " letra(s) minuscula(s).";
    }

    if(numeroDica === 7){
        return "A senha possui " + contar(/[^a-z0-9]/i) + " caractere(s) especial(is).";
    }

    const posicao = (numeroDica - 8) % tamanho;

    return (
        "Caractere da posicao " +
        (posicao + 1) +
        ": " +
        senhaCorreta[posicao]
    );

}

function contar(expressao){

    let total = 0;

    for(const caractere of senhaCorreta){

        if(expressao.test(caractere)){
            total++;
        }

    }

    return total;

}

function terminar(){

    if(!partidaIniciada){

        mensagem.textContent = "Inicie uma partida primeiro.";
        campoSenhaSecreta.focus();
        return;

    }

    if(jogoFinalizado){
        return;
    }

    jogoFinalizado = true;
    campo.disabled = true;
    mensagem.textContent = "Voce desistiu. A senha era: " + senhaCorreta;

}

function limitarTamanho(valor){

    if(Number.isNaN(valor)){
        return 5;
    }

    return Math.floor(Math.min(tamanhoMaximo, Math.max(tamanhoMinimo, valor)));

}

document
.getElementById("tema")
.onclick = ()=>{

    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

};

campo.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        verificar();

    }

});

campoSenhaSecreta.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        iniciarComSenha();

    }

});
