package su.bylins.scholar.rest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import su.bylins.scholar.domain.Zone;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "zones", path = "zones")
public interface ZoneRepository extends JpaRepository<Zone, Integer> {

    List<Zone> findAllByNameContaining(String name);
}
