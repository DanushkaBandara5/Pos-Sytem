const toast =$(".toast");
const toastHead=$(".toast-header .me-auto");
const toastBody=$(".toast-body");
export function showMessage(message,type){
    const toast =$(".toast");
    const toastHead=$(".toast-header .me-auto")
    const toastBody=$(".toast-body")
    toastBody.text(message);
    switch (type){
        case "info":
            toastHead.text('Successful');
            toast.css('border-color','green');
            break;
        case 'warning':
            toastHead.text('Failure');
            toast.css('border-color','red');
            break;

    }
    toast.toast('show');
}