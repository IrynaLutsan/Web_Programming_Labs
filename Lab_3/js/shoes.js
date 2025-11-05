class shose {
    constructor(producer, price, size, color) {
      this.producer = producer;
      this.price = price;
      this.size = size;
      this.color = color;
    }
  
    info() {
      return `${this.producer}, size ${this.size}, color ${this.color}, price: ${this.price} grn`;
    }
  }

  const shoesList = [
    new shose("Nike", 2500, 42, "black"),
    new shose("Adidas", 2200, 41, "white"),
    new shose("Puma", 1800, 43, "green"),
    new shose("Reebok", 2000, 44, "blue"),
    new shose("Under Armour", 2700, 45, "red"),
    new shose("New Balance", 2300, 42, "black"),
    new shose("Converse", 1600, 40, "white"),
    new shose("Vans", 1900, 41, "gray"),
    new shose("Asics", 2100, 43, "blue"),
    new shose("Fila", 1700, 42, "red"),
    new shose("Skechers", 2400, 44, "black"),
    new shose("Mizuno", 2600, 45, "green"),
    new shose("Brooks", 2500, 42, "white")
  ];
  

  shoesList.forEach(shoe => {
    console.log(shoe.info());
  });