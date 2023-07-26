package lk.ijse.dep10.app.dao.custom;

import lk.ijse.dep10.app.dto.OrderDTO2;

import java.util.List;

public interface QueryDAO  {
    List<OrderDTO2> findOrdersByQuery(String query) throws Exception;

}
