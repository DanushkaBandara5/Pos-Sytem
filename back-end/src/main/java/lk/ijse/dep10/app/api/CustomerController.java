package lk.ijse.dep10.app.api;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin
public class CustomerController {
    @GetMapping
    public String getCustomers(){
        return "<h1>Hello Spring Framework</h1>";
    }
}
