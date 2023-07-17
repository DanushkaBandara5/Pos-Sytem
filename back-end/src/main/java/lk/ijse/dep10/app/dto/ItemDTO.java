package lk.ijse.dep10.app.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    private String code;
    private String description;
    private Integer qty;
    private BigDecimal unitPrice;
}
