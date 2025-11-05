if (!localStorage.getItem("shoesList")) {
  shoesList = [
    { producer: "Nike", price: 2500, size: 42, color: "black" },
    { producer: "Adidas", price: 2200, size: 41, color: "white" },
    { producer: "Puma", price: 1800, size: 43, color: "green" },
    { producer: "Reebok", price: 2000, size: 44, color: "blue" },
    { producer: "Under Armour", price: 2700, size: 45, color: "red" },
    { producer: "New Balance", price: 2300, size: 42, color: "black" },
    { producer: "Converse", price: 1600, size: 40, color: "white" },
    { producer: "Vans", price: 1900, size: 41, color: "gray" },
    { producer: "Asics", price: 2100, size: 43, color: "blue" },
    { producer: "Fila", price: 1700, size: 42, color: "red" },
    { producer: "Skechers", price: 2400, size: 44, color: "black" },
    { producer: "Mizuno", price: 2600, size: 45, color: "green" },
    { producer: "Brooks", price: 2500, size: 42, color: "white" }
  ];
  localStorage.setItem("shoesList", JSON.stringify(shoesList));
}
