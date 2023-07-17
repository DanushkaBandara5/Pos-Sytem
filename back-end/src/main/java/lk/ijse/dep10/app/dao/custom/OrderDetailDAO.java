package lk.ijse.dep10.app.dao.custom;

import lk.ijse.dep10.app.dao.CrudDAO;
import lk.ijse.dep10.app.entity.OrderDetail;
import lk.ijse.dep10.app.entity.OrderDetailPK;

import javax.sql.rowset.CachedRowSet;

public interface OrderDetailDAO extends CrudDAO<OrderDetail, OrderDetailPK> {
    boolean existsOrderDetailByItemCode(String itemCode) throws Exception;
}
