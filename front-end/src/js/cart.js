import Big from "../../node_modules/big.js/big";

export class Cart{
    customer;
    itemList;
    subscriber;

    constructor(subscriber) {
        this.subscriber=subscriber;
        const order =JSON.parse(localStorage.getItem('order'));
        this.customer=order.customer;
        this.itemList=order.itemList;
        this.update();
    }
    clear(){
        this.customer=null;
        this.itemList=[];
        this.update();
        this.subscriber(this.getTotal())
    }
    addItem(item){
        this.itemList.push(item);
        this.update();
        this.subscriber(this.getTotal())
    };
    contentItem(code){
        return !!this.getItem(code);
    }
    getItem(code){

        return this.itemList.find(ex=>ex.code===code);
    }
    delete(code){
        if(this.contentItem(code)){
            const index=this.itemList.indexOf(this.getItem(code));
            this.itemList.splice(index,1);
            this.update();
            this.subscriber(this.getTotal())
        }


    }
    getTotal(){
        let total =new Big("0");
        for (const item of this.itemList) {
            total=total.plus(new Big(item.qty).times(new Big(item.unitPrice)));

        }
        return total;
    }
    updateItemQty(code,qty){
        this.getItem(code).qty=qty;
        this.update();
        this.subscriber(this.getTotal());

    }
    setCustomer(customer){
        this.customer=customer;
        this.update();

    }
    update(){
        localStorage.setItem('order',JSON.stringify(this));

}

}