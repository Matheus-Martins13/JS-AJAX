const form = document.querySelector('.form');
const resultado = document.querySelector('.resultado');

form.addEventListener('submit', e => {
    e.preventDefault();

    const el = e.target;
    const nome = el.querySelector('#nome').value;
    const cpf = el.querySelector('#cpf').value;

    fetch('pessoas.json')
        .then(resposta => resposta.json())
        .then(json => consultaDados(json, nome, cpf))
        .catch(error => console.log(error));
})

function consultaDados(json, nome, cpf) {
    for(let pessoa of json) {
        if(pessoa.nome === nome && cpf === pessoa.cpf) {
            resultado.innerHTML = ' ';
            resultado.appendChild(geraElementoFormatado('p', 'Seu cadastro foi encontrado no sistema.', true));
            for (let [chave, valor] of Object.entries(pessoa)){
                resultado.appendChild(geraElemento('p', `${chave}: ${valor}`))
            }
            return;
        } 
    }
    resultado.innerHTML = ' ';
    resultado.appendChild(geraElementoFormatado('p', 'Seu cadastro não está no sistema.', false));
 
}

function geraElemento(tag, msg) {
    const elemento = document.createElement(tag);
    elemento.innerHTML = msg;
    return elemento;
}

function geraElementoFormatado(tag, msg, status) {
    const elemento = geraElemento(tag, msg);

    if(status){
        elemento.classList.add('success');
        return elemento;
    }
    elemento.classList.add('bad-value');
    return elemento; 
}
