package su.bylins.scholar.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "zones")
public class Zone {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "N", unique = true, nullable = false)
    private Integer n;

    @Column(name = "NAME", length = 64, nullable = false)
    private String name;

    @Column(name = "REPOP")
    private Integer repop;
}
