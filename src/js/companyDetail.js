async function loadCompanyDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = urlParams.get("id");

  if (!companyId || isNaN(companyId)) {
    window.location.href = "/pages/detail.html";
    return;
  }

  try {
    const [companiesRes, productsRes] = await Promise.all([
      fetch("/api/companies.json"),
      fetch("/api/products.json"),
    ]);

    if (!companiesRes.ok || !productsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const companies = await companiesRes.json();
    const products = await productsRes.json();

    const company = companies.find((c) => c.id === companyId);
    if (!company) {
      window.location.href = "/pages/list.html";
      return;
    }

    const companyProducts = products.filter((p) => p.companyId === companyId);

    renderCompanyDetails(company);
    renderProducts(companyProducts);
  } catch (error) {
    console.error("Error loading data:", error);
    window.location.href = "/pages/list.html";
  }
}

function renderCompanyDetails(company) {
  const nameElement = document.getElementById("companyName");
  const logoElement = document.getElementById("companyLogo");
  if (nameElement && logoElement) {
    nameElement.textContent = company.name;
    logoElement.src = `../assets/images/${
      company.logo || "default-company.png"
    }`;
  }
}

function renderProducts(products) {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  container.innerHTML = products
    .map(
      (product) => `
      <div class="product-card">
        <img src="../assets/images/${product.image || "default-product.png"}" 
             alt="${product.name}">
        <h4>${product.name}</h4>
        <p>السعر: ${product.price} ريال</p>
      </div>
    `
    )
    .join("");
}

if (document.getElementById("productsContainer")) {
  loadCompanyDetails();
}
