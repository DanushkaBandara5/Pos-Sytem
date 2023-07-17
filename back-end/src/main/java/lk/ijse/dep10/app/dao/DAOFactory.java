package lk.ijse.dep10.app.dao;

import lk.ijse.dep10.app.dao.custom.OrderCustomerDAO;
import lk.ijse.dep10.app.dao.custom.impl.*;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory(){}

    public static DAOFactory getInstance(){
        return daoFactory==null?daoFactory=new DAOFactory():daoFactory;
    }
    public <T> T getDAO(DAOType daoType){
        switch (daoType){
            case CUSTOMER:
                return (T)new CustomerDAOImpl();
            case ITEM:
                return (T)new ItemDAOImpl();
            case ORDER:
                return (T) new OrderDAOImpl();
            case ORDER_CUSTOMER:
                return (T)new OrderCustomerDAOImpl();
            case ORDER_DETAIL:
                return (T)new OrderCustomerDAOImpl();
            case QUERY:
                return (T) new QueryDAOImpl();
            default:
                throw new RuntimeException("Invalid DAO Type");
        }
    }
}
