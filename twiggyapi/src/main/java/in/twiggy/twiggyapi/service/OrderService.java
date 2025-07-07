package in.twiggy.twiggyapi.service;

import com.razorpay.RazorpayException;
import in.twiggy.twiggyapi.io.OrderRequest;
import in.twiggy.twiggyapi.io.OrderResponse;

public interface OrderService {

    public OrderResponse createOrderWithPayment(OrderRequest orderRequest) throws RazorpayException;
}
