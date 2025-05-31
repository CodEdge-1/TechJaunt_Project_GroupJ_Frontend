
  const buttons = document.querySelectorAll('.cta-button, .signup, .login');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.05)';
  });

  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('click', () => {
    alert(`You clicked: ${button.textContent.trim()}`);
  });
});

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector("input[type='email']").value;
    if (emailInput) {
      alert(`Thanks for subscribing with ${emailInput}`);
      this.reset();
    } else {
      alert("Please enter a valid email address.");
    }
  });