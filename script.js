// Array para armazenar os times
let times = [];

// Função para adicionar um time à lista
function adicionarTime(nome, tag, email) {
  times.push({
    nome: nome,
    tag: tag,
    email: email
  });
  exibirTimes(); // Adicionado para atualizar a exibição da lista
}

// Função para exibir os times na tabela
function exibirTimes() {
  const tableBody = document.getElementById("timesBody");
  tableBody.innerHTML = "";

  times.forEach((time, index) => {
    const row = document.createElement("tr");
    const nomeCell = document.createElement("td");
    const tagCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const acoesCell = document.createElement("td");

    nomeCell.textContent = time.nome;
    tagCell.textContent = time.tag;
    emailCell.textContent = time.email;

    const editarLink = document.createElement("a");
    editarLink.href = "#";
    editarLink.textContent = "Editar";
    editarLink.addEventListener("click", () => editarTime(index));

    const excluirLink = document.createElement("a");
    excluirLink.href = "#";
    excluirLink.textContent = "Excluir";
    excluirLink.addEventListener("click", () => excluirTime(index));

    acoesCell.appendChild(editarLink);
    acoesCell.appendChild(document.createTextNode(" | "));
    acoesCell.appendChild(excluirLink);

    row.appendChild(nomeCell);
    row.appendChild(tagCell);
    row.appendChild(emailCell);
    row.appendChild(acoesCell);

    tableBody.appendChild(row);
  });
}

// Função para verificar se um nome ou email já existe
function verificarExistencia(nome, email) {
  return times.some(time => time.nome === nome || time.email === email);
}

// Função para editar um time
function editarTime(index) {
  const time = times[index];
  const nomeInput = document.getElementById("timeNome");
  const tagInput = document.getElementById("timeTag");
  const emailInput = document.getElementById("timeEmail");
  const salvarButton = document.getElementById("timeSalvar");

  nomeInput.value = time.nome;
  tagInput.value = time.tag;
  emailInput.value = time.email;

  salvarButton.style.display = "inline";
  salvarButton.addEventListener("click", () => {
    const novoNome = nomeInput.value;
    const novaTag = tagInput.value;
    const novoEmail = emailInput.value;

    if (verificarExistencia(novoNome, novoEmail)) {
      alert("Nome ou email já existente. Por favor, insira valores diferentes.");
      return;
    }

    times[index] = {
      nome: novoNome,
      tag: novaTag,
      email: novoEmail
    };

    exibirTimes();
    salvarButton.style.display = "none";
  });
}

// Função para excluir um time
function excluirTime(index) {
  times.splice(index, 1);
  exibirTimes();
}

// Função para lidar com o envio do formulário de time
function handleTimeFormSubmit(event) {
  event.preventDefault();

  const nome = document.getElementById("timeNome").value;
  const tag = document.getElementById("timeTag").value;
  const email = document.getElementById("timeEmail").value;

  if (verificarExistencia(nome, email)) {
    alert("Nome ou email já existente. Por favor, insira valores diferentes.");
    return;
  }

  adicionarTime(nome, tag, email);

  document.getElementById("timeForm").reset();
}

// Registrar o manipulador de eventos para o formulário de time
document.getElementById("timeForm").addEventListener("submit", handleTimeFormSubmit);

// Exibir os times iniciais (caso existam)
exibirTimes();
