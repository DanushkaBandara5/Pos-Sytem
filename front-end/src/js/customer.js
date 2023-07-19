


const btnNew =$('#btn-new-customer');
const btnSave =$("#btn-save");
const txtName =$("#txt-name");
const txtContact=$("#txt-contact");
const txtAddress =$("#txt-address");

$("#newCustomer input ").addClass("animate__animated");
btnNew.on('click',()=>{
    $("#newCustomer input ").next().hide();
});
$('#newCustomer input').on('input',(eventData)=>{
    $(eventData.target).removeClass('invalid');
    $(eventData.target).next().hide();


});
btnSave.on('click',()=>{
    validate();
});
function validate(){
    $("#newCustomer input ").removeClass("animate__shakeX invalid");


    let validate =true;
    if(!txtAddress.val().trim()){

        validate=validateMessage(txtAddress,"Address can't be empty");
    }
    else if(!/^.{5,}$/.test(txtAddress.val().trim())){

        validate=validateMessage(txtAddress,"Address is invalid");
    }
    if(!txtContact.val().trim()){

        validate=validateMessage(txtContact,"Contact can't be empty");
    }
    else if(!/^07\d-\d{7}$/.test(txtContact.val().trim())){

        validate=validateMessage(txtContact,"Contact is invalid");
    }
    if(!txtName.val().trim()){

        validate=validateMessage(txtName,"Name can't be empty");
    }
    else if(!/^[A-z ]{3,}$/.test(txtName.val().trim())){

        validate=validateMessage(txtName,"Name is invalid");
    }

}
function validateMessage(txtElm,message){
    setTimeout(()=>txtElm.addClass("animate__shakeX invalid"),0);
    txtElm.trigger('select');
    txtElm.parent().find(".invalid-feedback").text(message);
    txtElm.next().show();
    return false;

}
