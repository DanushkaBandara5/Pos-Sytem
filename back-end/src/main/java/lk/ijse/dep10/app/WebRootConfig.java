package lk.ijse.dep10.app;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import javax.xml.crypto.Data;

@Configuration
public class WebRootConfig {
    @Bean
    public BasicDataSource dataSource(){
        BasicDataSource bds =new BasicDataSource();
        bds.setUsername("root");
        bds.setPassword("root");
        bds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        bds.setUrl("jdbc:mysql://localhost:3306/dep10_pos_app?createDatabaseIfNotExist=true");
        bds.setMaxTotal(20);
        bds.setInitialSize(10);
        return bds;

    }
}
