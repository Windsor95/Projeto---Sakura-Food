// Fake API...................................................................

let platesInfo = [
  {
    id: "1",
    image: "./img/img01.jpg",
    title: "Hot roll",
    price: 35.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "2",
    image: "./img/img02.jpg",
    title: "Nigiri",
    price: 25.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "3",
    image: "./img/img03.jpg",
    title: "Temaki",
    price: 35.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "4",
    image: "./img/img04.jpg",
    title: "Uramaki",
    price: 30.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "5",
    image: "./img/img05.jpg",
    title: "Makizushi",
    price: 40.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "6",
    image: "./img/img06.jpg",
    title: "Yakisoba",
    price: 15.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "7",
    image: "./img/img07.jpg",
    title: "Oden",
    price: 49.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "8",
    image: "./img/img08.jpg",
    title: "Takoyaki",
    price: 25.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "9",
    image: "./img/img09.jpg",
    title: "Yaki Udon",
    price: 29.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "10",
    image: "./img/img10.jpg",
    title: "Taiyaki",
    price: 15.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "11",
    image: "./img/img11.jpg",
    title: "Wagashi",
    price: 9.99,
    icon: "./img/addCart.svg",
  },
  {
    id: "12",
    image: "./img/img12.jpg",
    title: "Dango",
    price: 15.99,
    icon: "./img/addCart.svg",
  },
];

// Create cards...............................................................

function createCardPlate(ev) {
  // acessando valor do array

  platesInfo.forEach((item) => {
    const { id, image, title, price, icon } = item;

    // criando os cards  dos pratos

    const menuCards = document.querySelector(".js-menu-cards");
    let divMenu = document.createElement("div");
    divMenu.classList = "card-box js-card-box";
    menuCards.appendChild(divMenu);

    let imgCard = document.createElement("img");
    imgCard.classList = "img-card";
    imgCard.setAttribute("src", image);
    divMenu.appendChild(imgCard);

    let boxInfo = document.createElement("div");
    boxInfo.classList = "box-info-value";
    divMenu.appendChild(boxInfo);

    let infoValueAdd = document.createElement("div");
    infoValueAdd.classList = "info-value-add";
    boxInfo.appendChild(infoValueAdd);

    let titleName = document.createElement("h3");
    titleName.classList = "title-name";
    titleName.textContent = title;
    infoValueAdd.appendChild(titleName);

    let priceValue = document.createElement("p");
    priceValue.classList = "price-value";
    priceValue.textContent = `$${price}`;
    infoValueAdd.appendChild(priceValue);

    let btnCardBox = document.createElement("button");
    btnCardBox.classList = "btn-add-cart js-btn-add-cart";
    btnCardBox.setAttribute("onclick", "addCartItem(event)");
    infoValueAdd.appendChild(btnCardBox);

    let btnImgCart = document.createElement("img");
    btnImgCart.setAttribute("src", icon);
    btnCardBox.appendChild(btnImgCart);
  });
}

createCardPlate();

// Add plates to cart.........................................................

const dropdownCartPai = document.querySelector(".js-dropdown-items");

