package dq.rqa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Resiliencetest implements ITest {
    @Id
    @GeneratedValue
    private Long id;

    private String artifact;

    private String descrption;

}
