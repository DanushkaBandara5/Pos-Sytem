package lk.ijse.dep10.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail implements SuperEntity {
    private OrderDetailPK orderDetailPK;
    private BigDecimal unitPrice;
    private int qty;
    public OrderDetail(int orderId, String itemCode,
                       BigDecimal unitPrice, int qty){
        this.orderDetailPK = new OrderDetailPK(orderId, itemCode);
        this.unitPrice = unitPrice;
        this.qty = qty;
    }
}
