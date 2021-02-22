package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.Bed;
import at.jiffy.hms.repository.BedRepository;
import at.jiffy.hms.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.jiffy.hms.domain.Bed}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BedResource {

    private final Logger log = LoggerFactory.getLogger(BedResource.class);

    private static final String ENTITY_NAME = "bed";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BedRepository bedRepository;

    public BedResource(BedRepository bedRepository) {
        this.bedRepository = bedRepository;
    }

    /**
     * {@code POST  /beds} : Create a new bed.
     *
     * @param bed the bed to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bed, or with status {@code 400 (Bad Request)} if the bed has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/beds")
    public ResponseEntity<Bed> createBed(@Valid @RequestBody Bed bed) throws URISyntaxException {
        log.debug("REST request to save Bed : {}", bed);
        if (bed.getId() != null) {
            throw new BadRequestAlertException("A new bed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Bed result = bedRepository.save(bed);
        return ResponseEntity.created(new URI("/api/beds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /beds} : Updates an existing bed.
     *
     * @param bed the bed to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bed,
     * or with status {@code 400 (Bad Request)} if the bed is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bed couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/beds")
    public ResponseEntity<Bed> updateBed(@Valid @RequestBody Bed bed) throws URISyntaxException {
        log.debug("REST request to update Bed : {}", bed);
        if (bed.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Bed result = bedRepository.save(bed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bed.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /beds} : get all the beds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of beds in body.
     */
    @GetMapping("/beds")
    public List<Bed> getAllBeds() {
        log.debug("REST request to get all Beds");
        return bedRepository.findAll();
    }

    /**
     * {@code GET  /beds/:id} : get the "id" bed.
     *
     * @param id the id of the bed to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bed, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/beds/{id}")
    public ResponseEntity<Bed> getBed(@PathVariable Long id) {
        log.debug("REST request to get Bed : {}", id);
        Optional<Bed> bed = bedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bed);
    }

    /**
     * {@code DELETE  /beds/:id} : delete the "id" bed.
     *
     * @param id the id of the bed to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/beds/{id}")
    public ResponseEntity<Void> deleteBed(@PathVariable Long id) {
        log.debug("REST request to delete Bed : {}", id);
        bedRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
