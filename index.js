$("#user-icon").click((e) => {
  e.stopPropagation();
  $("#dropdown-menu").toggleClass("hidden");
});

$("#dropdown-menu #manageMyAccount").click((e) => {
  checkLogin()
});

$("#dropdown-menu #logOut").click((e) => {
  window.location.href = "login.html"
})

$("#basket-shopping").click((e) => {
  ClearCookies()
  window.location.href = "basket.html"
})

$("#viewBtn").click((e) => {
  $("#main").addClass("h-full");
  setPage(2);
  viewBtn.disabled = true
});

$("#arrowUp").click((e) => {
  $('html, body').animate({ scrollTop: 0 }, 'fast');
})

$(document).on('click', '#addToBasket', (e) => {
  addToBasket()
})
const LoginPost = async () => {
  const response = await fetch("http://localhost:3000/api/auth/login ", {
    method: "POST",
    headers: {
      "Content-Type": `application/json`,
      "Accept": "application/json"
    },
    body: JSON.stringify({
      email: String,
      password: String
    })
  })
  const data = await response.json()
}

const checkLogin = () => {
  const cookies = document.cookie.split('; ')
  const accessToken = cookies.find(cookie => cookie.startsWith('accessToken='))
  if (accessToken) {
    window.location.href = "edit.html"
  }
  else {
    window.location.href = "login.html"
  }
}
const ClearCookies = () => {
  Cookies.remove('accessToken', { path: '/' })
  alert("Deleted token")
}
const addItemsForProduct = async (productData) => {
  productData.map(item => {
    const productHtml = `
        <div class="bg-[#F5F5F5] w-[270px] h-[350px] object-cover object-contain rounded-lg shadow-md relative group">
          <img class="w-full h-[250px] object-scale-down object-cover object-contain rounded-t-lg" src="${item.gallery[0]}" alt="">
          <h3 class="font-medium text-base mt-4">${item.title}</h3>
          <p class="font-medium text-base text-[#DB4444] mt-2">${item.currency}${item.price}</p>
          <button id="addToBasket" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[150px] h-[40px] bg-[#DB4444] text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add to Basket
          </button>
        </div>
      `;
    $("#main").append(productHtml);
  });
}

const addToBasket = async () => {
  const response = await fetch("http://localhost:3000/api/baskets/add", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      productId: String,
      quantity: Number
    })
  })
  const data = await response.json()
}
const getAllProductForPageSize = async (itemCount) => {
  const response = await fetch(`http://localhost:3000/api/products?pageSize=${itemCount}}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  const data = await response.json()
  console.log(data)
  addItemsForProduct(data.products)
}

const setPage = async (pageNumber) => {
  const response = await fetch(`http://localhost:3000/api/products?page=${pageNumber}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  const data = await response.json()
  console.log(data)
  addItemsForProduct(data.products)
}
const getAllProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  const data = await response.json()
  addItemsForProduct(data.products)
}
getAllProducts()

