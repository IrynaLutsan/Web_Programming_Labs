function displayShoes() {
  const tableBody = document.querySelector("#shoesTable tbody");
  tableBody.innerHTML = "";

  shoesList.forEach(shoe => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${shoe.producer}</td>
      <td>${shoe.price}</td>
      <td>${shoe.size}</td>
      <td>${shoe.color}</td>
    `;
    tableBody.appendChild(row);
  });

  calculateTotal();
}

function sortTable(columnIndex) {
  const tableBody = document.querySelector("#shoesTable tbody");
  const rows = Array.from(tableBody.rows);
  const isNumeric = columnIndex === 1 || columnIndex === 2;

  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent.trim();
    const cellB = b.cells[columnIndex].textContent.trim();
    if (isNumeric) {
      return parseFloat(cellA) - parseFloat(cellB);
    } else {
      return cellA.localeCompare(cellB);
    }
  });

  rows.forEach(row => tableBody.appendChild(row));

  calculateTotal();
}

function filterTable() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#shoesTable tbody tr");

  rows.forEach(row => {
    const cells = Array.from(row.cells);
    const matches = cells.some(cell => cell.textContent.toLowerCase().includes(query));
    row.style.display = matches ? "" : "none";
  });

  calculateTotal();
}

function calculateTotal() {
  const rows = document.querySelectorAll("#shoesTable tbody tr");
  let total = 0;

  rows.forEach(row => {
    if (row.style.display !== "none") {
      const priceCell = row.cells[1].textContent.trim();
      total += parseFloat(priceCell) || 0;
    }
  });

  document.getElementById("totalPrice").textContent = `Total price: ${total} grn`;
}

window.addEventListener("DOMContentLoaded", () => {
  displayShoes();

  document.getElementById("searchInput").addEventListener("input", filterTable);
});