function addCartItem(event) {
  const btnClick = event.target;

  const pai = btnClick.parentElement.parentElement.parentElement.parentElement;
  const imageCreate = pai.querySelector(".img-card").src;
  const titleCreate = pai.querySelector(".title-name").innerText;
  const priceCreate = pai.querySelector(".price-value").innerText;

  // var para armazenar com valor nulo........................................

  let itemCart = null;

  const items = document.querySelectorAll(".js-item-box");

  // verificação do Nome....................................................

  for (let i = 0; i < items.length; i++) {
    const titleElement = items[i].querySelector(".title-name-drop");
    const title = titleElement.textContent;
    if (title === titleCreate) {
      itemCart = items[i];
      break;
    }
  }

  if (itemCart === null) {
    // fluxo padrão
    itemCart = document.createElement("div");
    itemCart.classList = "item-box js-item-box";
    dropdownCartPai.appendChild(itemCart);

    const imageBoxDropdown = document.createElement("div");
    imageBoxDropdown.classList = "img-box-dd";
    itemCart.appendChild(imageBoxDropdown);

    let removeItemBox = document.createElement("button");
    removeItemBox.classList = "btn-remove";
    imageBoxDropdown.appendChild(removeItemBox);

    removeItemBox.textContent = "Remove";

    const imageDropdown = document.createElement("img");
    imageDropdown.setAttribute("src", imageCreate);
    imageBoxDropdown.appendChild(imageDropdown);

    const titleNameDropdown = document.createElement("h2");
    titleNameDropdown.classList = "title-name-drop";
    titleNameDropdown.textContent = titleCreate;
    itemCart.appendChild(titleNameDropdown);

    const priceDropdown = document.createElement("h3");
    priceDropdown.classList = "dropdown-value";
    priceDropdown.textContent = priceCreate;
    itemCart.appendChild(priceDropdown);

    const inputDropdown = document.createElement("input");
    inputDropdown.classList = "input-amount";
    inputDropdown.setAttribute("type", "number");
    inputDropdown.setAttribute("name", "amount");
    inputDropdown.setAttribute("value", "1");
    itemCart.appendChild(inputDropdown);
  } else {
    // Inserir valor ao input caso já exista o nome...................

    const inputDropdown = itemCart.querySelector(".input-amount");
    let quantity = parseInt(inputDropdown.value) + 1;
    inputDropdown.value = quantity;
  }

  const inputDropdown = itemCart.querySelector(".input-amount");
  inputDropdown.addEventListener("input", updateCounterNumber);

  const inputDropdownvalue = itemCart.querySelector(".input-amount");
  inputDropdownvalue.addEventListener("input", removeItem0);

  updateCounterNumber();

  selectBtnRemove();

  removeItem0();

  swal("Item added to cart!", "Complete order or continue shopping");
}

// Counter and value calculation..........................................

function updateCounterNumber() {
  const inputs = document.querySelectorAll(".input-amount");
  let total = 0;
  for (let i = 0; i < inputs.length; i++) {
    total += parseInt(inputs[i].value);
    const boxes = document.querySelectorAll(".js-item-box");
    let totalPrice = 0;
    for (let i = 0; i < boxes.length; i++) {
      const priceElement = boxes[i].querySelector(".dropdown-value");
      const price = parseFloat(priceElement.textContent.replace("$", ""));
      const inputElement = boxes[i].querySelector(".input-amount");
      const quantity = parseInt(inputElement.value);
      const itemTotalPrice = price * quantity;
      totalPrice += parseFloat(itemTotalPrice.toFixed(2));

      const displayTotalPrice = document.querySelector(".dropdown-right h3");

      displayTotalPrice.textContent = `Total $${totalPrice.toFixed(2)}`;
    }
  }
  const counterNumber = document.querySelector(".js-cart-count p");
  counterNumber.textContent = total;
}

// Select remove................................................

function selectBtnRemove(event) {
  const selectItem = document.querySelectorAll(".btn-remove");
  for (let i = 0; i < selectItem.length; i++) {
    const removePai = selectItem[i].parentElement.parentElement;
    selectItem[i].addEventListener("click", removeItemDropdown);
  }
}

// Remove Item...................................................

function removeItemDropdown(event) {
  event.target.parentElement.parentElement.remove();
  updateCounterNumber();
  const boxesDelete = document.querySelectorAll(".js-item-box");
  if (boxesDelete.length == 0) {
    const displayTotalPrice = document.querySelector(".dropdown-right h3");
    displayTotalPrice.textContent = `Total $ 0`;
  }
}

function removeItem0(event) {
  const inputvalue = document.querySelectorAll(".input-amount");

  for (let i = 0; i < inputvalue.length; i++) {
    const boxesDelete = document.querySelectorAll(".js-item-box");
    for (let i = 0; i < boxesDelete.length; i++) {
      if (inputvalue[i].value <= 0) {
        boxesDelete[i].remove();
        if (boxesDelete[i] == 0) {
          const counterNumber = document.querySelector(".js-cart-count p");
          counterNumber.textContent = 0;
        }
      }
    }
  }
}

//Sending information............................................

const btnSubmitRequest = document.querySelector(".btn-submit");
const dropdownInfo = document.querySelector(".js-dropdown-info");

