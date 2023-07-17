package lk.ijse.dep10.app.dao.custom;

import lk.ijse.dep10.app.dao.CrudDAO;
import lk.ijse.dep10.app.entity.Item;

import java.util.List;

public interface ItemDAO extends CrudDAO<Item,String> {
    List<Item> findItems(String query) throws Exception;
}
