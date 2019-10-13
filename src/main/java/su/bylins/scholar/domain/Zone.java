package su.bylins.scholar.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "zones")
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "N", unique = true, nullable = false)
    private Integer n;

    @Column(name = "NAME", length = 64, nullable = false)
    private String name;

    @Column(name = "REPOP")
    private Integer repop;
}
