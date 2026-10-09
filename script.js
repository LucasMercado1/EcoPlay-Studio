const textosExplicativos = {
    ecotycoon: "Eco-Tycoon é um jogo onde você gerencia uma cidade. É preciso construir fábricas ecológicas e usar energias limpas para conter a poluição.",
    cleanseas: "Clean the Seas coloca você no comando de um barco. O seu papel é navegar retirando sacolas plásticas e redes de pesca velhas do oceano.",
    greenrunner: "Green Runner é um jogo onde o boneco corre sozinho na rua. Você pula obstáculos e junta os lixos recicláveis espalhados pelo chão."
};

let pontos = parseInt(localStorage.getItem('pontosEscola')) || 0;
const campoPlacar = document.getElementById('pontos-topo');
campoPlacar.textContent = pontos;

if (localStorage.getItem('temaEscuro') === 'sim') {
    document.body.classList.add('modo-escuro');
}

const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaLoja = document.getElementById('tela-loja');

const menuInicio = document.getElementById('menu-inicio');
const menuLoja = document.getElementById('menu-loja');

function irParaTela(telaParaMostrar, botaoParaAtivar) {
    telaInicio.classList.add('escondido');
    telaJogo.classList.add('escondido');
    telaLoja.classList.add('escondido');

    menuInicio.classList.remove('ativo');
    menuLoja.classList.remove('ativo');

    telaParaMostrar.classList.remove('escondido');
    if (botaoParaAtivar) {
        botaoParaAtivar.classList.add('ativo');
    }
}

menuInicio.addEventListener('click', () => irParaTela(telaInicio, menuInicio));
menuLoja.addEventListener('click', () => {
    irParaTela(telaLoja, menuLoja);
    ajustarBotoesLoja();
});

// EVENTO 1: Mudar a cor do site (classList)
document.getElementById('btn-tema').addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    localStorage.setItem('temaEscuro', document.body.classList.contains('modo-escuro') ? 'sim' : 'nao');
});

// EVENTO 2: Botão para somar pontos
document.getElementById('btn-ganhar').addEventListener('click', () => {
    pontos = pontos + 100;
    localStorage.setItem('pontosEscola', pontos);
    campoPlacar.textContent = pontos;
});

const botoesVer = document.querySelectorAll('.btn-ver');
botoesVer.forEach(b => {
    b.addEventListener('click', (e) => {
        const idJogo = e.target.getAttribute('data-jogo');

        // OBRIGAÇÃO: Manipular o DOM
        document.getElementById('nome-jogo').textContent = e.target.parentElement.querySelector('b').textContent;
        document.getElementById('texto-jogo').textContent = textosExplicativos[idJogo];

        document.getElementById('campo-voto').value = "";
        document.getElementById('mensagem-voto').textContent = "";

        irParaTela(telaJogo, null);
    });
});

document.getElementById('btn-voltar').addEventListener('click', () => irParaTela(telaInicio, menuInicio));

// EVENTO 3: Alteração do Select (change)
document.getElementById('campo-voto').addEventListener('change', (e) => {
    const msgVoto = document.getElementById('mensagem-voto');
    if (e.target.value !== "") {
        msgVoto.textContent = "Interesse gravado: " + e.target.value;
    } else {
        msgVoto.textContent = "";
    }
});

const botoesLoja = document.querySelectorAll('.btn-comprar');
function ajustarBotoesLoja() {
    botoesLoja.forEach(b => {
        let preco = parseInt(b.getAttribute('data-custo'));
        b.disabled = pontos < preco;
    });
}

// EVENTO 4: Clicar para comprar na loja
botoesLoja.forEach(b => {
    b.addEventListener('click', (e) => {
        let preco = parseInt(e.target.getAttribute('data-custo'));
        if (pontos >= preco) {
            pontos = pontos - preco;
            localStorage.setItem('pontosEscola', pontos);
            campoPlacar.textContent = pontos;
            alert("Item resgatado!");
            ajustarBotoesLoja();
        }
    });
});

// EVENTO 5: Enviar formulário (submit)
document.getElementById('formulario-sugestao').addEventListener('submit', (e) => {
    e.preventDefault();
    let nome = document.getElementById('campo-nome').value;

    // OBRIGAÇÃO: Modificar elemento do DOM
    document.getElementById('mensagem-final').textContent = "Obrigado, " + nome + "! Gravamos sua ideia.";
    document.getElementById('formulario-sugestao').reset();
});
