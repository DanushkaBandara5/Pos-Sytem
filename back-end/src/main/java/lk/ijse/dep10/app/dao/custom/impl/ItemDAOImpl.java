package lk.ijse.dep10.app.dao.custom.impl;

import lk.ijse.dep10.app.dao.custom.ItemDAO;
import lk.ijse.dep10.app.dao.util.JdbcTemplate;
import lk.ijse.dep10.app.entity.Item;
import static lk.ijse.dep10.app.dao.util.Mappers.ITEM_ROW_MAPPER;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;


public class ItemDAOImpl implements ItemDAO {
    private JdbcTemplate jdbcTemplate;
    @Override
    public void setConnection(Connection connection) {
        jdbcTemplate = new JdbcTemplate(connection);
    }

    @Override
    public long count() throws Exception {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM item", Long.class);
    }

    @Override
    public Item save(Item item) throws Exception {
        jdbcTemplate.update("INSERT INTO item (code, description, qty, unit_price) VALUES (?, ?, ?, ?)", item.getCode(), item.getDescription(), item.getQty(), item.getUnitPrice());
        return item;
    }

    @Override
    public void update(Item item) throws Exception {
        jdbcTemplate.update("update item set description=?, qty=?, unit_price=? where code=?", item.getDescription(), item.getQty(), item.getUnitPrice(), item.getCode());

    }

    @Override
    public void deleteById(String code) throws Exception {
        jdbcTemplate.update("DELETE FROM item WHERE code=?", code);
    }

    @Override
    public Optional<Item> findById(String code) throws Exception {
        return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM item WHERE code=?", ITEM_ROW_MAPPER, code));

    }

    @Override
    public List<Item> findAll() throws Exception {
        return jdbcTemplate.query("SELECT * FROM item", ITEM_ROW_MAPPER);
    }

    @Override
    public boolean existsById(String code) throws Exception {
        return findById(code).isPresent();
    }


    @Override
    public List<Item> findItems(String query) throws Exception {
        query = "%" + query + "%";
        return jdbcTemplate.query("SELECT * FROM item WHERE code LIKE ? OR description LIKE ?",
                ITEM_ROW_MAPPER, query, query);
    }
}
