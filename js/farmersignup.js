// Submit data to backend
function submitFarmerData(form) {
  const data = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    phone: form.phone.value,
    produce: form.produce.value,
    location: form.location.value,
    password: form.password.value,
  };

  fetch("https://your-api.com/api/farmers/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      alert("Farmer account created successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("There was a problem creating your account. Please try again.");
    });
}

// Form submission handler
document.getElementById("farmerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  submitFarmerData(form);
});
