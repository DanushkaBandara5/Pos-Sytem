package lk.ijse.dep10.app.dao.custom;

import lk.ijse.dep10.app.dao.SuperDAO;
import lk.ijse.dep10.app.dto.OrderDTO2;

import java.util.List;

public interface QueryDAO extends SuperDAO {
    List<OrderDTO2> findOrdersByQuery(String query) throws Exception;

}
