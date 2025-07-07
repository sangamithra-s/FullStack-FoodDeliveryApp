package in.twiggy.twiggyapi.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItem {
    private String foodId;
    private String Category;
    private String imageUrl;
    private int quantity;
    private double price;
    private String description;
    private String name;
}
