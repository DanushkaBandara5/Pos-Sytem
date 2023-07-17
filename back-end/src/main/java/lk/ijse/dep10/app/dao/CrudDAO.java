package lk.ijse.dep10.app.dao;

import lk.ijse.dep10.app.entity.SuperEntity;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public interface CrudDAO<T extends SuperEntity,ID extends Serializable> extends SuperDAO{
    long count() throws Exception;

    T save(T entity) throws Exception;

    void update(T entity) throws Exception;

    void deleteById(ID pk)throws Exception;

    Optional<T> findById(ID pk) throws Exception;

    List<T> findAll() throws Exception;

    boolean existsById(ID pk) throws Exception;
}
