const addProductForm = document.querySelector("#modalAddProduct form");
const editProductForm = document.querySelector("#modalEditProduct form");
const deleteProductForm = document.querySelector("#modalDeleteProduct form");
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
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  })

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "login.html";
    }
  }

  const products = await response.json();

  products.data.forEach(product => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.textContent = product.nome;
  
    const tdQuantity = document.createElement("td");
    tdQuantity.textContent = product.quantidade;
  
    const tdPrice = document.createElement("td");
    tdPrice.textContent = `${Number(product.preco).toLocaleString('pt-br',{style:'currency',currency:'BRL'})}`;
  
    const buttonEdit = document.createElement("button");
    buttonEdit.setAttribute("id", "editProduct");
    buttonEdit.setAttribute("class", "editProduct");
    const iconEdit = document.createElement("img");
    iconEdit.src = './images/edit.png'
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
    buttonDelete.setAttribute("id", `deleteProduct`);
    buttonDelete.setAttribute("class", "deleteProduct");
    const iconDelete = document.createElement("img");
    iconDelete.src = './images/delete-white.png'
    buttonDelete.appendChild(iconDelete);
    buttonDelete.appendChild(document.createTextNode("Excluir"));
    buttonDelete.dataset.id = product.id;
    buttonDelete.dataset.name = product.nome;
    buttonDelete.dataset.sku = product.sku;
    buttonDelete.dataset.price = product.preco;
    buttonDelete.dataset.quantity = product.quantidade;
  
    const tdAction = document.createElement("td");
    tdAction.classList.add("td-action");
    tdAction.append(buttonEdit, buttonDelete);
  
    tr.append(tdName, tdQuantity, tdPrice, tdAction);
    tbody.appendChild(tr);
  })
})

addProductForm.addEventListener("submit", async (e) => {
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
    credentials: "include",
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

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "login.html";
    }
  }
})

editProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("edit-id").value || "";
  const productName = document.getElementById("edit-name").value || "";
  const sku = document.getElementById("edit-sku").value || "";
  const category = document.getElementById("edit-category").value || "";
  const price = document.getElementById("edit-price").valueAsNumber;
  const quantity = document.getElementById("edit-quantity").valueAsNumber;
  const supplier = document.getElementById("edit-supplier").value || "";
  const description = document.getElementById("edit-description").value || "";
  
  validationForm(productName, sku, category, price, quantity, supplier);

  if (errors.length > 0) {
    createErrorForm(errors);
    return;
  }

  const response = await fetch("http://localhost/teste-tecnico-gerenciamento-estoque/backend/public/api/products/update.php", {
    method: "put",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
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

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "login.html";
    }
  }
})

deleteProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("delete-id").value || "";
  
  const response = await fetch("http://localhost/teste-tecnico-gerenciamento-estoque/backend/public/api/products/delete.php", {
    method: "delete",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
    })
  })

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = "login.html";
    }
  }
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
    errorElement.classList.add("text-error-form");
    errorElement.textContent = error;
    // errorElement.style.fontSize = "12px";
    // errorElement.style.display = "flex";
    // errorElement.style.alignItems = "center";
    // errorElement.style.gap = ".25rem";
    // errorElement.style.backgroundColor = "#F1F5F9";
    // errorElement.style.padding = ".25rem .5rem";
    // errorElement.style.borderRadius = "1rem";
    const icon = document.createElement("img");
    icon.src = './images/info.png'
    errorElement.prepend(icon);

    divErrorsForm.appendChild(errorElement);
  });

}