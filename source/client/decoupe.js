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

function populateItemsList(event){
    var htmlContainer = document.getElementById('list_items_container');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items', undefined, function (data) {
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

    //do a Get on divisions
    //populate list
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
    
    //do a Get on divisions
    //populate list
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
    var linear = document.getElementById('linear').value;
    var defonce = document.getElementById('plonge').value;
    var surfaceSQF = document.getElementById('area').value;
    var quantity = document.getElementById('quantity').value;

    var  htmlContainerMaterial = document.getElementById('matl_weight');
    var  htmlContainerDecoupe = document.getElementById('decoupe_price');

    httpRequest('GET', '/rate?thickness_id='+thicknessId+'&material_id='+materialId, undefined, function (data) {
        htmlContainerMaterial.innerHTML = quantity * data["pound_per_sqfoot"] * data["price_per_pound"] * data["thk_decimal"] * surfaceSQF;  
        htmlContainerDecoupe.innerHTML = quantity * ((linear/data["feed_rate"]/60*250)+(defonce * data["defonce"] / 3600 * 250));
    }); 
}


function showDivisionDetailcontainer(event,id){
    document.getElementById('division_id').value=id;
    populatePeriod();
    //showDivisionDetail();
}

function showDivisionDashboard(){
    var htmlContainer = document.getElementById('single_division_container_detail');
}


//new
function showDivisionDetail(){
 
    var htmlContainer = document.getElementById('single_division_container_detail');
    var divisionId=document.getElementById('division_id').value;
    var periodId=document.getElementById('periodOption').value;

    //var periodId = document.getElementById("periodOption");
    //var periodIdSelected = periodId.options[periodId.selectedIndex].value;
    //var periodIdSelected = 1;
    
    //htmlContainer.style.display="inline-flex";

    httpRequest('GET', '/divisiondata/'+divisionId+'?periodId='+periodId, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
        
            var totalSales = parseInt(item['total_sales']);
            var grossMargin = parseInt(item['gross_margin']);
            var netProfit = parseInt(item['net_profit']);

            htmlContainer.innerHTML = 
                `<div class="singleDivisionDetail">
                    <div class="titleDiv">Division</div>` + 
                    createBars("totalSales",totalSales,totalSales,1) + 
                    createBars("grossMargin",grossMargin,totalSales,2) + 
                    createBars("netProfit",netProfit,totalSales,3) + 
                `</div>`;

        }
        var htmlContainerYTD = document.getElementById('single_division_container_detailYTD');
        //var date = new Date();
        //var year = date.getFullYear();
        var year = 2017;
       
        httpRequest('GET', '/data/'+divisionId+'?year='+year, undefined, function (item) {
            
                var totalSalesYTD = parseInt(item['total_salesYTD']);
                var grossMarginYTD = parseInt(item['gross_marginYTD']);
                var netProfitYTD = parseInt(item['net_profitYTD']);
    
                htmlContainerYTD.innerHTML = 
                    `<div id="singleDivisionYTD">
                        <div class="titleDiv">${year} YTD</div>` + 
                            createBars("totalSalesYTD",totalSalesYTD,totalSalesYTD,1) + 
                            createBars("grossMarginYTD",grossMarginYTD,totalSalesYTD,2) + 
                            createBars("netProfitYTD",netProfitYTD,totalSalesYTD,3) +
                    `</div>`;
                populateTrending(divisionId,year);
        });
    });
}

function createBars(description, currentValue, totalSales,location){

    var totalHeight = 250;
    var bottom = -100;
    var left = 110;
    var barHeight = Math.abs( (currentValue / totalSales ) * totalHeight );
    var barPourcentage = (currentValue / totalSales * 100 ).toPrecision(3);
    var barBottom;
    var valueBottom;
 
    if (barHeight < 80 && location == 3){

        if (currentValue > 0){
            barHeight = totalHeight / 7;
            barBottom = bottom;
            valueBottom = barBottom + barHeight;
        }else{
            barHeight = totalHeight / 3;
            barBottom = bottom - barHeight;
            valueBottom = barBottom;
        };
        
    }else if (barHeight < 80 && location == 2){
        
        if (currentValue > 0){
            barHeight = totalHeight / 3;
            barBottom = bottom;
            valueBottom = barBottom + barHeight;
        }else{
            barHeight = totalHeight / 7;
            barBottom = bottom - barHeight;
            valueBottom = barBottom;
        };
        
    }else{
        if (currentValue > 0){
            barBottom = bottom;
            valueBottom = barBottom + barHeight;
        }else{
            barBottom = bottom - barHeight;
            valueBottom = barBottom;
        };
        //valueBottom = barBottom + ( currentValue / totalSales * totalHeight );
    }
 
    var txtBottom = valueBottom - 15;

    if(location == 1){
        left = 60;
        width = 210;
    }
    else if(location == 2){
        left = 60+25;
        width = 210-25;
    }
    else if(location ==3){
        left = 60+50;
        width = 210-50;
    }



    HTMLbarCode = 
    `<div id="bar_${description}" class="bar" style="height:${barHeight}px; bottom:${barBottom}px"></div>
    <div id="bar_${description}Txt"  class="barTxt" style="height:20px; bottom:${txtBottom}px; left:${left}px; width:${width}px">${barPourcentage}% ${description}</div>
    <div id="bar_${description}Value"  class="barValue" style="height:30px; bottom:${valueBottom}px; left:${left}px; width:${width}px">${currentValue.toLocaleString('fr-CA')}</div>
    <div class="bar_Zero" style="bottom:${bottom}px"></div>
    <div style="position:relative; bottom:${valueBottom}"></div>
    `;

    return HTMLbarCode;
}

function populateTrending(divisionId,year){
    var htmlContainerYTD = document.getElementById('single_division_container_trending');
   
    httpRequest('GET', '/data/'+divisionId+'?year='+year, undefined, function (item) {
        
            var totalSalesYTD = parseInt(item['total_salesYTD']);
            var grossMarginYTD = parseInt(item['gross_marginYTD']);
            var netProfitYTD = parseInt(item['net_profitYTD']);

            htmlContainerYTD.innerHTML = 
                `<div id="singleDivisionYTD">
                    <div class="titleDiv">Trending ${year}</div>` + 
                        createBars("totalSalesYTD",totalSalesYTD,totalSalesYTD,1) + 
                        createBars("grossMarginYTD",grossMarginYTD,totalSalesYTD,2) + 
                        createBars("netProfitYTD",netProfitYTD,totalSalesYTD,3) +
                `</div>`;
            //populateTrending(divisionId,year);
    });
}

function showCategories(event) {
    //event.preventDefault();
    
    hideAllSections();
  

    document.getElementById('divisions_container').style.display="inline";

    var htmlContainer = document.getElementById('list_divisions_container');
    htmlContainer.innerHTML = '';
    //htmlContainer.style.display = "inline";
    
    httpRequest('GET', '/division', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            htmlContainer.innerHTML +=
                `<div class="category_box">
                    <a href="#" onclick="showDivisionDetailcontainer(event,${category['id']})">
                        <div class="title">${category["division"]}</div>
                    </a>
                </div>`;
        }
    });

}