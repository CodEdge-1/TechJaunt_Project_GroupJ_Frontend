
function submitBuyerData(form) {
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    location: form.location.value,
    preference: form.preference.value,
    password: form.password.value,
  };

  fetch('https://your-api.com/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(response => {
      alert("Account created successfully!");
      window.location.href = "login.html"; 
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to create account. Please try again.");
    });
}


document.getElementById("buyerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

 
  submitBuyerData(form);
});
