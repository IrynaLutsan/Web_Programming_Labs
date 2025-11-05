export class Shoe {
  constructor(data) {
    this.id = data.id;
    this.producer = data.producer;
    this.price = data.price;
    this.size = data.size;
    this.color = data.color;
  }

  /**
   * Checks if the shoe matches a filter query.
   * @param {string} query - The search string.
   * @returns {boolean} - True if it matches, false otherwise.
   */
  matchesFilter(query) {
    if (!query) return true; // Empty query matches everything
    
    const lowerQuery = query.toLowerCase();
    
    return (
      this.producer.toLowerCase().includes(lowerQuery) ||
      String(this.price).includes(lowerQuery) ||
      String(this.size).includes(lowerQuery) ||
      this.color.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Creates and returns a <tr> HTML element for this shoe.
   * @param {function(number)} onSelect - Callback function to run when this row's radio is selected.
   * @returns {HTMLTableRowElement}
   */
  renderAsRow(onSelect) {
    const row = document.createElement("tr");

    const cellSelect = document.createElement("td");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "selectedShoe";
    radio.value = this.id;
    radio.addEventListener("change", () => {
      if (radio.checked) {
        onSelect(this.id);
      }
    });
    cellSelect.appendChild(radio);
    row.appendChild(cellSelect);

    row.appendChild(this.createCell(this.producer));
    row.appendChild(this.createCell(this.price));
    row.appendChild(this.createCell(this.size));
    row.appendChild(this.createCell(this.color));

    return row;
  }

  /**
   * Helper function to create a <td> element.
   * @param {string | number} text - The content for the cell.
   * @returns {HTMLTableCellElement}
   */
  createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  }
}