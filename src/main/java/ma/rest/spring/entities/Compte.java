package ma.rest.spring.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Compte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double solde;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")  // Formatage explicite de la date
    private Date dateCreation;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;
}
