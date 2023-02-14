const form = document.querySelector('.formulario');
const dados = JSON.parse(localStorage.getItem("dados")) || [];
const submit = document.querySelector('.submit');
const limpar = document.querySelector('.limpar');
const nome = document.getElementById('nome');
const nascimento = document.getElementById('nascimento');


nome.focus();


// BUSCAR DADOS NO LOCAL STORAGE E CRIAR TABELA AO CARREGAR PÁGINA
dados.forEach(element => {
  criarElementos(element);
});


// ENVIAR FORMULÁRIO
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const pessoaNova = {
    "nome": nome.value,
    "nascimento": inverterData(nascimento.value),
    "id": (dados[dados.length - 1] ? (dados[dados.length - 1]).id + 1 : 0)
  };

  dados.push(pessoaNova);
  localStorage.setItem("dados", JSON.stringify(dados));

  criarElementos(pessoaNova);

  nome.value = "";
  nascimento.value = "";

  document.location.reload(true);
});


// LIMPAR LOCAL STORAGE
limpar.addEventListener('click', () => {
  localStorage.clear();
  document.location.reload(true);
});


// CRIAR ELEMENTOS NA TABELA
function criarElementos(pessoa) {
  const tbody = document.querySelector('tbody');
  const linha = document.createElement('tr');
  linha.setAttribute('id', `${pessoa.id}`);
  const col1 = document.createElement('td');
  col1.classList.add('nome');
  const col2 = document.createElement('td');
  col2.classList.add('nascimento');
  const col3 = document.createElement('td');
  const pen = document.createElement('i');
  pen.classList.add('fa-solid', 'fa-pen');
  const cancel = document.createElement('i');
  cancel.classList.add('fa-solid', 'fa-xmark');

  col1.innerHTML = pessoa.nome;
  col2.innerHTML = pessoa.nascimento;

  col3.appendChild(pen);
  col3.appendChild(cancel);
  linha.appendChild(col1);
  linha.appendChild(col2);
  linha.appendChild(col3);
  tbody.appendChild(linha);
}


const editar = document.querySelectorAll('.fa-pen');
const remover = document.querySelectorAll('.fa-xmark');


// EDITAR DADOS
editar.forEach(element => {
  element.addEventListener('click', (e) => {
    const parent = e.target.parentNode.parentNode;
    const index = dados.findIndex(e => e.id == parent.id);

    if (nome.value != "" && nascimento.value == "") {
      parent.childNodes[0].innerText = nome.value;
      dados[index].nome = nome.value;
    } else {
      if (nome.value == "" && nascimento.value != "") {
        parent.childNodes[1].innerText = nascimento.value;
        dados[index].nascimento = nascimento.value;
      } else {
        if (nome.value != "" && nascimento.value != "") {
          parent.childNodes[0].innerText = nome.value;
          parent.childNodes[1].innerText = nascimento.value;
          dados[index].nome = nome.value;
          dados[index].nascimento = nascimento.value;
        } else {
          alert('Para editar, é necessário escrever nos campos de texto e data a informação que será inserida na linha');
        }
      }
    }

    localStorage.setItem("dados", JSON.stringify(dados));

    nome.value = "";
    nascimento.value = "";
  });
});


// REMOVER DADOS
remover.forEach(element => {
  element.addEventListener('click', function () {
    const parent = this.parentNode.parentNode;
    const id = parent.attributes['id'].value;
    parent.remove();
    dados.splice(dados.findIndex(e => e.id == id), 1);
    localStorage.setItem("dados", JSON.stringify(dados));
  });
});


function inverterData(data) {
  let dia = data[8] + data[9];
  let mes = data[4] + data[5] + data[6] + data[7];
  let ano = data[0] + data[1] + data[2] + data[3];
  let novaData = dia + mes + ano;
  return novaData;
}