package lk.ijse.dep10.app.api;

import lk.ijse.dep10.app.business.custom.CustomerBO;
import lk.ijse.dep10.app.dto.CustomerDTO;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin

public class CustomerController {
    private final CustomerBO customerBO;

    public CustomerController(CustomerBO customerBO) {
        this.customerBO = customerBO;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public CustomerDTO saveCustomer(@RequestBody @Valid CustomerDTO customer) throws Exception {

        return customerBO.saveCustomer(customer);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping("/{customerId}")
    public void updateCustomer(@PathVariable("customerId") Integer customerId,
                               @RequestBody @Valid CustomerDTO customer) throws Exception {

        customer.setId(customerId);
        customerBO.updateCustomer(customer);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Integer customerId) throws Exception {

        customerBO.deleteCustomerById(customerId);
    }


    @GetMapping
    public List<CustomerDTO> getCustomers(@RequestParam(value = "q", required = false) String query) throws Exception {
        if (query == null) query = "";
        System.out.println("arrieved");

        return customerBO.findCustomers(query);
    }
}

