package lk.ijse.dep10.app.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private CustomerDTO customer;
    private LocalDateTime dateTime;
    private List<ItemDTO> itemList = new ArrayList<>();
}
