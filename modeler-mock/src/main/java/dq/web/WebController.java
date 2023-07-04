package dq.web;

import dq.mock.config.PathConfig;
import dq.mock.config.rabbit.Constant;
import dq.rqa.*;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/")
@CrossOrigin
@RequiredArgsConstructor
public class WebController {

    private final static String RQA_COLLECTION = "rqa";
    private final static RQADefinition RQA_DEFINITION_INIT = RQADefinition.builder()
            .context("")
            .environment("")
            .rqa(RQA.builder()
                    .loadTest(null)
                    .resilienceTest(null)
                    .build())
            .build();

    private final RabbitTemplate template;
    private final PathConfig paths;
    private final RQADefiniftionRepository rqaDefiniftionRepository;
    private final RQARepository rqaRepository;

    @PostMapping("/rqa")
    void receiveRqaAndSendToQueue(@RequestBody String rqaString) {

        System.out.println(rqaString);

        template.convertAndSend(
                Constant.EXCHANGE,
                Constant.KEY,
                rqaString);


    }

    // Used to initialize the RQADefinition, You can pass a RQADefinition in the body,
    // if you don't it will be initialized with the default (empty) values
    @PostMapping("/rqa/init")
    ResponseEntity<RQADefinition> initRQA(@RequestBody RQADefinition rqaDefinition) {
        if (rqaDefinition != null) {
            rqaDefiniftionRepository.save(rqaDefinition);
        } else {
            rqaDefiniftionRepository.save(RQA_DEFINITION_INIT);
        }
        return ResponseEntity.ok(rqaDefinition);
    }

    // Needs the ID of the RQADefinition and the test to be added/updated
    @PutMapping("/rqa/test/{id}")
    ResponseEntity<RQADefinition> addRqa(@RequestBody ITest test, @PathVariable Long id) {
        System.out.println(test);
        RQADefinition rqaDefinition = rqaDefiniftionRepository.findById(id).orElse(RQA_DEFINITION_INIT);
        if (test instanceof Resiliencetest rTestRequest) {
            try {
                RQA rqa = rqaRepository.findByResilienceTest(List.of(rTestRequest)).orElseThrow(NullPointerException::new);

                for (ITest resilienceTest : rqa.getResilienceTest()) {
                    if (resilienceTest.equals(rTestRequest)) {
                        return ResponseEntity.badRequest().build();
                    } else if (resilienceTest.getId().equals(rTestRequest.getId())) {
                        rqa.getResilienceTest().add(rqa.getResilienceTest().indexOf(resilienceTest), rTestRequest);
                    }
                }
            } catch (NullPointerException e) {
                rqaDefinition.getRqa().getResilienceTest().add(rTestRequest);
            }
            rqaDefinition.getRqa().getResilienceTest().add(rTestRequest);

        } else if (test instanceof Loadtest loadtest) {
            try {
                RQA rqa = rqaRepository.findByLoadTest(List.of(loadtest)).orElseThrow(NullPointerException::new);

                for (ITest loadTest : rqa.getLoadTest()) {
                    if (loadTest.equals(loadtest)) {
                        return ResponseEntity.badRequest().build();
                    } else if (loadTest.getId().equals(loadtest.getId())) {
                        rqa.getLoadTest().add(rqa.getLoadTest().indexOf(loadTest), loadtest);
                    }
                }
            } catch (NullPointerException e) {
                rqaDefinition.getRqa().getLoadTest().add(loadtest);
            }
            rqaDefinition.getRqa().getLoadTest().add(loadtest);

        } else {
            return ResponseEntity.badRequest().build();
        }
        rqaDefiniftionRepository.save(rqaDefinition);
        return ResponseEntity.ok(rqaDefinition);
    }

    //Needs the ID of the RQADefinition and the whole test which should be deleted
    @DeleteMapping("/rqa/test/{id}")
    ResponseEntity<RQADefinition> deleteRqa(@RequestBody ITest test, @PathVariable Long id) {
        System.out.println(test);
        RQADefinition rqaDefinition = null;

        try {
            rqaDefinition = rqaDefiniftionRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
        try {
            if (test instanceof Resiliencetest resiliencetest) {
                rqaRepository.findByResilienceTest(List.of(resiliencetest)).orElseThrow(ChangeSetPersister.NotFoundException::new);
                rqaDefinition.getRqa().getResilienceTest().remove(resiliencetest);
            } else if (test instanceof Loadtest loadtest) {
                rqaRepository.findByLoadTest(List.of(loadtest)).orElseThrow(ChangeSetPersister.NotFoundException::new);
                rqaDefinition.getRqa().getLoadTest().remove(loadtest);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
        rqaDefiniftionRepository.save(rqaDefinition);
        return ResponseEntity.ok(rqaDefinition);
    }

    @PostMapping("/rqa/start")
    void startRqa(@RequestBody RQADefinition rqaDefinition) {
        System.out.println(rqaDefinition);
        //TODO: start rqa
    }
}
