package lk.ijse.dep10.app.business.custom;


import lk.ijse.dep10.app.business.SuperBO;
import lk.ijse.dep10.app.dto.OrderDTO;
import lk.ijse.dep10.app.dto.OrderDTO2;

import java.util.List;

public interface OrderBO extends SuperBO {

    Integer placeOrder(OrderDTO orderDTO) throws Exception;

    List<OrderDTO2> searchOrders(String query) throws Exception;
}
