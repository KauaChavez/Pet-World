document.addEventListener('DOMContentLoaded', function () {
  function displayContainerProduct() {
    const btnBack = document.querySelector('.btnBack');

    btnBack.addEventListener('click', () => {
      history.back();
    });
  }
  displayContainerProduct();

  function updateProductSelected() {
    const urlParams = new URLSearchParams(window.location.search);
    const productIdFromUrl = urlParams.get('id');

    if (productIdFromUrl !== null) {
      // Se houver um ID de produto na URL, use-o para obter os detalhes do produto
      const selectedProduct = productsList.find(
        (product) => product.id.toString() === productIdFromUrl,
      );

      if (selectedProduct) {
        // Atualiza a exibição com os detalhes do produto encontrado na URL
        document.querySelector('.product-selected-name span').innerHTML =
          selectedProduct.name;
        document.querySelector('.product-selected-img img').src =
          selectedProduct.img;
        document.querySelector(
          '.product-selected-price span',
        ).innerHTML = `R$ ${selectedProduct.price}`;
        document.querySelector(
          '.product-selected-price-original span',
        ).innerHTML = `R$ ${selectedProduct.price_original}`;
        document.querySelector('.product-selected-description span').innerHTML =
          selectedProduct.description;
      } else {
        console.error('Produto não encontrado.');
      }
    } else {
      // Se não houver um ID de produto na URL, use o que está armazenado no localStorage
      const storedProduct = localStorage.getItem('selectedProduct');

      if (storedProduct) {
        const selectedProduct = JSON.parse(storedProduct);

        document.querySelector('.product-selected-name span').innerHTML =
          selectedProduct.name;
        document.querySelector('.product-selected-img img').src =
          selectedProduct.img;
        document.querySelector(
          '.product-selected-price span',
        ).innerHTML = `R$ ${selectedProduct.price}`;
        document.querySelector(
          '.product-selected-price-original span',
        ).innerHTML = `R$ ${selectedProduct.price_original}`;
        document.querySelector('.product-selected-description span').innerHTML =
          selectedProduct.description;
      } else {
        console.error('Nenhum produto selecionado.');
      }
    }
  }
  updateProductSelected();

  function calcularTempoRestante() {
    // Data alvo: 24 de novembro de 2023 às 23h59
    const dataAlvo = new Date('2024-11-23T23:59:59');

    // Data atual
    const agora = new Date();

    // Calcula a diferença em milissegundos entre as datas
    const diferenca = dataAlvo - agora;

    // Calcula dias, horas, minutos e segundos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Retorna um objeto com os valores calculados
    return {
      dias,
      horas,
      minutos,
      segundos,
    };
  }

  function atualizarTempoRestante() {
    const tempoRestante = calcularTempoRestante();
    const elementoTempoRestante = document.getElementById('timer-blackfriday');

    // Atualiza o conteúdo do elemento HTML
    elementoTempoRestante.textContent = `${tempoRestante.dias}D ${tempoRestante.horas}h ${tempoRestante.minutos}min ${tempoRestante.segundos}s`;
  }

  // Atualiza o tempo restante a cada segundo
  setInterval(atualizarTempoRestante, 1);
});
