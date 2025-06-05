document.addEventListener("DOMContentLoaded", function () {
  const form =
    document.getElementById("registerForm") ||
    document.getElementById("loginForm");
  const userType = document.getElementById("userType");
  const dynamicFields = document.getElementById("dynamicFields");
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.querySelector(".password-strength");

  const accountFields = {
    customer: `
      <div class="form-group">
        <label for="restaurantName"><i class="fas fa-utensils"></i> اسم المطعم/الكافيه</label>
        <input type="text" id="restaurantName" required>
      </div>
      <div class="form-group">
        <label for="commercialNo"><i class="fas fa-id-card"></i> السجل التجاري</label>
        <input type="text" id="commercialNo" required>
      </div>
      <div class="form-group">
        <label for="address"><i class="fas fa-map-marker-alt"></i> العنوان</label>
        <textarea id="address" rows="2" required></textarea>
      </div>
    `,
    supplier: `
      <div class="form-group">
        <label for="companyName"><i class="fas fa-building"></i> اسم الشركة</label>
        <input type="text" id="companyName" required>
      </div>
      <div class="form-group">
        <label for="commercialNo"><i class="fas fa-id-card"></i> السجل التجاري</label>
        <input type="text" id="commercialNo" required>
      </div>
      <div class="form-group">
        <label for="specialization"><i class="fas fa-tags"></i> التخصص</label>
        <select id="specialization" required>
          <option value="">اختر التخصص</option>
          <option value="food">مواد غذائية</option>
          <option value="packaging">مواد تغليف</option>
          <option value="equipment">معدات مطاعم</option>
        </select>
      </div>
    `,
    consumer: `
      <div class="form-group">
        <label for="nationalId"><i class="fas fa-id-card"></i> رقم الهوية</label>
        <input type="text" id="nationalId" required>
      </div>
      <div class="form-group">
        <label><i class="fas fa-venus-mars"></i> الجنس</label>
        <div class="gender-options">
          <label>
            <input type="radio" name="gender" value="male" required> ذكر
          </label>
          <label>
            <input type="radio" name="gender" value="female"> أنثى
          </label>
        </div>
      </div>
    `,
  };

  if (userType) {
    userType.addEventListener("change", function () {
      dynamicFields.innerHTML = accountFields[this.value] || "";
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const strength = calculatePasswordStrength(this.value);
      updatePasswordStrengthIndicator(strength);
    });
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!validateForm()) return;
      showLoading(true);
      try {
        const userData = prepareFormData();
        const response = await registerUser(userData);
        if (response.success) {
          showSuccess("تم إنشاء الحساب بنجاح! سيتم توجيهك...");
          setTimeout(() => redirectUser(userData.userType), 1500);
        } else {
          showError(response.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        showError("حدث خطأ أثناء التسجيل");
      } finally {
        showLoading(false);
      }
    });
  }

  function validateForm() {
    let isValid = true;
    if (userType && !userType.value) {
      setError(userType, "اختر نوع الحساب");
      isValid = false;
    }
    const fullName = document.getElementById("fullName");
    if (fullName && !fullName.value.trim()) {
      setError(fullName, "الاسم الكامل مطلوب");
      isValid = false;
    }
    const email = document.getElementById("email");
    if (email && !email.value.trim()) {
      setError(email, "البريد الإلكتروني مطلوب");
      isValid = false;
    }
    return isValid;
  }

  function prepareFormData() {
    const formData = {
      userType: userType ? userType.value : "",
      fullName: document.getElementById("fullName")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      phone: document.getElementById("phone")?.value.trim() || "",
      password: passwordInput?.value.trim() || "",
    };

    switch (formData.userType) {
      case "customer":
        formData.restaurantName =
          document.getElementById("restaurantName")?.value.trim() || "";
        formData.commercialNo =
          document.getElementById("commercialNo")?.value.trim() || "";
        formData.address =
          document.getElementById("address")?.value.trim() || "";
        break;
      case "supplier":
        formData.companyName =
          document.getElementById("companyName")?.value.trim() || "";
        formData.commercialNo =
          document.getElementById("commercialNo")?.value.trim() || "";
        formData.specialization =
          document.getElementById("specialization")?.value || "";
        break;
      case "consumer":
        formData.nationalId =
          document.getElementById("nationalId")?.value.trim() || "";
        formData.gender =
          document.querySelector('input[name="gender"]:checked')?.value || "";
        break;
    }
    return formData;
  }

  async function registerUser(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "تم التسجيل بنجاح",
          userType: data.userType,
        });
      }, 1500);
    });
  }

  function redirectUser(userType) {
    const pages = {
      customer: "/pages/client.html",
      supplier: "/pages/offer-form.html",
      consumer: "/pages/index.html",
    };
    window.location.href = pages[userType] || "/pages/login.html";
  }

  function calculatePasswordStrength(password) {
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  }

  function updatePasswordStrengthIndicator(strength) {
    if (passwordStrength) {
      passwordStrength.className = `password-strength ${strength}`;
    }
  }

  function setError(element, message) {
    const errorElement = element.nextElementSibling?.classList.contains(
      "input-error"
    )
      ? element.nextElementSibling
      : document.createElement("span");
    errorElement.className = "input-error";
    errorElement.textContent = message;
    element.parentNode.appendChild(errorElement);
  }

  function showLoading(show) {
    const spinner = document.querySelector(".loading-spinner");
    if (spinner) spinner.style.opacity = show ? "1" : "0";
  }

  function showError(message) {
    const errorMessage =
      document.querySelector(".error-message") || document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    form.prepend(errorMessage);
  }

  function showSuccess(message) {
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent = message;
    form.prepend(successMessage);
  }
});
