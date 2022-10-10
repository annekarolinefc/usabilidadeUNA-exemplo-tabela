/*CRIANDO A TABELA*/

/* Referencia da tabela - DIV */
const tableContainer = document.querySelector('#tabela-produtos');

/* Criando elementos dentro da div*/
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const CABECALHO_TABELA = ['ID', 'Nome', 'Preço', 'Categoria'];

let produtos = [];
let categoriaDosProdutos=[];

/* Amarrar um evento - toda vez que carregar */
window.addEventListener('load', function(){ /* função anonima */
    //TODO: criartabela();
    //TODO: formatarCabecalho();
    //TODO: carregaDados();

    criarTabela();
    formatarCabecalho();
    carregaDados();

function criarTabela(){
        thead.setAttribute('id', 'cabecalho-tabela')
        tbody.setAttribute('id', 'corpo-tabela')

        table.appendChild(thead)
        table.appendChild(tbody)

        tableContainer.appendChild(table)
}

function formatarCabecalho(){
        let linha = thead.insertRow(0)

        for (let celula=0; celula<CABECALHO_TABELA.length; celula++){
            let th = document.createElement('th');
            th.textContent = CABECALHO_TABELA[celula];
            linha.appendChild(th)
        }
}

function  carregaDados(){
        fetch('data/produtos.json')
            .then(function(resposta){return resposta.json();})
            .then(function(dados){
                // TODO:adicionarLinhas(dados);
                adicionarLinhas(dados);

            })
            .catch(function(error){
                console.error("Não foi possível carregar os dados!");
            })
}


function adicionarLinhas(dados){
    console.log(produtos)

    for (let i=0; i<dados.length; i++){
        let linha = tbody.insertRow();
        linha.setAttribute('id', 'produto=' + dados[i].id);

        produtos.push(dados[i])

        if(!categoriaDosProdutos.includes(dados[i].category)){
            categoriaDosProdutos.push(dados[i].category);
        let registro = [
            dados[i].id,
            dados[i].title,
            dados[i].price,
            dados[i].category,
        ]
        for (let j=0; j<registro.length; j++){
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title', registro[j])
        }
        }
    }
}
});