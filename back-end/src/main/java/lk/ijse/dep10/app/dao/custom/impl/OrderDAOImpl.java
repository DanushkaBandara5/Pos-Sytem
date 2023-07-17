package lk.ijse.dep10.app.dao.custom.impl;


import lk.ijse.dep10.app.dao.custom.OrderDAO;
import lk.ijse.dep10.app.dao.util.GeneratedKeyHolder;
import lk.ijse.dep10.app.dao.util.JdbcTemplate;
import lk.ijse.dep10.app.dao.util.KeyHolder;
import lk.ijse.dep10.app.entity.Order;
import static lk.ijse.dep10.app.dao.util.Mappers.ORDER_ROW_MAPPER;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;


public class OrderDAOImpl  implements OrderDAO {

    private JdbcTemplate jdbcTemplate;
    @Override
    public void setConnection(Connection connection) {
        this.jdbcTemplate=new JdbcTemplate(connection);

    }


    @Override
    public long count() throws Exception {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM `order`", Long.class);
    }

    @Override
    public Order save(Order order) throws Exception {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement stm = con
                    .prepareStatement("INSERT INTO `order` (datetime) VALUES (?)", Statement.RETURN_GENERATED_KEYS);
            stm.setTimestamp(1, order.getDatetime());
            return stm;
        }, keyHolder);
        order.setId(keyHolder.getKey().intValue());
        return order;
    }

    @Override
    public void update(Order order) throws Exception {
        jdbcTemplate.update("UPDATE `order` SET datetime=? WHERE id=?", order.getDatetime(), order.getId());
    }

    @Override
    public void deleteById(Integer orderId) throws Exception {
        jdbcTemplate.update("DELETE FROM `order` WHERE id=?", orderId);
    }

    @Override
    public Optional<Order> findById(Integer orderId) throws Exception {
        return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM `order` WHERE id=?", ORDER_ROW_MAPPER, orderId));
    }

    @Override
    public List<Order> findAll() throws Exception {
        return jdbcTemplate.query("SELECT * FROM `order`", ORDER_ROW_MAPPER);
    }

    @Override
    public boolean existsById(Integer orderId) throws Exception {
        return findById(orderId).isPresent();
    }


}
