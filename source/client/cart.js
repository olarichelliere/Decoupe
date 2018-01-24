
function addToCart(event){
    event.preventDefault();

    var piece = document.getElementById("piece_name").innerHTML;
    var quantity = parseInt(document.getElementById("quantity").innerHTML,10);
    var thickness_id = parseInt(document.getElementById("thicknessOption").innerHTML,10);
    var material_id = parseInt(document.getElementById("materielOption").innerHTML,10);
    var dim_x = parseInt(document.getElementById("dim_x").innerHTML,10);
    var dim_y = parseInt(document.getElementById("dim_y").innerHTML,10);
    var material_weight = parseInt(document.getElementById("weight").innerHTML,10);
    var material_sf = parseInt(document.getElementById("area").innerHTML,10);
    //var scrap = parseInt(document.getElementById("single_item_id").innerHTML,10);
    var material_weight_ref = parseInt(document.getElementById("matl_weight").innerHTML,10);
    var material_price = parseInt(document.getElementById("matl_weight").innerHTML,10);
    var material_price = parseInt(document.getElementById("matl_weight").innerHTML,10);

    //var quantity = document.getElementById("new_item_quantity").value;
   

    var data = {
        piece:          piece,
        quantity:       quantity,
        thickness_id:   thickness_id,
        material_id:    material_id,
        dim_x:          dim_x,
        dim_y:          dim_y,
        material_weight: material_weight,
        material_sf:    material_sf,
        scrap:          scrap,
        material_weight_ref: material_weight_ref,
        material_price:     material_price,
        decoupe_price:      decoupe_price
    }
    console.log(data);

    httpRequest('POST', '/cart/', data, function (newRecord) {
        console.log('Successful added to cart', newRecord);
        showCart();
    });
}

function showCart(event){
    //event.preventDefault(); 
     
    hideAllSections();

    document.getElementById('cart_container').style.display = "inline-table";

    var htmlContainer = document.getElementById('cart_detail');
    htmlContainer.innerHTML = 'My Cart';

    httpRequest('GET', '/cart/', undefined, function (data) {
        for (var i = 0; i < data['items'].length; i++) {
            var item = data['items'][i];
            htmlContainer.innerHTML += 
                `<div class="cart_box">
                    <div class="thumbnail"><img src="${baseURL}/../images/${item['image']}"/></div>   
                    <div class="title">Quantity: ${item['quantity']}</div>
                    <div class="name">${item['name']}</div>
                    <div class="price">$${item['price']}</div>
            </div>`;
        }    
        htmlContainer.innerHTML += `<div id="totalAmount" class="total">${data['total']}</div>`;   
    });
}

function createOrder(total){
   event.preventDefault();

    var data = {
        totalPrice: total
    }

    httpRequest('POST', '/order/', data, function () {
        console.log('Successful creation of new order');
    });
}

