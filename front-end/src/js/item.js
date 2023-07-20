const btnNew = $('#btn-new-item');
const btnSaveItem = $("#btn-save-item");
const txtCode = $("#txt-code");
const txtDescription = $("#txt-description");
const txtQuantity = $("#txt-quantity");
const txtPrice =$("#txt-price")
const tbodyItem = $("#tbl-item tbody");
const searchItemElm = $("#txt-search");
const btnClose =$(".btn-close")

loadData();

$("#newItem input").addClass("animate__animated");
btnNew.on('click', () => {
    clear()
    $("#newCustomer input").next().hide();
});
$('#newItem input').on('input', (eventData) => {
    $(eventData.target).removeClass('invalid');
    $(eventData.target).next().hide();
});

searchItemElm.on('input', () => {
    loadData();
});
btnSaveItem.on('click', () => {
    console.log("hello")
    if (!validateItem()) return;
    let code = txtCode.val().trim();
    let description = txtDescription.val().trim();
    let qty = txtQuantity.val().trim();
    let unitPrice = txtPrice.val().trim();
    let item = {
        code, description, qty,unitPrice
    };
    if (btnSaveItem.text() === 'Save Item') {

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 201) {
                    clear()
                    //TODO show success message
                    loadData();

                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    clear();
                    //TODO show Failure message
                }
            }
        })

        xhr.open('POST', `http://localhost:8080/pos/api/v1/items`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(item));
    } else {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 204) {
                    loadData()
                    clear('Save Item')
                    //TODO show  success messgae
                } else {
                    clear("Save Item")
                    //TODO show  fail message
                }
            }
        });
        xhr.open('PATCH', `http://localhost:8080/pos/api/v1/items/${code}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(item))
    }


});


function validateItem() {
    $("#newCustomer input ").removeClass("animate__shakeX invalid");
    let validate = true;
    if (!txtPrice.val().trim()) {

        validate = validateMessage(txtPrice, "Unit Price can't be empty");

    } else if (!/^\d+.\d*$/.test(txtPrice.val().trim())) {

        validate = validateMessage(txtPrice, "Unit Price is invalid");
    }
    if (!txtQuantity.val().trim()) {

        validate = validateMessage(txtQuantity, "Quantity can't be empty");

    } else if (!/^\d+$/.test(txtQuantity.val().trim())) {

        validate = validateMessage(txtQuantity, "Quantity is invalid");
    }
    if (!txtDescription.val().trim()) {

        validate = validateMessage(txtDescription, "Description can't be empty");
    } else if (!/^[A-z ]{3,}$/.test(txtDescription.val().trim())) {

        validate = validateMessage(txtDescription, "Name is invalid");
    }
    if (!txtCode.val().trim()) {

        validate = validateMessage(txtCode, "Code can't be empty");
    } else if (!/^.+$/.test(txtCode.val().trim())) {

        validate = validateMessage(txtCode, "Code is invalid");
    }
    return validate;

}

function validateMessage(txtElm, message) {
    setTimeout(() => txtElm.addClass("animate__shakeX invalid"), 0);
    txtElm.trigger('select');
    txtElm.parent().find(".invalid-feedback").text(message);
    txtElm.next().show();
    return false;

}

function loadData() {
    let ajax = $.ajax(`http://127.0.0.1:8080/pos/api/v1/items?q=${searchItemElm.val().trim()}`, 'GET');
    ajax.done((itemList) => {
        tbodyItem.empty();

        if (itemList.length === 0) {
            tbodyElm.parent().find('tfoot').show();
            return;
        }
        tbodyItem.parent().find('tfoot').hide();
        itemList.forEach(item => {
            console.log(item)
            let trElm = $("<tr></tr>");
            const elm = `<td class="text-center">${item.code}</td>
                <td>${item.description}</td>
                <td class="d-none d-xl-table-cell ">${item.qty}</td>
                <td class="contact text-center">${item.unitPrice}</td>
                <td>
                    <div class="actions d-flex gap-3 justify-content-center">
                        <svg data-bs-toggle="tooltip" data-bs-title="Edit Customer" xmlns="http://www.w3.org/2000/svg"
                             width="20" height="20" fill="currentColor"
                             class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                        <svg data-bs-toggle="tooltip" data-bs-title="Delete Customer" xmlns="http://www.w3.org/2000/svg"
                             width="20" height="20" fill="currentColor"
                             class="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </div>
                </td>`;
            trElm.append(elm);
            tbodyItem.append(trElm);


        });


    });


    ajax.fail(() => {
        alert("fail to load");
    });
};

tbodyItem.on('click', 'svg:last-child()', (data) => {

    let code = $(data.target).parents('tr').find("td:first-child").text();

    const ajax = $.ajax(`http://127.0.0.1:8080/pos/api/v1/items/${code}`, {
        method: 'DELETE',
        crossDomain: true

    });
    ajax.done(() => {
        loadData();
    });
    ajax.fail(() => {
    alert("fail to delete")
    })
});

tbodyItem.on('click', 'svg:first-child()', (data) => {

    code = $(data.target).parents('tr').find("td:first-child").text();
    let description = $(data.target).parents('tr').find("td:nth-child(2)").text();
    let quantity = $(data.target).parents('tr').find("td:nth-child(3)").text();
    let unitPrice = $(data.target).parents('tr').find("td:nth-child(4)").text();
    btnNew.trigger("click");
    txtCode.val(code)
    txtDescription.val(description)
    txtQuantity.val(quantity);
    txtPrice.val(unitPrice);
    btnSaveItem.text('Update Item');
});

function clear(text) {
    $("#newItem input ").val('');
    if (text) {
        btnSaveItem.text(text);
    }
    btnClose.trigger('click')
}









