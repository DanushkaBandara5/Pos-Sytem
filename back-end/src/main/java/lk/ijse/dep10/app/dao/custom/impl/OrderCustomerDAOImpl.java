package lk.ijse.dep10.app.dao.custom.impl;
import  static lk.ijse.dep10.app.dao.util.Mappers.ORDER_CUSTOMER_ROW_MAPPER;


import lk.ijse.dep10.app.dao.custom.OrderCustomerDAO;
import lk.ijse.dep10.app.dao.util.JdbcTemplate;
import lk.ijse.dep10.app.entity.OrderCustomer;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.util.List;
import java.util.Optional;

@Component
public class OrderCustomerDAOImpl implements OrderCustomerDAO {
    private JdbcTemplate jdbcTemplate;
    @Override
    public void setConnection(Connection connection) {
        this.jdbcTemplate =new JdbcTemplate(connection);

    }

    @Override
    public long count() throws Exception {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM order_customer", Long.class);
    }

    @Override
    public OrderCustomer save(OrderCustomer orderCustomer) throws Exception {
        jdbcTemplate.update("INSERT INTO order_customer (order_id, customer_id) VALUES (?, ?)", orderCustomer.getOrderId(), orderCustomer.getCustomerId());
        return orderCustomer;
    }

    @Override
    public void update(OrderCustomer orderCustomer) throws Exception {
        jdbcTemplate.update("UPDATE order_customer SET customer_id = ? WHERE order_id=?", orderCustomer.getCustomerId(), orderCustomer.getOrderId());
    }

    @Override
    public void deleteById(Integer orderId) throws Exception {
        jdbcTemplate.update("DELETE FROM order_customer WHERE order_id = ?", orderId);
    }

    @Override
    public Optional<OrderCustomer> findById(Integer orderId) throws Exception {
        return Optional.ofNullable(jdbcTemplate.queryForObject("SELECT * FROM order_customer WHERE order_id = ?", ORDER_CUSTOMER_ROW_MAPPER, orderId));
    }

    @Override
    public List<OrderCustomer> findAll() throws Exception {
        return jdbcTemplate.query("SELECT * FROM order_customer", ORDER_CUSTOMER_ROW_MAPPER);
    }

    @Override
    public boolean existsById(Integer orderId) throws Exception {
        return findById(orderId).isPresent();
    }



    @Override
    public boolean existsOrderByCustomerId(int customerId) throws Exception {
        return jdbcTemplate.queryForObject("SELECT * FROM order_customer WHERE customer_id = ?",
                ORDER_CUSTOMER_ROW_MAPPER, customerId) != null;
    }
}
