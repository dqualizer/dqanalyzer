package dq.rqa;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RQARepository extends MongoRepository<RQA, Long> {
    Optional<RQA> findByResilienceTest(List<ITest> resilienceTest);

    Optional<RQA> findByLoadTest(List<ITest> loadTest);
}
