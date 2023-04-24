package dq.web;

import dq.mock.config.PathConfig;
import dq.mock.config.rabbit.Constant;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;

@RestController
@RequestMapping("/api/")
@CrossOrigin
public class WebController {
    @Autowired
    private RabbitTemplate template;
    @Autowired
    private PathConfig paths;
    @PostMapping("/rqa")
    void receiveRqaAndSendToQueue(@RequestBody String rqaString) {

        System.out.println(rqaString);

        template.convertAndSend(
                Constant.EXCHANGE,
                Constant.KEY,
                rqaString);



    }

}
