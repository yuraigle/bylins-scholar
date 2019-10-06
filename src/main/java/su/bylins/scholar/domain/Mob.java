package su.bylins.scholar.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "mobs")
public class Mob {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ZONE_N", nullable = false)
    private Zone zone;

    @Column(name = "N")
    private Integer n;

    @Column(name = "DESCR", length = 128, nullable = false)
    private String descr;

    @Column(name = "ALIAS", length = 24, nullable = false)
    private String alias;

    @Column(name = "NAME_IME", length = 48, nullable = false)
    private String nameIme;

    @Column(name = "NAME_ROD", length = 48)
    private String nameRod;

    @Column(name = "NAME_DAT", length = 48)
    private String nameDat;

    @Column(name = "NAME_VIN", length = 48)
    private String nameVin;

    @Column(name = "NAME_TVO", length = 48)
    private String nameTvo;

    @Column(name = "NAME_PRE", length = 48)
    private String namePre;

    @Column(name = "LVL")
    private Integer lvl;

    @Column(name = "FLAG", length = 128)
    private String flag;
}
