package lk.ijse.dep10.app.dao.custom;

import lk.ijse.dep10.app.dao.CrudDAO;
import lk.ijse.dep10.app.entity.OrderCustomer;

public interface OrderCustomerDAO extends CrudDAO<OrderCustomer,Integer> {
    boolean existsOrderByCustomerId(int customerId) throws Exception;
}
