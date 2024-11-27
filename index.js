

const addItemsForProduct = async (productData) => {
    productData.map(item => {
      const productHtml = `
        <div class="bg-[#F5F5F5] w-[270px] h-[350px] object-cover object-contain rounded-lg shadow-md relative group">
          <img class="w-full h-[250px] object-cover object-contain rounded-t-lg" src="${item.gallery[0]}" alt="">
          <h3 class="font-medium text-base mt-4">${item.title}</h3>
          <p class="font-medium text-base text-[#DB4444] mt-2">${item.currency}${item.price}</p>
          <button class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[150px] h-[40px] bg-[#DB4444] text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add to Basket
          </button>
        </div>
      `;     
      $("#main").append(productHtml);
    });
  
  }

const getAllProducts = async() => {
    const response = await fetch("http://localhost:3000/api/products",{
        method:"GET",
        headers:{
            Accept: "application/json"
        }
    })
    const data = await response.json()
    console.log(data)
    addItemsForProduct(data.products)
}
getAllProducts()
$("#viewBtn").click((e) => {


})