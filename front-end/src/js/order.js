// import {formatNumber, formatPrice} from "./order";
import {Cart} from './cart.js'
import {DateTimeFormatter, LocalDateTime} from "@js-joda/core";
import Big from "big.js";

const WS_BASE_API_URL ='ws://localhost:8080/pos';
const REST_API_BASE_URL='http://localhost:8080/pos'
const customerNameElm=$("#customer-name");
const txtCustomer =$("#txt-customer");
const txtCode=$("#txt-code");
const itemInfoElm=$("#item-info");
const formOrderElm =$("#frm-order");
const txtQty =$("#txt-qty");
const tbodyElm = $("#tbl-order tbody");
const tFootElm = $("#tbl-order tfoot");
const netTotalElm=$("#net-total");
const orderDateTimeElm =$('#order-date-time');
const btnPlaceOrder=$('#btn-place-order');

let customer=null;
let item =null;
let cart = new Cart((total)=> netTotalElm.text(total));
loadData();
setInterval(setDateTime,1000);

let socket =null;
socket =new WebSocket(`${WS_BASE_API_URL}/api/v1/customers-ws`);

socket.addEventListener('message',(eventData)=>{
      customer =JSON.parse(eventData.data);
      cart.setCustomer(customer);
      console.log(eventData.data)
      customerNameElm.text(customer.name);
});
txtCustomer.on('input',()=>{
      findCustomer();
});
txtCustomer.on('blur', () => {
      if (txtCustomer.val() && !customer) {
            txtCustomer.addClass("is-invalid");
      }
});
txtCode.on('input',()=>{
      itemInfoElm.addClass('d-none');
      formOrderElm.addClass('d-none');
});
txtCode.on('change',()=>{
      findItems();
});

$("#btn-clear-customer").on('click',()=>{
      customer=null;
      cart.setCustomer(customer);
      customerNameElm.text('Walk-in-Customer');
      txtCustomer.val('');
})


formOrderElm.on('submit',(eventData)=>{
      eventData.preventDefault();

      if (+txtQty.val() <= 0 || +txtQty.val() > item.qty) {
            txtQty.addClass("is-invalid");
            txtQty.trigger("select");
            return;
      }
      item.qty = +txtQty.val();

      if (cart.containItem(item.code)) {
            const codeElm =Array.from(tbodyElm.find("tr td:first-child()")).find(codeElm=>$(codeElm).text()===item.code);
            const qtyElm =$(codeElm).parents('tr').find('td:nth-child(2)');
            const priceElm = $(codeElm).parents("tr").find("td:nth-child(4)");

            cart.updateItemQty(item.code, cart.getItem(item.code).qty + item.qty);
            qtyElm.text(cart.getItem(item.code).qty);
            priceElm.text((Big(cart.getItem(item.code).qty).times(Big(item.unitPrice))));
      } else {
            addItemToTable(item);
            cart.addItem(item);
      }

      itemInfoElm.addClass("d-none");
      formOrderElm.addClass("d-none");
      txtCode.val("");
      txtCode.trigger("focus");
      txtQty.val("1");

});

tbodyElm.on('click','tr td:first-child  svg',(eventData)=>{
      const code =$(eventData.target).parents('tr').find('td:first-child .code').text();
      cart.deleteItem(code);
      $(eventData.target).parents('tr').remove();

});

btnPlaceOrder.on('click',()=>{
      if(cart.itemList.length===0)return;
      const order={};
      order.customer =cart.customer;
      order.dateTime =DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss').format(LocalDateTime.now());
      order.itemList=cart.itemList;
      console.log(JSON.stringify(order));
      const xhr= new XMLHttpRequest();
      xhr.addEventListener('readystatechange',()=>{
            if(xhr.readyState===4){
                  if(xhr.status===201){
                        tbodyElm.empty();
                        cart.clear();
                        $("#btn-clear-customer").trigger('click');
                        txtCode.trigger('input');
                        tFootElm.show();

                        //todo show this item was saved successfully
                  }else{
                        //TODO error message
                  }
            }
      });
      xhr.open('POST',`${REST_API_BASE_URL}/api/v1/orders`);
      xhr.setRequestHeader('Content-Type','application/json');
      xhr.send(JSON.stringify(order))
});
function findCustomer(){
      const idOrContact=txtCustomer.val().trim().replace('C','');
      customer =null;
      customerNameElm.text('Walk-in-Customer');
      if(!idOrContact || !/^[A-z1-9]+$/.test(idOrContact))return
      cart.setCustomer(null);
      if(socket.readyState===socket.OPEN) socket.send(idOrContact);
}
function findItems(){
      const description =$("#description");
      const stock =$("#stock span");
      const price =$("#unit-price");
      const code =txtCode.val().trim();
      console.log(code)

      description.text('');
      stock.text('');
      price.text('');
      txtCode.removeClass('is-invalid');
      txtQty.val("1");
      item=null;

      if(!code) return;

      const ajax =$.ajax(`${REST_API_BASE_URL}/api/v1/items/${code}`,'GET');

      ajax.done((data)=>{
            item =data;
            description.text(item.description);
            price.text(item.unitPrice);
            if (cart.containItem(item.code)) {
            item.qty -= cart.getItem(code).qty;
        }
            stock.text(item?`Stock In ${item.qty}`:'Out-of-Stock');
            itemInfoElm.removeClass('d-none');
            if(item.qty){
                  formOrderElm.removeClass('d-none');
                  txtQty.trigger('select');
            }

      });
      ajax.fail(()=>{
            txtCode.addClass('is-invalid');
            txtCode.trigger('select');
      });
      ajax.always(()=>{
            txtCode.removeAttr('disabled');
            if(!item?.qty){
                  txtCode.trigger('select');
            }
      });
}
function addItemToTable(item) {
      tFootElm.hide();
      const trElm = $(`<tr>
                    <td>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <div class="fw-bold code">${item.code}</div>
                                <div>${item.description}</div>
                            </div>
                            <svg data-bs-toggle="tooltip" data-bs-title="Remove Item" xmlns="http://www.w3.org/2000/svg"
                                 width="32" height="32" fill="currentColor" class="bi bi-trash delete"
                                 viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </div>
                    </td>
                    <td>
                        ${item.qty}
                    </td>
                    <td>
                        ${item.unitPrice}
                    </td>
                    <td>
                        ${Big(item.unitPrice).times(Big(item.qty))}
                    </td>
                </tr>`);
      tbodyElm.append(trElm);
}

function loadData(){
      customer=cart.customer;
      cart.itemList?.forEach((item)=>{
            addItemToTable(item);
      });
      if(customer){
            txtCustomer.val(customer.id);
            customerNameElm.text(customer.name);
      }
}


// export function formatPrice(price) {
//       return new Intl.NumberFormat('en-LK', {
//             style: 'currency',
//             currency: 'LKR',
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//       }).format(price);
// }
//
// export function formatNumber(number) {
//       return new Intl.NumberFormat('en-LK', {
//             style: 'decimal',
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//       }).format(number);
// }

function setDateTime() {
      const now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
      orderDateTimeElm.text(now);
}