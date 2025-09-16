document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  // Dummy credentials (replace with backend authentication later)
  const validUser = "naveen";
  const validPass = "12345";

  if (username === validUser && password === validPass) {
    message.style.color = "green";
    message.textContent = "✅ Login successful!";
    // Redirect (example)
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "❌ Invalid username or password";
  }
});