function submitBtn(event) {
  event.preventDefault;

  const boxesDelete = document.querySelectorAll(".js-item-box");
  if (boxesDelete.length == 0) {
    alert(`There are no items in your shopping cart! 🛒`);
  } else {
    const novoArray = [];
    const boxes11 = document.querySelectorAll(".js-item-box");

    for (let i = 0; i < boxes11.length; i++) {
      const quantityElement = boxes11[i].querySelector(".input-amount");
      const quantitylll = parseInt(quantityElement.value);

      const nameElement =
        boxes11[i].querySelector(".title-name-drop").innerText;
      const nomeCorreto = nameElement;
      const priceElement =
        boxes11[i].querySelector(".dropdown-value").innerText;
      const valorTotal =
        parseFloat(priceElement.replace("$", "")) * quantitylll;
      const result = `${quantitylll} - ${nomeCorreto} - $${valorTotal.toFixed(
        2
      )}`;

      novoArray.push(result);
    }

    const displayTotalPrice =
      document.querySelector(".dropdown-right h3").innerText;
    const resume = novoArray.toString().replaceAll(",", "\n");

    swal("Summary", `${resume}\n \n${displayTotalPrice}`);

    let imgCartAlt = document.querySelector(".img-right-dropdown img");

    if (
      imgCartAlt.src == "./img/dpd-img01.png" ||
      "http://127.0.0.1:5500/img/dpd-img01.png"
    ) {
      imgCartAlt.setAttribute("src", "./img/dpd-img02.png");
    } else {
      imgCartAlt.setAttribute("src", "./img/dpd-img01.png");
    }

    // Abrir cadastro.................................................

    dropdownInfo.classList.add("active");
  }
}

btnSubmitRequest.addEventListener("click", submitBtn);

// Register.......................................................

const nomCadastro = document.querySelector(".js-nome-cadastro");
const telCadastro = document.querySelector(".js-tel-cadastro");
const emaCadastro = document.querySelector(".js-email-cadastro");
const cepCadastro = document.querySelector(".js-cep-cadastro");
const cidCadastro = document.querySelector(".js-cid-cadastro");
const endCadastro = document.querySelector(".js-end-cadastro");
const numCadastro = document.querySelector(".js-num-cadastro");
const obsCadastro = document.querySelector(".js-obs-cadastro");

const btnInfoDropdown = document.querySelector(".js-btn-dropdown-info");

function coletarInfos() {
  console.log(nomCadastro.value);
  console.log(telCadastro.value);
  console.log(emaCadastro.value);
  console.log(cepCadastro.value);
  console.log(cidCadastro.value);
  console.log(endCadastro.value);
  console.log(numCadastro.value);
  console.log(obsCadastro.value);

  if (
    nomCadastro.value.length == 0 ||
    telCadastro.value.length == 0 ||
    emaCadastro.value.length == 0 ||
    cepCadastro.value.length == 0 ||
    cidCadastro.value.length == 0 ||
    endCadastro.value.length == 0 ||
    numCadastro.value.length == 0
  ) {
    alert("Fill in all fields");
  } else {
    let imgCadAlt = document.querySelector(".dropdown-left-info img");
    if (
      imgCadAlt.src == "./img/submit-img01.png" ||
      "http://127.0.0.1:5500/img/submit-img01.png"
    ) {
      imgCadAlt.setAttribute("src", "./img/submit-img02.png");
    } else {
      imgCadAlt.setAttribute("src", "./img/dpd-img01.png");
    }
    dropdownInfo.classList.remove("active");
    dropdownCart.classList.remove("active");

    // Reset.......................................................

    const boxes12 = document.querySelectorAll(".js-item-box");
    for (let i = 0; i < boxes12.length; i++) {
      boxes12[i].remove();
      const counterNumber = document.querySelector(".js-cart-count p");

      if (boxes12[i] == 0) {
        counterNumber.textContent = 0;
      }
    }
    const displayTotalPrice = document.querySelector(".dropdown-right h3");

    displayTotalPrice.textContent = "Total $ 0.00";

    // Validation............................................................

    alert(`${nomCadastro.value} Your order has been successfully placed!!! 🎉`);

    updateCounterNumber();
  }
}

btnInfoDropdown.addEventListener("click", coletarInfos);

// Open Cart and Close................................................

const openCart = document.querySelector(".js-btn-cart-box");
const dropdownCart = document.querySelector(".js-dropdown-cart");

function openCartDetail(ev) {
  ev.preventDefault();

  dropdownCart.classList.toggle("active");
}

openCart.addEventListener("click", openCartDetail);
