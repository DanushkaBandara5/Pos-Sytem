package lk.ijse.dep10.app.business.custom;


import lk.ijse.dep10.app.business.SuperBO;
import lk.ijse.dep10.app.dto.ItemDTO;

import java.util.List;

public interface ItemBO extends SuperBO {

    void saveItem(ItemDTO itemDTO) throws Exception;

    void updateItem(ItemDTO itemDTO) throws  Exception;

    void deleteItemByCode(String itemCode) throws Exception;

    ItemDTO findItemByCode(String itemCode) throws Exception;

    List<ItemDTO> findItems(String query) throws Exception;
}
