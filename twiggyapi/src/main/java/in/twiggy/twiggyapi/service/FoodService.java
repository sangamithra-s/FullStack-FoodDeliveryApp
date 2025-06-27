package in.twiggy.twiggyapi.service;

import in.twiggy.twiggyapi.io.FoodRequest;
import in.twiggy.twiggyapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file) throws IOException;

    FoodResponse addFood(FoodRequest request, MultipartFile file) throws IOException;

    List<FoodResponse> readFoods();

    FoodResponse readFood(String id);

    Boolean deleteFile(String fileName);

    void deleteFood(String Id);
}
