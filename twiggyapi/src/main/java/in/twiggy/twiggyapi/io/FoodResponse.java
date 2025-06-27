package in.twiggy.twiggyapi.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodResponse {

    private String name;
    private String description;
    private String category;
    private Double price;
    private String imageUrl;
    private String id;


}
