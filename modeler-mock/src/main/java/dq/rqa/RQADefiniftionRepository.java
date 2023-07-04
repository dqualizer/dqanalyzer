package dq.rqa;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RQADefiniftionRepository extends MongoRepository<RQADefinition, Long> {

    List<RQADefinition> findByRqa(RQA rqa);

}
