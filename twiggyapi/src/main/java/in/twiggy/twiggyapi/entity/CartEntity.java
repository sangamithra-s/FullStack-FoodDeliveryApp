package in.twiggy.twiggyapi.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection="cart")
public class CartEntity {
    @Id
    private String id;
    private String userId;
    private Map<String,Integer> items=new HashMap<>();

    public CartEntity(String loggedInUserId, HashMap<String, Integer> stringIntegerHashMap) {
        this.userId = loggedInUserId;
        this.items = stringIntegerHashMap;
    }

    }



