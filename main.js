function tocaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);
    try {
        elemento.play();
    } catch (error) {
        throw new Error(`Elemento de áudio não encontrado: ${seletorAudio}`);
    }
}

function ativaDesativaTecla(tecla, ativa) {
    tecla.classList[ativa ? 'add' : 'remove']('ativa');
}

const mapeamentoTeclas = [
    { instrumento: 'pom', teclas: ['Numpad7', 'Digit1', 'KeyQ'] },
    { instrumento: 'clap', teclas: ['Numpad8', 'Digit2', 'KeyW'] },
    { instrumento: 'tim', teclas: ['Numpad9', 'Digit3', 'KeyE'] },
    { instrumento: 'puff', teclas: ['Numpad4', 'Digit4', 'KeyA'] },
    { instrumento: 'splash', teclas: ['Numpad5', 'Digit5', 'KeyS'] },
    { instrumento: 'toim', teclas: ['Numpad6', 'Digit6', 'KeyD'] },
    { instrumento: 'psh', teclas: ['Numpad1', 'Digit7', 'KeyZ'] },
    { instrumento: 'tic', teclas: ['Numpad2', 'Digit8', 'KeyX'] },
    { instrumento: 'tom', teclas: ['Numpad3', 'Digit9', 'KeyC'] }
];

document.addEventListener('keydown', function(event) {
    const teclaConfig = mapeamentoTeclas.find(config => config.teclas.includes(event.code));
    if (teclaConfig) {
        const { instrumento } = teclaConfig;
        const audioId = `#som_tecla_${instrumento}`;
        
        tocaSom(audioId);
        
        const teclaDOM = document.querySelector(`.tecla_${instrumento}`);
        if (teclaDOM) {
            ativaDesativaTecla(teclaDOM, true);
        }
    } else {
        alert('A tecla pressionada não está disponível.');
    }
});

document.addEventListener('keyup', function(event) {
    const teclaConfig = mapeamentoTeclas.find(config => config.teclas.includes(event.code));
    if (teclaConfig) {
        const { instrumento } = teclaConfig;
        
        const teclaDOM = document.querySelector(`.tecla_${instrumento}`);
        if (teclaDOM) {
            ativaDesativaTecla(teclaDOM, false);
        }
    }
});

const listaDeTeclas = document.querySelectorAll('.tecla');
for (let contador = 0; contador < listaDeTeclas.length; contador++) {
    const tecla = listaDeTeclas[contador];
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`;

    tecla.onclick = function() {
        tocaSom(idAudio);
    };

    tecla.onkeydown = function(evento) {
        if (evento.code === 'Space' || evento.code === 'Enter') {
            ativaDesativaTecla(tecla, true);
        }
    };

    tecla.onkeyup = function() {
        ativaDesativaTecla(tecla, false);
    };
}