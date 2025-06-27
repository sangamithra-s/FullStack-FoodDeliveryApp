package in.twiggy.twiggyapi.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodEntity {

    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private String ImageUrl;


}
