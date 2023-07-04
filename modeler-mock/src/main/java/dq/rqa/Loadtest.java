package dq.rqa;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Loadtest implements ITest {

    @Id
    @GeneratedValue
    private Long id;
    private String paramization;
    private double response_measure;
    private double response_metrics;
    private String artifact;
    private String descrption;

}
