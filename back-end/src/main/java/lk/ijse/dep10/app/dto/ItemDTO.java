package lk.ijse.dep10.app.dto;



import lk.ijse.dep10.app.dto.util.ValidationGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    @NotBlank(message = "Item code can't be empty or null", groups = {ValidationGroup.Save.class})
    @Pattern(regexp = "\\d+", message = "Invalid item code", groups = {ValidationGroup.Save.class})
    private String code;
    @NotBlank(message = "Description can't be empty or null")
    private String description;
    @NotNull(message = "Qty. can't be empty or null")
    @Min(value = 0, message = "Qty. can't be a negative value")
    private Integer qty;
    @NotNull(message = "Unit Price can't be empty or null")
    @Min(value = 0, message = "Unit price can't be a negative value")
    private BigDecimal unitPrice;
}
