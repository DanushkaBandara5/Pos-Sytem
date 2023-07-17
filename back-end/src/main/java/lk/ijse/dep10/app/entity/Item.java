package lk.ijse.dep10.app.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item implements SuperEntity {
    private String code;
    private String description;
    private int qty;
    private BigDecimal unitPrice;
}
