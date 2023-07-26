package lk.ijse.dep10.app.api;

import lk.ijse.dep10.app.business.custom.ItemBO;
import lk.ijse.dep10.app.dto.ItemDTO;
import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/api/v1/items")
public class ItemController {
   private final ItemBO itemBO;

    public ItemController(ItemBO itemBO) {
        this.itemBO = itemBO;
    }


    @GetMapping("/{itemCode}")
    public ItemDTO getItem(@PathVariable String itemCode) throws Exception {
        return itemBO.findItemByCode(itemCode);
    }

    @GetMapping
    public List<ItemDTO> getItems(@RequestParam(value = "q", required = false) String query) throws Exception {
        if (query == null) query = "";

        return itemBO.findItems(query);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = "application/json")
    public void saveItem(@RequestBody @Valid ItemDTO item) throws Exception {

        itemBO.saveItem(item);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping(value = "/{itemCode}", consumes = "application/json")
    public void updateItem(@RequestBody @Valid ItemDTO item,
                           @PathVariable String itemCode) throws Exception {
        item.setCode(itemCode);
        itemBO.updateItem(item);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{itemCode}")
    public void deleteItem(@PathVariable String itemCode) throws Exception {
        itemBO.deleteItemByCode(itemCode);
    }
}
