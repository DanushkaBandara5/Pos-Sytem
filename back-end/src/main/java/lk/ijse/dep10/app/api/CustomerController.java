package lk.ijse.dep10.app.api;

import lk.ijse.dep10.app.business.BOFactory;
import lk.ijse.dep10.app.business.BOType;
import lk.ijse.dep10.app.business.custom.CustomerBO;
import lk.ijse.dep10.app.dto.CustomerDTO;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin

public class CustomerController {

    @Autowired
    private BasicDataSource pool;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customer) throws Exception {
        CustomerBO customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, pool);
        return customerBO.saveCustomer(customer);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/{customerId}")
    public void updateCustomer(@PathVariable("customerId") Integer customerId,
                               @RequestBody CustomerDTO customer) throws Exception {
        CustomerBO customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, pool);
        customer.setId(customerId);
        customerBO.updateCustomer(customer);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Integer customerId) throws Exception {
        CustomerBO customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, pool);
        customerBO.deleteCustomerById(customerId);
    }


    @GetMapping
    public List<CustomerDTO> getCustomers(@RequestParam(value = "q", required = false) String query) throws Exception {
        if (query == null) query = "";
        CustomerBO customerBO = BOFactory.getInstance().getBO(BOType.CUSTOMER, pool);
        return customerBO.findCustomers(query);
    }
}
