export async function loadCompanies() {
  try {
    const response = await fetch("/api/companies.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const companies = await response.json();
    renderCompanies(companies);
  } catch (error) {
    console.error("Error loading companies:", error);
    const container = document.getElementById("companiesContainer");
    if (container) {
      container.innerHTML =
        '<p class="no-results">حدث خطأ أثناء تحميل الشركات.</p>';
    }
  }
}

function renderCompanies(companies) {
  const container = document.getElementById("companiesContainer");
  if (!container) {
    console.error("Error: Element with ID 'companiesContainer' not found.");
    return;
  }

  if (companies.length === 0) {
    container.innerHTML = '<p class="no-results">لا توجد شركات لعرضها.</p>';
    return;
  }

  container.innerHTML = companies
    .map(
      (company) => `
      <div class="company-card">
        <img src="${company.logo || "../assets/images/default-company.png"}"
             alt="${escapeHTML(company.name)}"
             class="company-logo">
        <div class="company-content">
          <h3>${escapeHTML(company.name)}</h3>
          <div class="company-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${escapeHTML(
              company.city
            )}</span>
            <span><i class="fas fa-tag"></i> ${escapeHTML(
              company.category
            )}</span>
          </div>
          <a href="/pages/detail.html?id=${
            company.id
          }" class="btn-view">عرض التفاصيل</a>
        </div>
      </div>
    `
    )
    .join("");
}

function escapeHTML(str) {
  return str.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[char])
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("companiesContainer")) {
    loadCompanies();
  }
});
