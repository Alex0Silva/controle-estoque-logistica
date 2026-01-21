let itens = [];

function adicionar() {
  const marca = document.getElementById("marca").value;
  const caixas = Number(document.getElementById("caixas").value || 0);
  const macos = Number(document.getElementById("macos").value || 0);
  const unidades = Number(document.getElementById("unidades").value || 0);
  const validade = document.getElementById("validade").value;

  if (!marca || !validade) {
    alert("Selecione a marca e informe a validade!");
    return;
  }

  const total = caixas * macos * unidades;

  itens.push({ marca, total, validade });
  atualizar();

  document.getElementById("marca").value = "";
  document.getElementById("caixas").value = "";
  document.getElementById("macos").value = "";
  document.getElementById("unidades").value = "";
  document.getElementById("validade").value = "";
}

function atualizar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const hoje = new Date();

  itens.forEach((i, idx) => {
    const tr = document.createElement("tr");

    const v = new Date(i.validade);
    let status = "OK";
    let classe = "ok";

    if (v < hoje) {
      status = "Vencido";
      classe = "vencido";
    } else if (i.total > 0 && i.total < 100) {
      status = "Baixo";
      classe = "baixo";
    }

    tr.innerHTML = `
      <td>${i.marca}</td>
      <td>${i.total}</td>
      <td>${i.validade}</td>
      <td class="${classe}">${status}</td>
      <td><button onclick="remover(${idx})">Excluir</button></td>
    `;

    lista.appendChild(tr);
  });
}

function remover(i) {
  itens.splice(i, 1);
  atualizar();
}
