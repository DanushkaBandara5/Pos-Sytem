import {showMessage} from "./toast.js";

const btnNew = $('#btn-new-customer');
const btnSave = $("#btn-save");
const txtName = $("#txt-name");
const txtContact = $("#txt-contact");
const txtAddress = $("#txt-address");
const tbodyElm = $("#tbl-customers tbody");
const searchElm = $("#txt-search");
const btnClose = $(".btn-close");
const REST_API_URL='http://localhost:8080/pos';
let id;
loadData();

$("#newCustomer input ").addClass("animate__animated");
btnNew.on('click', () => {
    clear()
    $("#newCustomer input ").next().hide();
});
$('#newCustomer input').on('input', (eventData) => {
    $(eventData.target).removeClass('invalid');
    $(eventData.target).next().hide();
});

searchElm.on('input', () => {
    loadData();
});
btnSave.on('click', () => {
    if (!validate()) return;
    let name = txtName.val().trim();
    let address = txtAddress.val().trim();
    let contact = txtContact.val().trim();
    let customer = {
        name, contact, address
    };
    if (btnSave.text() === 'Save Customer') {


        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                btnClose.trigger('click');
                if (xhr.status == 201) {
                    clear()
                    showMessage('Customers saved successfully', 'info');
                    loadData();

                } else {
                    const errorObj = JSON.parse(xhr.responseText);
                    clear();
                    showMessage(errorObj.message, 'warning');
                }
            }
        })

        xhr.open('POST', `${REST_API_URL}/api/v1/customers`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log(customer)
        xhr.send(JSON.stringify(customer));
    } else {
        customer.id = id;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                btnClose.trigger('click');
                if (xhr.status == 204) {
                    loadData()
                    clear('Save Customer');
                    showMessage('Customers updated successfully', 'info');
                    //TODO show  success messgae
                } else {
                    clear("Save Customers")
                    const errorObj = JSON.stringify(xhr.readyState)
                    showMessage(errorObj.message, 'warning');
                }
            }
        });
        xhr.open('PATCH', `${REST_API_URL}/api/v1/customers/${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(customer))
    }


});


function validate() {
    $("#newCustomer input ").removeClass("animate__shakeX invalid");


    let validate = true;
    if (!txtAddress.val().trim()) {

        validate = validateMessage(txtAddress, "Address can't be empty");
    } else if (!/^.{5,}$/.test(txtAddress.val().trim())) {

        validate = validateMessage(txtAddress, "Address is invalid");
    }
    if (!txtContact.val().trim()) {

        validate = validateMessage(txtContact, "Contact can't be empty");
    } else if (!/^0\d{2}-\d{7}$/.test(txtContact.val().trim())) {

        validate = validateMessage(txtContact, "Contact is invalid");
    }
    if (!txtName.val().trim()) {

        validate = validateMessage(txtName, "Name can't be empty");
    } else if (!/^[A-z ]{3,}$/.test(txtName.val().trim())) {

        validate = validateMessage(txtName, "Name is invalid");
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
    let ajax = $.ajax(`${REST_API_URL}/api/v1/customers?q=${searchElm.val().trim()}`, 'GET');
    ajax.done((custList) => {
        tbodyElm.empty();

        if (custList.length === 0) {
            tbodyElm.parent().find('tfoot').show();
            return;
        }
        tbodyElm.parent().find('tfoot').hide();
        custList.forEach(customers => {
            let trElm = $("<tr></tr>");
            const elm = `<td class="text-center">${formatID(customers.id)}</td>
                <td>${customers.name}</td>
                <td class="d-none d-xl-table-cell ">${customers.address}</td>
                <td class="contact text-center">${customers.contact}</td>
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
            tbodyElm.append(trElm);


        });


    });


    ajax.fail(() => {
        showMessage('Fail to fetch Customers','warning');
    });
};

tbodyElm.on('click', 'svg:last-child()', (data) => {

    let id = +$(data.target).parents('tr').find("td:first-child").text().replaceAll('C', '');

    const ajax = $.ajax(`${REST_API_URL}/api/v1/customers/${id}`, {
        method: 'DELETE', crossDomain: true

    });
    ajax.done(() => {
        loadData();
        showMessage('Customers deleted successfully', 'info');
    });
    ajax.fail((err) => {
        showMessage(err.responseJSON.message, 'warning');

    })
});

tbodyElm.on('click', 'svg:first-child()', (data) => {

    id = +$(data.target).parents('tr').find("td:first-child").text().substring(1);
    let name = $(data.target).parents('tr').find("td:nth-child(2)").text();
    let address = $(data.target).parents('tr').find("td:nth-child(3)").text();
    let contact = $(data.target).parents('tr').find("td:nth-child(4)").text();
    console.log(id, name, address, contact);
    btnNew.trigger("click");
    txtName.val(name)
    txtAddress.val(address)
    txtContact.val(contact);
    btnSave.text('Update Customer');
});

function clear(text) {
    $("#newCustomer input ").val('');
    if (text) {
        btnSave.text(text);
    }
}

function formatID(value) {
    if (value < 10) {
        return "C00" + value;

    } else if (value < 100) {
        return "C0" + value;
    } else if (value < 1000) {
        return "C" + value;
    }

}











