package dq.rqa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RQADefinition {
    @Id
    @GeneratedValue
    private Long id;

    private String context;

    private String environment;

    @OneToOne(targetEntity = RQA.class)
    private RQA rqa;
}
