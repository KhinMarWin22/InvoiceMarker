
// for product Array
const products = [
{
    id:1,
    name:"Blouse",
    price:16000,


},
{
    id:2,
    name:"Skirt",
    price:14000,
    

},
{
    id:1,
    name:"Jeans",
    price:20000,
    

}



];



// selector
const app = document.querySelector("#app");
const product = document.querySelector("#product");
const quantity = document.querySelector("#quantity");
const newRecord = document.querySelector("#newRecord");
const recordTotal = document.querySelector(".record-total");
const recordTax = document.querySelector(".record-tax");
const recordSubTotal = document.querySelector(".record-subtotal");
const Inventories = document.querySelector("#inventories");
const recordRows = document.querySelector("#record-rows");
const records = document.querySelector("#records");
const newItem = document.querySelector("#newItem");
const newItemName = document.querySelector("#newItemname");
const newItemPrice = document.querySelector("#newItemprice");







// step four calculate total so make total function
const CalculateTotal = ()=>{

  recordTotal.innerText=[...document.querySelectorAll(".record-cost")].reduce((pv,cv)=>
    pv+parseFloat(cv.innerText),0
  )
}
// step five calculate tax
const TaxCalculator = ()=>{

let percentage = 5;
const amount = parseFloat(recordTotal.innerText);
let taxcalc = (amount * percentage) / 100;
recordTax.innerText=taxcalc;


}
//step six calculate subtotal
const CalculateSubTotal = ()=>{
    const amount = parseFloat(recordTotal.innerText);
    const tax = parseFloat(recordTax.innerText);
    let subcalc = amount + tax;
    recordSubTotal.innerText =subcalc;
}



// step seven is to add item to the inventories from the select option item

const CreateItem = (productname,price)=>{

const div = document.createElement("div");
div.className="d-flex justify-content-between border border-primary p-3 mb-2";
div.innerHTML=`<p class="mb-0 item-name">${productname}</p>
<p class="mb-0 item-price text-secondary"> ${price}</p>`;
return div;




}
// second step is creating table row function after that we have to call that function in the newItem form submit

const createTableRow = (productID,quantity)=>{

    const currentProduct = products.find(el=>el.id==productID);
    let cost =currentProduct.price * quantity.valueAsNumber;
    const tableRow = document.createElement("tr");
    tableRow.classList.add("record-row","animate__animated","animate__fadeIn");
    // step eleven is not to add another record if productname is equal another product name so we need to do clear which product we add that why add atrribute

    tableRow.setAttribute("product-id",productID);
    tableRow.innerHTML=`<td class="row-count"></td>
    <td class="text-start record-product">${currentProduct.name}</td>
    <td class="text-end record-price">${currentProduct.price}</td>
    <td class="text-end">

<span>   
 <i class="bi bi-dash record-quantity-control record-quantity-decrement"></i>
</span>       
    <span class=" record-quantity "> ${quantity.valueAsNumber}</span>
    <span>
    <i class="bi bi-plus record-quantity-control record-quantity-increment"></i>
        </span>
    </td>
    <td class="text-end position-relative ">
    <span class="record-cost">${cost}</span>
    <button class="position-absolute record-row-del ">
<i class="bi bi-trash3"></i>
    </button>
    
    
    </td>`;


    // step thirteen is to add event to the plus icon to increase quantity

    const plusButton = tableRow.querySelector(".record-quantity-increment");
    plusButton.addEventListener("click",(el)=>{
        el.preventDefault();
        const recordQuantity = tableRow.querySelector(".record-quantity");
        let currentQuantity = parseFloat(recordQuantity.innerText);
        currentQuantity++;
        recordQuantity.innerText=currentQuantity;
        cost = currentProduct.price * currentQuantity;
        const recordCost = tableRow.querySelector(".record-cost");
        recordCost.innerText = cost;
        CalculateTotal(); 
        TaxCalculator();
        CalculateSubTotal();
    })

// step fourteen is to add event to the minus icon to decrese quantity

const MinusButton = tableRow.querySelector(".record-quantity-decrement");
MinusButton.addEventListener("click",(el)=>{
    el.preventDefault();
    const recordQuantity = tableRow.querySelector(".record-quantity");
    let currentQuantity = parseFloat(recordQuantity.innerText);
    if(currentQuantity > 1){
        currentQuantity--;
        recordQuantity.innerText=currentQuantity;
        cost = currentProduct.price * currentQuantity;
        const recordCost = tableRow.querySelector(".record-cost");
        recordCost.innerText = cost;
        CalculateTotal(); 
        TaxCalculator();
        CalculateSubTotal();


    }
})






// step ten is deleting row when I click trash icon so we need to do in the createtabel row

    tableRow.querySelector(".record-row-del").addEventListener("click",()=>{
       if(confirm("Are you sure to delete your record ?")){
           tableRow.classList.replace("animate__fadeIn","animate__fadeOut");
        tableRow.addEventListener("animationend",()=>{
            tableRow.remove();
            CalculateTotal(); 
    TaxCalculator();
    CalculateSubTotal();
        })
    
        

       }
    })
    return tableRow;

}


// first step generate option using web api option

products.forEach(el=>{

product.append(new Option(el.name,el.id));
// step eight is apppend from stepseven function to the geneate option loop to get item name and price
Inventories.append(CreateItem(el.name,el.price));





});

// third step is ADD record event
newRecord.addEventListener("submit",(e)=>{
e.preventDefault();

// step twelve is to think if product attributes and product.value is equal,we don't create another record
const isExicted = document.querySelector(`[product-id ='${product.value}']`);
if(isExicted){
let currentPrice = isExicted.querySelector(".record-price");
let currentQuantity = isExicted.querySelector(".record-quantity");
let currentCost = isExicted.querySelector(".record-cost");
const newQuantity =parseFloat(currentQuantity.innerText) + quantity.valueAsNumber;
const newCost = currentCost.innerText * newQuantity;
currentQuantity.innerText = newQuantity;
currentCost.innerText=newCost;





}else{

    recordRows.append(createTableRow(product.value,quantity));
}

CalculateTotal(); 
TaxCalculator();
CalculateSubTotal();
newRecord.reset();



})

// step nine is to add new item in the inventories after that that items are automatically add to the select option

newItem.addEventListener("submit",(el)=>{
    el.preventDefault();
    // firstly we need to update product array so push new object to that arrray
    // before push new obj we need to think about where should we push so we need to push last lenght
    const newId = [products.length - 1].id + 1;
    const newproductobj = {
        id:newId,

        name:newItemName.value,
        price:newItemPrice.valueAsNumber,
    };
    // don't forget to push that array to the original array
    products.push(newproductobj);
    newItem.reset();
// secondly we need to add that new object to option;
    product.append(new Option(newproductobj.name,newproductobj.id));
Inventories.append(CreateItem(newproductobj.name,newproductobj.price));


})


