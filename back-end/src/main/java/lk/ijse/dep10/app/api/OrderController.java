package lk.ijse.dep10.app.api;

import lk.ijse.dep10.app.business.custom.OrderBO;
import lk.ijse.dep10.app.dto.OrderDTO;
import lk.ijse.dep10.app.dto.OrderDTO2;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {
    private final OrderBO orderBO;

    public OrderController(OrderBO orderBO) {
        this.orderBO = orderBO;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Integer saveOrder(@RequestBody @Valid OrderDTO order) throws Exception {

        return orderBO.placeOrder(order);
    }

    @GetMapping
    public List<OrderDTO2> getOrders(@RequestParam(value = "q", required = false) String query) throws Exception {
        if (query == null) query = "";

        return orderBO.searchOrders(query);
    }
}
