package in.twiggy.twiggyapi.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequest {
    public String userAddress;
    public double amount;
    public List<OrderItem> orderedItems;
    private String phoneNumber;
    private String email;
    private String orderStatus;

}
