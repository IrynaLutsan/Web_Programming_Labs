const editForm = document.getElementById("editForm");
var currentShoeId = null;

// Завантажуємо дані при відкритті сторінки
document.addEventListener("DOMContentLoaded", async () => {
  // Отримуємо ID з URL (напр. /edit?id=5)
  const params = new URLSearchParams(window.location.search);
  const shoeId = params.get("id");

  if (!shoeId) {
    showModal("Error: No shoe ID provided. Redirecting to home.");
    setTimeout(() => (window.location.href = "/"), 2000);
    return;
  }

  currentShoeId = shoeId;

  try {
    const response = await fetch(`/api/shoes/${currentShoeId}`);
    
    // --- FIX: Improved error handling ---
    if (!response.ok) {
      let errorMsg = `HTTP error! status: ${response.status}`;
      try {
        // Try to get the specific error from the server's JSON response
        const errorData = await response.json();
        if (errorData.error) {
          errorMsg = errorData.error; // e.g., "Shoe not found"
        }
      } catch (e) {
        // Server didn't send JSON or another error occurred
      }
      throw new Error(errorMsg);
    }

    const shoe = await response.json();

    Object.entries(shoe).forEach(([key, value]) => {
      if (key !== 'id' && editForm[key]) {
        editForm[key].value = value;
      }
    });

  } catch (error) {
    console.error("Could not fetch shoe data:", error);
    
    showModal(`Could not load shoe data: ${error.message}. Redirecting...`);
    setTimeout(() => (window.location.href = "/"), 2500); 
  }
});


editForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  if (!currentShoeId) return; // Немає ID для оновлення

  const producer = editForm.producer.value.trim();
  const price = parseFloat(editForm.price.value);
  const size = parseInt(editForm.size.value);
  const color = editForm.color.value.trim();

  
  const textPattern = /^[A-Za-z\s]+$/;
  if (!producer || !textPattern.test(producer) || !price || !size || !color || !textPattern.test(color)) {
    return showModal("Please fill in all fields correctly!");
  }
  if (price < 100 || price > 10000) {
    showModal("Price from 100 to 10,000");
    return;
  }
  if (size < 30 || size > 50) {
    showModal("Size from 30 to 50");
    return;
  }

  const updatedShoe = { producer, price, size, color };

  try {
    const response = await fetch(`/api/shoes/${currentShoeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedShoe),
    });

    if (!response.ok) {
    
      let errorMsg = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) errorMsg = errorData.error;
      } catch (e) {}
      throw new Error(errorMsg);
    }

    showModal("Shoes updated successfully!");
    setTimeout(() => (window.location.href = "/"), 1500);

  } catch (error) {
    console.error("Could not update shoe:", error);
    showModal(`Error updating shoes: ${error.message}`);
  }
});

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = message;
  modal.style.display = "block";

  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
  };
}