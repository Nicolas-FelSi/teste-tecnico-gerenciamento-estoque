document.addEventListener("DOMContentLoaded", () => {
  const modalAddProduct = document.getElementById("modalAddProduct");
  const modalEditProduct = document.getElementById("modalEditProduct");
  const modalDeleteProduct = document.getElementById("modalDeleteProduct");

  const closeEditModal = document.getElementById("closeEditModal");
  const closeAddModal = document.getElementById("closeAddModal");
  const closeDeleteModal = document.getElementById("closeDeleteModal");

  const addProduct = document.getElementById("addProduct");
  if (addProduct && modalAddProduct) {
    addProduct.addEventListener("click", () => modalAddProduct.style.display = "flex");
  }
  if (closeAddModal && modalAddProduct) {
    closeAddModal.addEventListener("click", () => modalAddProduct.style.display = "none");
  }
  if (closeEditModal && modalEditProduct) {
    closeEditModal.addEventListener("click", () => modalEditProduct.style.display = "none");
  }
  if (closeDeleteModal && modalDeleteProduct) {
    closeDeleteModal.addEventListener("click", () => modalDeleteProduct.style.display = "none");
  }

  tbody.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".editProduct");
    if (editBtn) {
      const id = editBtn.dataset.id;
      const name = editBtn.dataset.name;
      const sku = editBtn.dataset.sku;
      const category = editBtn.dataset.category;
      const price = editBtn.dataset.price;
      const quantity = editBtn.dataset.quantity;
      const supplier = editBtn.dataset.supplier;
      const description = editBtn.dataset.description;

      const editId = document.getElementById("edit-id");
      const editName = document.getElementById("edit-name");
      const editSku = document.getElementById("edit-sku");
      const editCategory = document.getElementById("edit-category");
      const editPrice = document.getElementById("edit-price");
      const editQuantity = document.getElementById("edit-quantity");
      const editSupplier = document.getElementById("edit-supplier");
      const editDescription = document.getElementById("edit-description");

      if (editId) {
        editId.value = id ?? "";
      }
      if (editName) {
        editName.value = name ?? "";
      }
      if (editSku) {
        editSku.value = sku ?? "";
      }
      if (editCategory) {
        editCategory.value = category ?? "";
      }
      if (editPrice) {
        editPrice.value = price ?? "";
      }
      if (editQuantity) {
        editQuantity.value = quantity ?? "";
      }
      if (editSupplier) {
        editSupplier.value = supplier ?? "";
      }
      if (editDescription) {
        editDescription.value = description ?? "";
      }

      modalEditProduct.style.display = "flex";
      return;
    }

    const delBtn = e.target.closest(".deleteProduct");
    if (delBtn) {
      const id = delBtn.dataset.id;
      const name = delBtn.dataset.name;
      const sku = delBtn.dataset.sku;
      const quantity = delBtn.dataset.quantity;
      const price = delBtn.dataset.price;

      const deleteId = document.getElementById("delete-id");
      const deleteName = document.getElementById("delete-name");
      const deleteSku = document.getElementById("delete-sku");
      const deleteQuantity = document.getElementById("delete-quantity");
      const deletePrice = document.getElementById("delete-price");

      if (deleteId) {
        deleteId.value = id ?? "";
      }
      if (deleteName) {
        deleteName.textContent = name ?? "";
      }
      if (deleteSku) {
        deleteSku.textContent = sku ?? "";
      }
      if (deleteQuantity) {
        deleteQuantity.textContent = `${quantity} unidades`?? "";
      }
      if (deletePrice) {
        deletePrice.textContent = `${Number(price).toLocaleString('pt-br',{style:'currency', currency:'BRL'})}` ?? "";
      }

      modalDeleteProduct.style.display = "flex";
      return;
    }
  });
});
