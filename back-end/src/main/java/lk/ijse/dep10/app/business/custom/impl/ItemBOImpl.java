package lk.ijse.dep10.app.business.custom.impl;


import lk.ijse.dep10.app.business.custom.ItemBO;
import lk.ijse.dep10.app.business.exception.BusinessException;
import lk.ijse.dep10.app.business.exception.BusinessExceptionType;
import lk.ijse.dep10.app.dao.custom.ItemDAO;
import lk.ijse.dep10.app.dao.custom.OrderDetailDAO;
import lk.ijse.dep10.app.dto.ItemDTO;
import lk.ijse.dep10.app.business.util.Transformer;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.List;
import java.util.stream.Collectors;
@Service
@Transactional
public class ItemBOImpl implements ItemBO {

    private final DataSource dataSource;
    private final ItemDAO itemDAO ;
    private final OrderDetailDAO orderDetailDAO;
    private final Transformer transformer;

    public ItemBOImpl(DataSource dataSource, ItemDAO itemDAO, OrderDetailDAO orderDetailDAO, Transformer transformer) {
        this.dataSource = dataSource;
        this.itemDAO = itemDAO;
        this.orderDetailDAO = orderDetailDAO;
        this.transformer = transformer;
    }

    @Override
    public void saveItem(ItemDTO itemDTO) throws Exception {


            if (itemDAO.existsById(itemDTO.getCode())) throw new BusinessException(BusinessExceptionType.DUPLICATE_RECORD,
                    "Save failed: Item code: " + itemDTO.getCode() + " already exists");

            itemDAO.save(transformer.toItemEntity(itemDTO));

    }

    @Override
    public void updateItem(ItemDTO itemDTO) throws Exception {

            if (!itemDAO.existsById(itemDTO.getCode()))
                throw new BusinessException(BusinessExceptionType.RECORD_NOT_FOUND,
                        "Update failed: Item code: " + itemDTO.getCode() + " does not exist");
            itemDAO.update(transformer.toItemEntity(itemDTO));

    }

    @Override
    public void deleteItemByCode(String itemCode) throws Exception {

            if (orderDetailDAO.existsOrderDetailByItemCode(itemCode)) throw new BusinessException(BusinessExceptionType.INTEGRITY_VIOLATION,
                    "Delete failed: Item code: " + itemCode + " already associated with some orders");

            if (!itemDAO.existsById(itemCode))
                throw new BusinessException(BusinessExceptionType.RECORD_NOT_FOUND,
                        "Delete failed: Item code: " + itemCode + " does not exist");
            itemDAO.deleteById(itemCode);

    }

    @Override
    public ItemDTO findItemByCode(String itemCode) throws Exception {


            return itemDAO.findById(itemCode).map(transformer::fromItemEntity).orElseThrow(()-> new BusinessException(BusinessExceptionType.RECORD_NOT_FOUND,
                    "No item record found for the code: " + itemCode));

    }

    @Override
    public List<ItemDTO> findItems(String query) throws Exception {


            return itemDAO.findItems(query).stream().map(transformer::fromItemEntity).collect(Collectors.toList());
        }

}
