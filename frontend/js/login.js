const form = document.querySelector("form");
const textError = document.querySelector(".message-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email.length <= 0 || password.length <=0 ) {
    textError.textContent = "Os dados não podem estar em branco."
    textError.style.display = "block";
    return;
  }

  const response = await fetch("http://127.0.0.1/teste-tecnico-gerenciamento-estoque/backend/public/api/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email, password })
  })

  const data = await response.json();

  if (data.success === false) {
    textError.textContent = data.message;
    textError.style.display = "block";
    return;
  } else {
    window.location.href = `dashboard.html?id=${data.user_id}`;
  }
})