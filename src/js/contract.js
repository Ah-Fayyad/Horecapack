document.addEventListener("DOMContentLoaded", () => {
  const signContract = document.getElementById("signContract");

  signContract.addEventListener("click", () => {
    alert("تم توقيع العقد بنجاح!");
    // هنا يتم حفظ التوقيع الرقمي في قاعدة البيانات
  });
});
