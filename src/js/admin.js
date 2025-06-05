document.addEventListener("DOMContentLoaded", () => {
  const commissionForm = document.getElementById("commissionForm");
  const dealsCount = document.getElementById("dealsCount");
  const commissionsTotal = document.getElementById("commissionsTotal");

  // بيانات وهمية (يتم استبدالها ببيانات من Firebase)
  dealsCount.textContent = "120";
  commissionsTotal.textContent = "6000 ريال";

  commissionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rate = document.getElementById("commissionRate").value;
    alert(`تم تحديث نسبة العمولة إلى ${rate}%`);
    // هنا يتم تحديث قاعدة البيانات
  });
});
