package lk.ijse.dep10.app.dao.util;

import java.sql.Connection;
import java.sql.PreparedStatement;

public interface PreparedStatementCreator {
    PreparedStatement createPreparedStatement(Connection con) throws Exception;
}
