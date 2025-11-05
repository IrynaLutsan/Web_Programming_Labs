// Import the new Shoe class
import { Shoe } from './shoe.model.js';

let globalShoesList = [];
let selectedId = null; // Зберігає ID обраного рядка

const tableBody = document.querySelector("#shoesTable tbody");
const searchInput = document.getElementById("searchInput");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const totalPriceEl = document.getElementById("totalPrice");

const confirmModal = document.getElementById("confirmModal");
const confirmMessage = document.getElementById("confirmMessage");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

async function fetchShoes() {
  try {
    const response = await fetch('/api/shoes'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const shoesData = await response.json();
    
    globalShoesList = shoesData.map(data => new Shoe(data));
    
  } catch (error) {
    console.error("Could not fetch shoes:", error);
    showModal("Не вдалося завантажити дані. Перевірте консоль.");
  }
}

function renderShoes() {
  tableBody.innerHTML = ""; 
  const query = searchInput.value;
  let total = 0;

  selectedId = null;
  editBtn.disabled = true;
  deleteBtn.disabled = true;

  globalShoesList.forEach(shoe => {
    if (shoe.matchesFilter(query)) {
      
      const row = shoe.renderAsRow((id) => {
        selectedId = id;
        editBtn.disabled = false;
        deleteBtn.disabled = false;
      });
      
      tableBody.appendChild(row);
      total += shoe.price; 
    }
  });

  totalPriceEl.textContent = `Total price: ${total} grn`;
}


// Головна функція, яка запускає сторінку
async function initializeView() {
  await fetchShoes();
  renderShoes();
  
  searchInput.addEventListener("input", renderShoes);
  
  editBtn.addEventListener("click", () => {
    if (selectedId) {
      window.location.href = `/edit?id=${selectedId}`;
    }
  });
  
  deleteBtn.addEventListener("click", () => {
    if (selectedId) showConfirmModal();
  });

  // Лістенері для модального вікна
  confirmYes.onclick = confirmDelete;
  confirmNo.onclick = closeModal;
  window.onclick = (event) => {
    if (event.target === confirmModal) closeModal();
  };
}

async function confirmDelete() {
  if (!selectedId) return;

  try {
    const response = await fetch(`/api/shoes/${selectedId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete on server");

    await fetchShoes(); 
    renderShoes(); 

  } catch (error) {
    console.error("Could not delete shoe:", error);
    showModal("Не вдалося видалити.");
  } finally {
    closeModal();
  }
}

function showConfirmModal() {
  confirmMessage.textContent = "You shoure wanna del?";
  confirmYes.style.display = 'inline-block';
  confirmNo.style.display = 'inline-block';
  confirmModal.style.display = "block";
}

function showModal(message) { 
  confirmMessage.textContent = message;
  confirmYes.style.display = 'none';
  confirmNo.style.display = 'none';
  confirmModal.style.display = "block";
}

function closeModal() {
  confirmModal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", initializeView);


let sortDirections = {
  producer: null,
  price: null,
  size: null,
  color: null,
};

function sortTable(columnIndex) {
  const fields = ['id', 'producer', 'price', 'size', 'color'];
  const fieldName = fields[columnIndex];
  if (!fieldName) return;
  
  const isNumeric = (fieldName === 'price' || fieldName === 'size');
  
  let direction = sortDirections[fieldName] === 'asc' ? 'desc' : 'asc';
  sortDirections[fieldName] = direction;

  for (let key in sortDirections) {
    if (key !== fieldName) sortDirections[key] = null;
  }

  globalShoesList.sort((a, b) => {
    const valA = a[fieldName];
    const valB = b[fieldName];
    
    let comparison = 0;
    if (isNumeric) {
      comparison = valA - valB;
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
  
  renderShoes();
}

window.sortTable = sortTable;