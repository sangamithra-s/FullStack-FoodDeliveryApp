package in.twiggy.twiggyapi.service;

import in.twiggy.twiggyapi.entity.FoodEntity;
import in.twiggy.twiggyapi.io.FoodRequest;
import in.twiggy.twiggyapi.io.FoodResponse;
import in.twiggy.twiggyapi.repository.FoodRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FoodServiceImpl implements  FoodService{



    private final S3Client s3Client;
    private final FoodRepository foodRepository;

    @Value("${aws.s3.bucketname}")
    private String bucketName;

    @Autowired
    public FoodServiceImpl(S3Client s3Client, FoodRepository foodRepository) {
        this.s3Client = s3Client;
        this.foodRepository = foodRepository;
    }


    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String filenameExtension=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String key=UUID.randomUUID().toString()+"."+filenameExtension;

            PutObjectRequest putObjectRequest=PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .acl("public-read")
                    .contentType(file.getContentType())
                    .build();
        System.out.println("Uploading to bucket: " + bucketName);
        PutObjectResponse response=s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        if (response.sdkHttpResponse().isSuccessful()){
            return "https://"+bucketName+".s3.amazonaws.com/"+key;
        }else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"File upload failed");
        }

    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) throws IOException {
        FoodEntity newFoodEntity=convertToEntity(request);
        String imageUrl=uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
        foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);

    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries=foodRepository.findAll();
        return databaseEntries.stream().map(object->convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity response=foodRepository.findById(id).orElseThrow(()->new RuntimeException("food not found"+id));
        return convertToResponse(response);
    }

    @Override
    public Boolean deleteFile(String filename) {
        DeleteObjectRequest deleteObjectRequest=DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteFood(String id) {
        FoodResponse response=readFood(id);
        String imageurl=response.getImageUrl();
        String filename=imageurl.substring(imageurl.lastIndexOf("/")+1);
        boolean isFileDeleted=deleteFile(filename);
        if(isFileDeleted){
            foodRepository.deleteById(response.getId());
        }

    }


    private FoodEntity convertToEntity(FoodRequest request){
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity){
        return FoodResponse.builder()
                .id(entity.getId())
                .price(entity.getPrice())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .imageUrl(entity.getImageUrl())
                .build();


    }




}
