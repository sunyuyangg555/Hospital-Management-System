package at.jiffy.hms.web.rest;

import at.jiffy.hms.domain.ConsultationResource;
import at.jiffy.hms.repository.ConsultationResourceRepository;
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
 * REST controller for managing {@link at.jiffy.hms.domain.ConsultationResource}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConsultationResourceResource {

    private final Logger log = LoggerFactory.getLogger(ConsultationResourceResource.class);

    private static final String ENTITY_NAME = "consultationResource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConsultationResourceRepository consultationResourceRepository;

    public ConsultationResourceResource(ConsultationResourceRepository consultationResourceRepository) {
        this.consultationResourceRepository = consultationResourceRepository;
    }

    /**
     * {@code POST  /consultation-resources} : Create a new consultationResource.
     *
     * @param consultationResource the consultationResource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new consultationResource, or with status {@code 400 (Bad Request)} if the consultationResource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/consultation-resources")
    public ResponseEntity<ConsultationResource> createConsultationResource(@Valid @RequestBody ConsultationResource consultationResource) throws URISyntaxException {
        log.debug("REST request to save ConsultationResource : {}", consultationResource);
        if (consultationResource.getId() != null) {
            throw new BadRequestAlertException("A new consultationResource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConsultationResource result = consultationResourceRepository.save(consultationResource);
        return ResponseEntity.created(new URI("/api/consultation-resources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /consultation-resources} : Updates an existing consultationResource.
     *
     * @param consultationResource the consultationResource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated consultationResource,
     * or with status {@code 400 (Bad Request)} if the consultationResource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the consultationResource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/consultation-resources")
    public ResponseEntity<ConsultationResource> updateConsultationResource(@Valid @RequestBody ConsultationResource consultationResource) throws URISyntaxException {
        log.debug("REST request to update ConsultationResource : {}", consultationResource);
        if (consultationResource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ConsultationResource result = consultationResourceRepository.save(consultationResource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, consultationResource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /consultation-resources} : get all the consultationResources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of consultationResources in body.
     */
    @GetMapping("/consultation-resources")
    public List<ConsultationResource> getAllConsultationResources() {
        log.debug("REST request to get all ConsultationResources");
        return consultationResourceRepository.findAll();
    }

    /**
     * {@code GET  /consultation-resources/:id} : get the "id" consultationResource.
     *
     * @param id the id of the consultationResource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the consultationResource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/consultation-resources/{id}")
    public ResponseEntity<ConsultationResource> getConsultationResource(@PathVariable Long id) {
        log.debug("REST request to get ConsultationResource : {}", id);
        Optional<ConsultationResource> consultationResource = consultationResourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consultationResource);
    }

    /**
     * {@code DELETE  /consultation-resources/:id} : delete the "id" consultationResource.
     *
     * @param id the id of the consultationResource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/consultation-resources/{id}")
    public ResponseEntity<Void> deleteConsultationResource(@PathVariable Long id) {
        log.debug("REST request to delete ConsultationResource : {}", id);
        consultationResourceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
