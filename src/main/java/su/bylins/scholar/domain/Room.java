package su.bylins.scholar.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ZONE_N", nullable = false)
    private Zone zone;

    @Column(name = "N")
    private Integer n;

    @Column(name = "TITLE", length = 48, nullable = false)
    private String title;

    @Column(name = "EXITS", length = 10, nullable = false)
    private String exits;

    @Column(name = "DESCR", length = 512)
    private String descr;

    @Column(name = "NOAGR")
    private Boolean noagr;

    @Column(name = "NOMAGIC")
    private Boolean nomagic;

    @Column(name = "FLAG", length = 128)
    private String flag;
}
