package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.MeasurementUnit;
import at.jiffy.hms.repository.MeasurementUnitRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.MeasurementUnit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MeasurementUnitResource {

    private final Logger log = LoggerFactory.getLogger(MeasurementUnitResource.class);

    private static final String ENTITY_NAME = "measurementUnit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MeasurementUnitRepository measurementUnitRepository;

    public MeasurementUnitResource(MeasurementUnitRepository measurementUnitRepository) {
        this.measurementUnitRepository = measurementUnitRepository;
    }

    /**
     * {@code POST  /measurement-units} : Create a new measurementUnit.
     *
     * @param measurementUnit the measurementUnit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new measurementUnit, or with status {@code 400 (Bad Request)} if the measurementUnit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/measurement-units")
    public ResponseEntity<MeasurementUnit> createMeasurementUnit(@Valid @RequestBody MeasurementUnit measurementUnit) throws URISyntaxException {
        log.debug("REST request to save MeasurementUnit : {}", measurementUnit);
        if (measurementUnit.getId() != null) {
            throw new BadRequestAlertException("A new measurementUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MeasurementUnit result = measurementUnitRepository.save(measurementUnit);
        return ResponseEntity.created(new URI("/api/measurement-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /measurement-units} : Updates an existing measurementUnit.
     *
     * @param measurementUnit the measurementUnit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated measurementUnit,
     * or with status {@code 400 (Bad Request)} if the measurementUnit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the measurementUnit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/measurement-units")
    public ResponseEntity<MeasurementUnit> updateMeasurementUnit(@Valid @RequestBody MeasurementUnit measurementUnit) throws URISyntaxException {
        log.debug("REST request to update MeasurementUnit : {}", measurementUnit);
        if (measurementUnit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MeasurementUnit result = measurementUnitRepository.save(measurementUnit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, measurementUnit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /measurement-units} : get all the measurementUnits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of measurementUnits in body.
     */
    @GetMapping("/measurement-units")
    public List<MeasurementUnit> getAllMeasurementUnits() {
        log.debug("REST request to get all MeasurementUnits");
        return measurementUnitRepository.findAll();
    }

    /**
     * {@code GET  /measurement-units/:id} : get the "id" measurementUnit.
     *
     * @param id the id of the measurementUnit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the measurementUnit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/measurement-units/{id}")
    public ResponseEntity<MeasurementUnit> getMeasurementUnit(@PathVariable Long id) {
        log.debug("REST request to get MeasurementUnit : {}", id);
        Optional<MeasurementUnit> measurementUnit = measurementUnitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(measurementUnit);
    }

    /**
     * {@code DELETE  /measurement-units/:id} : delete the "id" measurementUnit.
     *
     * @param id the id of the measurementUnit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/measurement-units/{id}")
    public ResponseEntity<Void> deleteMeasurementUnit(@PathVariable Long id) {
        log.debug("REST request to delete MeasurementUnit : {}", id);
        measurementUnitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
