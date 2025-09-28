const form = document.querySelector("#modalAddProduct form");
const tbody = document.querySelector("tbody");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
const errors = [];

document.addEventListener("DOMContentLoaded", async () => {
  if (!userId) {
    window.location.href = 'login.html';
  }
  const response = await fetch("http://localhost/teste-tecnico-gerenciamento-estoque/backend/public/api/products/read.php", {
    method: "get",
  })

  const products = await response.json();

  products.data.forEach(product => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = product.nome;
  
    const tdQuantity = document.createElement("td");
    tdQuantity.textContent = product.quantidade;
  
    const tdPrice = document.createElement("td");
    tdPrice.textContent = `R$ ${product.preco}`;
  
    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("id", `editProduct${product.id}`);
    buttonEdit.setAttribute("class", "editProduct");
    const iconEdit = document.createElement("img");
    iconEdit.src = './images/edit.png'
    buttonEdit.style.display = "flex";
    buttonEdit.style.gap = "4px";
    buttonEdit.style.alignItems = "center";
    buttonEdit.appendChild(iconEdit);
    buttonEdit.appendChild(document.createTextNode("Editar"));
    buttonEdit.dataset.id = product.id;
    buttonEdit.dataset.name = product.nome;
    buttonEdit.dataset.sku = product.sku;
    buttonEdit.dataset.category = product.categoria;
    buttonEdit.dataset.price = product.preco;
    buttonEdit.dataset.quantity = product.quantidade;
    buttonEdit.dataset.supplier = product.fornecedor;
    buttonEdit.dataset.description = product.descricao;
  
    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("id", `deleteProduct${product.id}`);
    buttonDelete.setAttribute("class", "deleteProduct");
    const iconDelete = document.createElement("img");
    iconDelete.src = './images/delete-white.png'
    buttonDelete.style.display = "flex";
    buttonDelete.style.gap = "4px";
    buttonDelete.style.alignItems = "center";
    buttonDelete.appendChild(iconDelete);
    buttonDelete.appendChild(document.createTextNode("Excluir"));
    buttonDelete.dataset.id = product.id;
  
    const tdAction = document.createElement("td");
    tdAction.style.display = "flex";
    tdAction.style.justifyContent = "end"
    tdAction.style.gap = "8px"
    tdAction.append(buttonEdit, buttonDelete);
  
    tr.append(tdName, tdQuantity, tdPrice, tdAction);
    tbody.appendChild(tr);
  })
})

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const productName = document.getElementById("name").value || "";
  const sku = document.getElementById("sku").value || "";
  const category = document.getElementById("category").value || "";
  const price = document.getElementById("price").valueAsNumber;
  const quantity = document.getElementById("quantity").valueAsNumber;
  const supplier = document.getElementById("supplier").value || "";
  const description = document.getElementById("description").value || "";
  
  validationForm(productName, sku, category, price, quantity, supplier);

  if (errors.length > 0) {
    createErrorForm(errors);
    return;
  }

  const response = await fetch("http://localhost/teste-tecnico-gerenciamento-estoque/backend/public/api/products/create.php", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productName,
      userId,
      sku,
      category,
      price,
      quantity,
      supplier,
      description
    })
  })
})

function validationForm(
  name,
  sku,
  category,
  price,
  quantity,
  supplier
) {
  errors.length = 0;

  if (
    !name.trim() ||
    !sku.trim() ||
    !category.trim() ||
    !price ||
    !quantity ||
    !supplier.trim()
  ) {
    errors.push("Os campos com asteriscos são obrigatórios");
  }

  if (!Number.isFinite(price) || !Number.isFinite(quantity)) {
    errors.push("Preço e Quantidade em Estoque digite apenas números");
  }
}

function createErrorForm(errors) {
  const divErrorsForm = document.getElementById("form-message-errors");
  divErrorsForm.style.display = "flex";
  
  errors.forEach(error => {
    const errorElement = document.createElement("p");
    errorElement.textContent = error;
    errorElement.style.fontSize = "12px";
    errorElement.style.display = "flex";
    errorElement.style.alignItems = "center";
    errorElement.style.gap = ".25rem";
    errorElement.style.backgroundColor = "#F1F5F9";
    errorElement.style.padding = ".25rem .5rem";
    errorElement.style.borderRadius = "1rem";
    const icon = document.createElement("img");
    icon.src = './images/info.png'
    errorElement.prepend(icon);

    divErrorsForm.appendChild(errorElement);
  });

}