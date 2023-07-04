package dq.rqa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RQA {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(targetEntity = Resiliencetest.class)
    private List<ITest> resilienceTest;

    @OneToMany(targetEntity = Loadtest.class)
    private List<ITest> loadTest;
}
