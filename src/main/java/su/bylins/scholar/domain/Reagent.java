package su.bylins.scholar.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "reagents")
public class Reagent {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "NAME", length = 32, nullable = false)
    private String name;

    @Column(name = "TYPE", length = 12, nullable = false)
    private String type;

    @Column(name = "TYPE2", length = 12)
    private String type2;

    @Column(name = "QUALITY", length = 24)
    private String quality;

    @Column(name = "NAME2", length = 32)
    private String name2;
}
