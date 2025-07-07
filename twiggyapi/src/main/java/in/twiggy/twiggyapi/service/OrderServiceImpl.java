package in.twiggy.twiggyapi.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.twiggy.twiggyapi.entity.OrderEntity;
import in.twiggy.twiggyapi.io.OrderRequest;
import in.twiggy.twiggyapi.io.OrderResponse;
import in.twiggy.twiggyapi.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService{

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserService userService;


    @Override
    public OrderResponse createOrderWithPayment(OrderRequest orderRequest) throws RazorpayException {
        OrderEntity newOrder= ConvertToEntity(orderRequest);

        //create razorpay payment order
        RazorpayClient razorpayClient=new RazorpayClient("rzp_test_8b1d2c3d4e5f6g7h8i", "your_secret_key_here");
        JSONObject orderRequestJson = new JSONObject();
        orderRequestJson.put("amount", (int) (orderRequest.getAmount() * 100)); // amount in paise
        orderRequestJson.put("currency", "INR");
        orderRequestJson.put("payment_capture", 1); // auto capture
        Order razorpayOrder = razorpayClient.orders.create(orderRequestJson);
        newOrder.setRazorpayOrderId(razorpayOrder.get("id").toString());

        //set order status
        String loggedinUserId= userService.FindByUserId();
        newOrder.setUserId(loggedinUserId);
        newOrder= orderRepository.save(newOrder);
        return OrderResponse.builder()
                .id(newOrder.getId())
                .userId(newOrder.getUserId())
                .userAddress(newOrder.getUserAddress())
                .phoneNumber(newOrder.getPhoneNumber())
                .email(newOrder.getEmail())
                .amount(newOrder.getAmount())
                .paymentStatus(newOrder.getPaymentStatus())
                .razorpayOrderId(newOrder.getRazorpayOrderId())
                .orderStatus(newOrder.getOrderStatus())
                .build();


    }

    private OrderEntity ConvertToEntity(OrderRequest orderRequest) {
        return OrderEntity.builder()
                .phoneNumber(orderRequest.getPhoneNumber())
                .email(orderRequest.getEmail())
                .paymentStatus(orderRequest.getOrderStatus())
                .userAddress(orderRequest.getUserAddress())
                .amount(orderRequest.getAmount())
                .orderedItems(orderRequest.getOrderedItems())
                .build();

    }
}
