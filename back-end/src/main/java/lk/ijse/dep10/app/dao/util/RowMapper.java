package lk.ijse.dep10.app.dao.util;

import java.sql.ResultSet;
import java.sql.SQLException;

@FunctionalInterface
public interface RowMapper<T> {
    T mapRow(ResultSet rs,int rowNum) throws SQLException;

}
