package lk.ijse.dep10.app.api;

import lk.ijse.dep10.app.business.BOFactory;
import lk.ijse.dep10.app.business.BOType;
import lk.ijse.dep10.app.business.custom.OrderBO;
import lk.ijse.dep10.app.dto.OrderDTO;
import lk.ijse.dep10.app.dto.OrderDTO2;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {
    @Autowired
    private BasicDataSource pool;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Integer saveOrder(@RequestBody  OrderDTO order) throws Exception {
        OrderBO orderBO = BOFactory.getInstance().getBO(BOType.ORDER, pool);
        return orderBO.placeOrder(order);
    }

    @GetMapping
    public List<OrderDTO2> getOrders(@RequestParam(value = "q", required = false) String query) throws Exception {
        if (query == null) query = "";
        OrderBO orderBO = BOFactory.getInstance().getBO(BOType.ORDER, pool);
        return orderBO.searchOrders(query);
    }
}
