
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

function populateCatList(){
    var htmlContainer = document.getElementById('new_item_category_select');
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/division', undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var division = data[i];
            htmlContainer.innerHTML += 
                `<option value="${division['id']}">${division["division"]}</option>`;
        }
    });
}

function itemBox(item){
    var itemDiv= `<div class="item_box">
                    <a href="#" onclick="showItem(event, ${item['id']})">
                        <div class="center"><img src="${baseURL}/../images/${item['image']}"/></div>
                        <div class="title">${item["name"]}</div>
                        <div class="description">${item["descriptionShort"]}</div>
                        <div class="price">$${item["price"]}</div>
                    </a>
                </div>`;
    return itemDiv;
}





function showNewItem(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('new_divisionData_container');
    htmlContainer.style.display = "block";

    document.getElementById("new_item_title").value = '';
    document.getElementById("new_item_descShort").value = '';
    document.getElementById("new_item_descLong").value = '';
    document.getElementById("new_item_colour").value = '';
    document.getElementById("new_item_price").value = '';
    document.getElementById("new_item_image").value = '';
    populateCatList();
}

function showUpdateItem(event,id) {
    event.preventDefault();
    
    hideAllSections();

    document.getElementById("update_item_title").value = '';
    document.getElementById("update_item_descShort").value = '';
    document.getElementById("update_item_descLong").value = '';
    document.getElementById("update_item_colour").value = '';
    document.getElementById("update_item_price").value = '';
    document.getElementById("update_item_imageView").value = '';

    var htmlContainer = document.getElementById('update_item_container');
    htmlContainer.style.display = "block";

    httpRequest('GET', '/items/' + id , undefined, function (data) {
        document.getElementById("update_item_title").value = data.name;
        document.getElementById("update_item_descShort").value = data.descriptionShort;
        document.getElementById("update_item_descLong").value = data.descriptionLong;
        document.getElementById("update_item_colour").value = data.colour;
        document.getElementById("update_item_price").value = data.price;
        document.getElementById("update_item_imageView").innerHTML = `<img src="${baseURL}/../images/${data.image}"/>`; 
        
        document.getElementById("update_btn").innerHTML=`<button class="createAdmin" onclick="UpdateItem(event,${data.id})">Update</button`;
        
    });
}

function UpdateItem(event,id){
    console.log(event);
    event.preventDefault();
    
    var title = document.getElementById("update_item_title").value;
    var descShort = document.getElementById("update_item_descShort").value;
    var descLong = document.getElementById("update_item_descLong").value;
    var price = document.getElementById("update_item_price").value;
    var colour = document.getElementById("update_item_colour").value;

    var file = document.getElementById("update_item_image").files[0];

    var data = {
        id: id,
        name: title,
        descriptionShort: descShort,
        descriptionLong: descLong,
        colour: colour,
        price: price
    }
    console.log(data);
    httpRequest('PUT', '/items/'+id, data, function (newRecord) {
        console.log('Successful updated of item', id);
        if(file){
            fileUploadItems(`/items/`+id+`/image`, file, function(){
                console.log('File uploaded successfully!');
                showItem(event, id);
            });
        }else{
            showItem(event, id);
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
//new
function createDivisionData(event){
    event.preventDefault();
    
    var divId = document.getElementById("new_divisionData_division").value;
    var period = document.getElementById("new_divisionData_refPeriod").value;
    var totalSales = document.getElementById("new_divisionData_totalSales").value;
    var grossMargin = document.getElementById("new_divisionData_grossMargin").value;
    var netProfit = document.getElementById("new_divisionData_netProfit").value;
    var inventory = document.getElementById("new_divisionData_inventory").value;
    var backlog = document.getElementById("new_divisionData_backlog").value;
    var orderBooked = document.getElementById("new_divisionData_orderBooked").value;
    var quote = document.getElementById("new_divisionData_quote").value;

    var data = {
        total_sales: totalSales,
        gross_margin: grossMargin,
        net_profit: netProfit,
        inventory: inventory,
        backlog: backlog,
        order_Booked: orderBooked,
        quote: quote
    }

    httpRequest('POST', '/data/', data, function (newRecord) {
        console.log('Successful creation of new data', newRecord);
        // todo post again in division data with newwreccord div id and period id
        var divisionData = {
            period_id: period,
            division_id: divId,
            data_id: newRecord.id
        }
        console.log('period id',period);
        console.log('division id',divId);
        console.log('divisionData id',newRecord.id);

        httpRequest('POST', '/divisiondata/', divisionData, function () {
            console.log('Successful creation of new divisiondata');
        });
    });
}
//new
function showNewDataDivision(event) {
    event.preventDefault();
    
    hideAllSections();

    var htmlContainer = document.getElementById('new_divisionData_container');
    htmlContainer.style.display = "block";

    document.getElementById("new_divisionData_division").value = '';
    document.getElementById("new_divisionData_refPeriod").value = '';
    document.getElementById("new_divisionData_totalSales").value = '';
    document.getElementById("new_divisionData_grossMargin").value = '';
    document.getElementById("new_divisionData_netProfit").value = '';
    document.getElementById("new_divisionData_inventory").value = '';
    document.getElementById("new_divisionData_backlog").value = '';
    document.getElementById("new_divisionData_orderBooked").value = '';

    populateDivisionsOption();
    populatePeriodOption();
}
//new
function populateDivisionsOption(){
    var htmlContainer = document.getElementById('new_divisionData_division');
    httpRequest('GET', '/division', undefined, function (data) {
        htmlContainer.innerHTML = `<option value="" disabled selected >Select Division</option>`;
        for (var i = 0; i < data.length; i++) {
            var divisions = data[i];
            htmlContainer.innerHTML +=
                `<option value=${divisions["id"]}>${divisions["division"]}</option>`;
        }
    });
}
//new
function populatePeriodOption(){
    //do a Get on divisions
    //populate list
    var htmlContainer = document.getElementById('new_divisionData_refPeriod');
    httpRequest('GET', '/period', undefined, function (data) {
        htmlContainer.innerHTML = `<option value="" disabled selected >Select Month</option>`;
        for (var i = 0; i < data.length; i++) {
            var periods = data[i];
            htmlContainer.innerHTML +=
                `<option value=${periods["id"]}>${periods["year"]}-${periods["month"]}</option>`;
        }
    });
}

function search(event){
    hideAllSections();

    document.getElementById('list_container').style.display = "inline-flex";
    
    populateCategoriesList(event);

    var htmlContainer = document.getElementById('list_items_container');
    var searchTXT=document.getElementById('searchItem').value;
    htmlContainer.innerHTML = '';

    httpRequest('GET', '/items?searchTXT='+searchTXT, undefined, function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            htmlContainer.innerHTML += itemBox(item);
        }
    });
}

function populatePeriod(){

    //do a Get on divisions
    //populate list
    var htmlContainer = document.getElementById('periodOption');
    httpRequest('GET', '/period', undefined, function (data) {
        htmlContainer.innerHTML = `<option value="" disabled selected >Select Month</option>`;
        for (var i = 0; i < data.length; i++) {
            var periods = data[i];
            htmlContainer.innerHTML +=
                `<option value=${periods["id"]}>${periods["year"]}-${periods["month"]} </option>`;
        }
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