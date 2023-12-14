document.addEventListener('DOMContentLoaded', function () {
  function cloneProducts() {
    const c = (el) => document.querySelector(el);

    let cartItems = {};

    productsList.map((item, index) => {
      let productList = c('.models-product').cloneNode(true);

      productList.querySelector('.product-image img').src = item.img;
      productList.querySelector('.product-name span').innerHTML = item.name;
      productList.querySelector(
        '.product-price span',
      ).innerHTML = `R$ ${item.price}`;
      productList.querySelector(
        '.product-price-original span',
      ).innerHTML = `R$ ${item.price_original}`;

      productList
        .querySelector('.product-addCart')
        .addEventListener('click', () => {
          addToCart(item.name, item.price, item.img);
        });

      productList
        .querySelector('.product-card')
        .setAttribute('data-index', index);

      c('.main-index .content-product').append(productList);
    });

    // Função para embaralhar um array usando o algoritmo de Fisher-Yates
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    // Crie uma cópia da lista original para a seção content-mostWanted
    const mostWantedList = [...productsList];
    shuffleArray(mostWantedList);

    // Mapeie a lista embaralhada e adicione os itens à seção content-mostWanted
    mostWantedList.map((item, index) => {
      let productList = c('.models-product').cloneNode(true);

      productList.querySelector('.product-image img').src = item.img;
      productList.querySelector('.product-name span').innerHTML = item.name;
      productList.querySelector(
        '.product-price span',
      ).innerHTML = `R$ ${item.price}`;
      productList.querySelector(
        '.product-price-original span',
      ).innerHTML = `R$ ${item.price_original}`;

      productList
        .querySelector('.product-addCart')
        .addEventListener('click', () => {
          addToCart(item.name, item.price, item.img);
        });

      productList
        .querySelector('.product-card')
        .setAttribute('data-index', index);

      c('.main-index .content-mostWanted').append(productList);
    });

    function addToCart(productName, productPrice, productImg) {
      const addSuccess = document.querySelector('.add-success');

      // Verifica se o produto já está no carrinho
      if (cartItems[productName]) {
        // Se sim, incrementa a quantidade
        cartItems[productName].quantity += 1;
        updateCartItem(productName);

        addSuccess.classList.toggle('active');
        setTimeout(function () {
          addSuccess.classList.remove('active');
        }, 3000);
      } else {
        // Se não, adiciona o produto ao carrinho
        cartItems[productName] = {
          quantity: 1,
          price: productPrice,
          img: productImg,
        };
        addSuccess.classList.toggle('active');
        setTimeout(function () {
          addSuccess.classList.remove('active');
        }, 3000);

        // Cria o elemento no carrinho
        createCartItem(productName, productPrice, productImg);
      }

      // Atualiza a exibição no carrinho
      updateCartView();

      // Salva no localStorage
      saveCartToLocalStorage();
    }

    // Função para salvar o carrinho no localStorage
    function saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    // Função para carregar o carrinho do localStorage ao carregar a página
    function loadCartFromLocalStorage() {
      const savedCartItems = localStorage.getItem('cartItems');
      if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);

        // Adicionar os itens do localStorage à exibição do carrinho
        Object.keys(cartItems).forEach((productName) => {
          createCartItem(
            productName,
            cartItems[productName].price,
            cartItems[productName].img,
          );
        });

        // Atualizar a exibição do carrinho após o carregamento
        updateCartView();
      }
    }

    // Chame a função para carregar o carrinho do localStorage ao carregar a página
    loadCartFromLocalStorage();

    function createCartItem(productName, productPrice, productImg) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.dataset.productName = productName;

      // Verifica se o produto já está no localStorage e carrega a quantidade
      if (cartItems[productName]) {
        cartItem.dataset.quantity = cartItems[productName].quantity;
      } else {
        cartItem.dataset.quantity = 1;
      }

      cartItem.innerHTML = `
        <img class="aside-cart-img" src="${productImg}" alt="">
        <div class="aside-cart-name-price">
            <span class="aside-cart-name">${productName}</span>
            <div class="aside-cart-qnt-price">
              <span class="aside-cart-price">Preço: R$ ${productPrice}</span>
              <div class="aside-cart-add-remove">
                <div class="remove">-</div>
                <span class="quantity">${cartItem.dataset.quantity}</span>
                <div class="add">+</div>
              </div>
          </div>
        </div>
      `;

      const addBtn = cartItem.querySelector('.add');
      const removeBtn = cartItem.querySelector('.remove');
      const quantityElement = cartItem.querySelector('.quantity');

      addBtn.addEventListener('click', () => {
        cartItems[productName].quantity += 1;
        quantityElement.textContent = `${cartItems[productName].quantity}`;
        updateCartView();
        saveCartToLocalStorage();
      });

      removeBtn.addEventListener('click', () => {
        if (cartItems[productName].quantity > 1) {
          cartItems[productName].quantity -= 1;
          quantityElement.textContent = `${cartItems[productName].quantity}`;
        } else {
          delete cartItems[productName];
          cartItem.remove();
        }
        updateCartView();
        saveCartToLocalStorage();
      });

      document.querySelector('.content-cart').appendChild(cartItem);

      updateCartView();
    }

    function updateTotalPrice() {
      const totalPriceElement = document.querySelector('.total-price-cart');

      // Calcula o preço total somando os preços de todos os itens no carrinho
      const totalPrice = Object.values(cartItems).reduce(
        (total, item) =>
          total +
          item.quantity * Number(item.price.replace('.', '').replace(',', '.')),
        0,
      );

      // Formata o preço total com separadores de milhar e duas casas decimais
      const formattedTotalPrice = totalPrice.toLocaleString('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      // Exibe o preço total formatado no elemento correspondente
      totalPriceElement.innerText = `Total: R$ ${formattedTotalPrice}`;

      // Exibe ou oculta o elemento do preço total com base na existência de itens no carrinho
      totalPriceElement.style.display =
        Object.keys(cartItems).length > 0 ? 'block' : 'flex';
    }

    function updateCartItem(productName) {
      const cartItem = document.querySelector(
        `.cart-item[data-product-name="${productName}"]`,
      );
      const quantityElement = cartItem.querySelector('.quantity');
      cartItem.dataset.quantity += 1;
      quantityElement.textContent = `${cartItems[productName].quantity}`;
    }

    function updateCartView() {
      // Atualiza a exibição do número total de produtos no carrinho
      const totalQuantity = Object.values(cartItems).reduce(
        (total, item) => total + item.quantity,
        0,
      );
      document.querySelector('.cart-total').innerText = `${totalQuantity}`;
      document.querySelector('.cart-total').style.display = 'flex';
      if (totalQuantity >= 1) {
        document.querySelector('.text-cart').style.display = 'none';
      } else {
        document.querySelector('.text-cart').style.display = 'flex';
      }

      updateTotalPrice();
    }
  }
  cloneProducts();

  function displayContainerProduct() {
    const btnProduct = document.querySelectorAll('.product-card');

    btnProduct.forEach((btn, index) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();

        const selectedProductIndex = btn.getAttribute('data-index');
        const selectedProduct = productsList[selectedProductIndex];

        // Armazena o produto selecionado em localStorage
        localStorage.setItem(
          'selectedProduct',
          JSON.stringify(selectedProduct),
        );

        const productUrl = `produto.html?id=${
          selectedProduct.id
        }&name=${encodeURIComponent(selectedProduct.name)}&price=${
          selectedProduct.price
        }`;

        // Redireciona para produto.html
        window.location.href = productUrl;
      });
    });
  }
  displayContainerProduct();
});
