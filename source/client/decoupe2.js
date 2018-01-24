function showDecoupe(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('decoupe_container');
    htmlContainer.style.display = "block";

    populateThickness();
    populateMaterial();

}


function filter(event,id){
    event.preventDefault();
    

    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items?categoryid='+id, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML += itemBox(item);
        }
    });
}


function populateDivisionList(){
    var htmlContainer = document.getElementById('division_select');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/division', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var division = data[i];
            htmlContainer.innerHTML += 
                `<option value="${division['id']}">${division["division"]}</option>`;
        }
    });
}


function deleteItem(event,id){
    event.preventDefault();
    httpRequest('DELETE', '/division/' + id , undefined, function () {
        console.log('Succesfully deleted item', id);
        showItems(event);
    });

}

function populateThickness(){

    var htmlContainer = document.getElementById('thicknessOption');
    httpRequest('GET', '/thickness', undefined, function (data) {
        htmlContainer.innerHTML = `<option value="" disabled selected >Select Thickness</option>`;
        for (var i = 0; i < data.length; i++) {
            var thk = data[i];
            htmlContainer.innerHTML +=
                `<option value=${thk["id"]}>${thk["thickness"]}</option>`;
        }
    });
}

function populateMaterial(){
    
    var htmlContainer = document.getElementById('materialOption');
    httpRequest('GET', '/material', undefined, function (data) {
        htmlContainer.innerHTML = `<option value="" disabled selected >Select Material</option>`;
        for (var i = 0; i < data.length; i++) {
            var matl = data[i];
            htmlContainer.innerHTML +=
                `<option value=${matl["id"]}>${matl["description"]}</option>`;
        }
    });
}

function calculatePrice(){
    var materialId = document.getElementById('materialOption').value;
    var thicknessId = document.getElementById('thicknessOption').value;
    var quantity = document.getElementById('quantity').value;
    var dimX = document.getElementById('dim_x').value;
    var dimY = document.getElementById('dim_y').value;
    var weight = document.getElementById("weight").value;
    var surfaceSQF = document.getElementById('area').value;

    //anwser
    var  htmlContainerMaterial = document.getElementById('matl_weight');
    var  htmlContainerDecoupe = document.getElementById('decoupe_price');
    var htmlContainerTotalUnit = document.getElementById('total_unit_price');
    var htmlContainerTotalAll = document.getElementById('total_all_price');

    httpRequest('GET', '/material/' + materialId, undefined, function (data) {
        httpRequest('GET', '/thickness/' + thicknessId, undefined, function (dataThk) {    
            var pricePerPound = data["price_per_pound"];
            var weightForPiece;
            var weightForThickness = data["pound_per_sqfoot"] * dataThk["thk_decimal"];
                
                if(surfaceSQF){
                    
                    weightForPiece = surfaceSQF * weightForThickness;

                }else if(dimX && dimY){

                    weightForPiece = dimX * dimY * weightForThickness / 144;

                }else if (weight){

                    weightForPiece = weight;
                
                }

                httpRequest('GET', '/special/1', undefined, function (dataSpecial) {
                    
                    var weightForPrice = (1 + (dataSpecial["scrap_pourcentage"] / 100)) * weightForPiece;
                    var materialPrice = weightForPrice * data['price_per_pound'];
                    var labourPrice = weightForPrice * data['cutting_fee_per_pound'];

                    htmlContainerMaterial.innerHTML = materialPrice.toFixed(2);
                    htmlContainerDecoupe.innerHTML =  labourPrice.toFixed(2);
                    htmlContainerTotalUnit.innerHTML = (materialPrice + labourPrice).toFixed(2);
                    htmlContainerTotalAll.innerHTML = (quantity * (materialPrice + labourPrice)).toFixed(2);

                });
        });       
    }); 
}

function disableInput(){

    var dimX = document.getElementById('dim_x');
    var dimY = document.getElementById('dim_y');
    var weight = document.getElementById("weight");
    var surfaceSQF = document.getElementById('area');


    surfaceSQF.disabled = false;
    dimX.disabled = false;
    dimY.disabled = false;
    weight.disabled = false;

    if (weight && weight.value){
        surfaceSQF.disabled = true;
        dimX.disabled = true;
        dimY.disabled = true;
    }else if(surfaceSQF && surfaceSQF.value){
        dimX.disabled = true;
        dimY.disabled = true;
        weight.disabled = true;
    }else if( (dimX && dimX.value) || (dimY && dimY.value) ){
        surfaceSQF.disabled = true;
        weight.disabled = true;

    }
}

function clearInput(inputToClear){
    var field = document.getElementById(inputToClear);
    field.value = "";

    disableInput();

    field.focus();
}


