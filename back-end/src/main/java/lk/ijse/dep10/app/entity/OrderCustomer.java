package lk.ijse.dep10.app.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderCustomer implements SuperEntity {
    private int orderId;
    private int customerId;
}
