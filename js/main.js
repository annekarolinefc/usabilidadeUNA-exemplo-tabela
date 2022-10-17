/*CRIANDO A TABELA*/

/* Referencia da tabela - DIV */
const tableContainer = document.querySelector('#tabela-produtos');

/* Criando elementos dentro da div*/
const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

const CABECALHO_TABELA = ['ID', 'Nome', 'Preço', 'Categoria'];

const totalRegistros = document.querySelector("#total-produtos");
const selectCategoria = document.querySelector("#categoria-produtos");

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
});

selectCategoria.addEventListener('change', function(){
    if(this.selectedIndex==0){
        totalRegistros.textContent=produtos.length;
        tbody.childNodes.forEach(function(d){return d.style.display="";})
    }
    else{
        filtrarLinhas(this.value);
    }
});

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

        produtos.push(dados[i]) /* pegando um vetor de produtos*/

        if(!categoriaDosProdutos.includes(dados[i].category))
            categoriaDosProdutos.push(dados[i].category); /* se não existe a categoria, eu adiciono a categoria */
        
        /* configuração do registro */
        let registro = [
            dados[i].id.toString().padStart(2,0), /* formatação de zero a esquerda */
            dados[i].title,
            dados[i].price.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'}), /* formatando a moeda para o formato Brasileiro - forma nativa */
            dados[i].category,
        ]
        
        /* pega os registro e coloca nas linhas */
        for (let j=0; j<registro.length; j++){
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title', registro[j])

            /* Amarrando um evento no nome do produto | j==1 é a coluna de indice 1*/
            if (j==1){
                celula.addEventListener('click', function(){

                    //alert('Passei por aqui!')
                    let id = this.parentElement.id.split('-')[1]; /* Extrai o digito a direita do traço */
                    let produto = produtos.find(function(d){
                        return d.id==id;
                    }); /* Extrai o digito a direita do traço */
                    //alert(id)

                    sessionStorage.clear();
                    sessionStorage.setItem('id', produto.id);
                    sessionStorage.setItem('nome', produto.title);
                    sessionStorage.setItem('preco', produto.price);
                    sessionStorage.setItem('categoria', produto.category);

                    window.open("exibir.html", "_self");
                });
            }
        }


    }
}

function atualizarBarraDeFerramentas(dados){

    totalRegistros.textContent = dados.length;

    for(let i=0; i<categoriaDosProdutos.length; i++){
        let option = document.createElement('option');
        option.setAttribute('value', categoriaDosProdutos[i]);
        option.textContent=categoriaDosProdutos[i];
        selectCategoria.appendChild(option);
    }
}

function filtrarLinhas(categoria){
    let totalItensFiltrados = 0;

    tbody.childNodes.forEach(function(linha){
        let td = linha.childNodes[3]; /* todos os filhos(nós) de tbody e percorrer o vetor de linhas */

        if (td.textContent == categoria){
            linha.style,display = "",
            totalItensFiltrados++; 
        
        }else{
            linha.style.display='none'
        }
    });

    totalRegistros.textContent=totalItensFiltrados;
}