document.addEventListener("DOMContentLoaded", () => {
  const paymentForm = document.getElementById("paymentForm");

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;

    // Simulate payment API (replace with HyperPay integration)
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      amount: 150,
      currency: "SAR",
      timestamp: new Date().toISOString(),
    };
    console.log("Processing payment:", paymentData);
    alert("تم إتمام الدفع بنجاح!");
    paymentForm.reset();
  });
});
