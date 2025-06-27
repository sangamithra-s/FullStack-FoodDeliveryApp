package in.twiggy.twiggyapi.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.twiggy.twiggyapi.io.FoodRequest;
import in.twiggy.twiggyapi.io.FoodResponse;
import in.twiggy.twiggyapi.service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.runtime.ObjectMethods;
import java.util.List;


@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin("*")
public class FoodController {

    private final FoodService foodService;

    @PostMapping
    public FoodResponse addFood(@RequestPart("food") String foodString, @RequestPart("file")MultipartFile file) throws IOException {
        ObjectMapper objectMapper=new ObjectMapper();
        FoodRequest request=null;
        request=objectMapper.readValue(foodString,FoodRequest.class);
        FoodResponse response=foodService.addFood(request,file);
        return response;

    }

    @GetMapping
    public List<FoodResponse> readFoods(){
        return foodService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable String id){
        return foodService.readFood(id);
    }

    @DeleteMapping("/{id}")
    public void DeleteFood(@PathVariable String id){
        foodService.deleteFood(id);
    }
}
