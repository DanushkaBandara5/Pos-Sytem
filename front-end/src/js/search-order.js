

const tbodyElm =$("#tbl-search-order tbody");
const tfootElm =$("#tbl-search-order tfoot");
const searchElm =$("#txt-search");
const REST_API_URL='http://localhost:8080/pos';
loadData();

searchElm.on('input',()=>{
    loadData();
})

function loadData(){
    const xhr =new XMLHttpRequest();
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState===4){
            if(xhr.status===200){
                const orderList =JSON.parse(xhr.responseText);
                console.log(orderList)
                tbodyElm.empty();
                if(orderList.length===0){
                    tfootElm.show();
                    return;
                }
                tfootElm.hide();
                orderList.forEach(orderDetails=>{
                    const trElm =$('<tr></tr>')
                    trElm.append(` <td class="text-center">${orderDetails.orderId}</td>
                                    <td>${formateDate(orderDetails.orderDate)}</td>
                                    <td class="d-none d-xl-table-cell">${orderDetails.customerId??'Walk-in-Customer'}</td>
                                    <td class="contact text-center">${orderDetails.customerName??'Walk-in-Customer'}</td>
                                    <td>${orderDetails.orderTotal}</td>`);
                    tbodyElm.append(trElm);

                });

            }else{
                tbodyElm.empty();
                tfootElm.show();

            }
        }
    });
    xhr.open('GET',`${REST_API_URL}/api/v1/orders?q=${searchElm.val().trim()}`);
    xhr.send();
}
function formateDate(dateTime){
    let result='';
    for (let i = 0; i < 3; i++) {
        result+=formatNumber(dateTime[i])+"-";

    }
    result=result.substring(0,result.length-1);
    result+=" ";
    for (let i = 3; i < dateTime.length; i++) {
        result+=formatNumber(dateTime[i])+":";

    }
    if(dateTime.length===5) return result.concat("00");
    return result.substring(0,result.length-1);

}
function formatNumber(number){
    if(number<10){
        return "0"+number;
    }
    else return number;

}
