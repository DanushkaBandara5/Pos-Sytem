package lk.ijse.dep10.app.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO2 {
    private String orderId;
    private LocalDateTime orderDate;
    private String customerId;
    private String customerName;
    private BigDecimal orderTotal;
}
