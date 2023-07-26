package lk.ijse.dep10.app;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

import javax.sql.DataSource;
import javax.xml.crypto.Data;

@Configuration
@PropertySource("classpath:application.properties")
@Import(JdbcConfig.class)
public class WebRootConfig {

}
