package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.ConsultationResource;
import at.jiffy.hms.repository.ConsultationResourceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ConsultationResourceResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConsultationResourceResourceIT {

    private static final LocalDate DEFAULT_FROMDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FROMDATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TODATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TODATE = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Boolean DEFAULT_IS_ADMITTED = false;
    private static final Boolean UPDATED_IS_ADMITTED = true;

    @Autowired
    private ConsultationResourceRepository consultationResourceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsultationResourceMockMvc;

    private ConsultationResource consultationResource;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsultationResource createEntity(EntityManager em) {
        ConsultationResource consultationResource = new ConsultationResource()
            .fromdate(DEFAULT_FROMDATE)
            .todate(DEFAULT_TODATE)
            .isActive(DEFAULT_IS_ACTIVE)
            .isAdmitted(DEFAULT_IS_ADMITTED);
        return consultationResource;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConsultationResource createUpdatedEntity(EntityManager em) {
        ConsultationResource consultationResource = new ConsultationResource()
            .fromdate(UPDATED_FROMDATE)
            .todate(UPDATED_TODATE)
            .isActive(UPDATED_IS_ACTIVE)
            .isAdmitted(UPDATED_IS_ADMITTED);
        return consultationResource;
    }

    @BeforeEach
    public void initTest() {
        consultationResource = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultationResource() throws Exception {
        int databaseSizeBeforeCreate = consultationResourceRepository.findAll().size();
        // Create the ConsultationResource
        restConsultationResourceMockMvc.perform(post("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultationResource)))
            .andExpect(status().isCreated());

        // Validate the ConsultationResource in the database
        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeCreate + 1);
        ConsultationResource testConsultationResource = consultationResourceList.get(consultationResourceList.size() - 1);
        assertThat(testConsultationResource.getFromdate()).isEqualTo(DEFAULT_FROMDATE);
        assertThat(testConsultationResource.getTodate()).isEqualTo(DEFAULT_TODATE);
        assertThat(testConsultationResource.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testConsultationResource.isIsAdmitted()).isEqualTo(DEFAULT_IS_ADMITTED);
    }

    @Test
    @Transactional
    public void createConsultationResourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultationResourceRepository.findAll().size();

        // Create the ConsultationResource with an existing ID
        consultationResource.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultationResourceMockMvc.perform(post("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultationResource)))
            .andExpect(status().isBadRequest());

        // Validate the ConsultationResource in the database
        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFromdateIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultationResourceRepository.findAll().size();
        // set the field null
        consultationResource.setFromdate(null);

        // Create the ConsultationResource, which fails.


        restConsultationResourceMockMvc.perform(post("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultationResource)))
            .andExpect(status().isBadRequest());

        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTodateIsRequired() throws Exception {
        int databaseSizeBeforeTest = consultationResourceRepository.findAll().size();
        // set the field null
        consultationResource.setTodate(null);

        // Create the ConsultationResource, which fails.


        restConsultationResourceMockMvc.perform(post("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultationResource)))
            .andExpect(status().isBadRequest());

        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConsultationResources() throws Exception {
        // Initialize the database
        consultationResourceRepository.saveAndFlush(consultationResource);

        // Get all the consultationResourceList
        restConsultationResourceMockMvc.perform(get("/api/consultation-resources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultationResource.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromdate").value(hasItem(DEFAULT_FROMDATE.toString())))
            .andExpect(jsonPath("$.[*].todate").value(hasItem(DEFAULT_TODATE.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].isAdmitted").value(hasItem(DEFAULT_IS_ADMITTED.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getConsultationResource() throws Exception {
        // Initialize the database
        consultationResourceRepository.saveAndFlush(consultationResource);

        // Get the consultationResource
        restConsultationResourceMockMvc.perform(get("/api/consultation-resources/{id}", consultationResource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consultationResource.getId().intValue()))
            .andExpect(jsonPath("$.fromdate").value(DEFAULT_FROMDATE.toString()))
            .andExpect(jsonPath("$.todate").value(DEFAULT_TODATE.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.isAdmitted").value(DEFAULT_IS_ADMITTED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingConsultationResource() throws Exception {
        // Get the consultationResource
        restConsultationResourceMockMvc.perform(get("/api/consultation-resources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultationResource() throws Exception {
        // Initialize the database
        consultationResourceRepository.saveAndFlush(consultationResource);

        int databaseSizeBeforeUpdate = consultationResourceRepository.findAll().size();

        // Update the consultationResource
        ConsultationResource updatedConsultationResource = consultationResourceRepository.findById(consultationResource.getId()).get();
        // Disconnect from session so that the updates on updatedConsultationResource are not directly saved in db
        em.detach(updatedConsultationResource);
        updatedConsultationResource
            .fromdate(UPDATED_FROMDATE)
            .todate(UPDATED_TODATE)
            .isActive(UPDATED_IS_ACTIVE)
            .isAdmitted(UPDATED_IS_ADMITTED);

        restConsultationResourceMockMvc.perform(put("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultationResource)))
            .andExpect(status().isOk());

        // Validate the ConsultationResource in the database
        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeUpdate);
        ConsultationResource testConsultationResource = consultationResourceList.get(consultationResourceList.size() - 1);
        assertThat(testConsultationResource.getFromdate()).isEqualTo(UPDATED_FROMDATE);
        assertThat(testConsultationResource.getTodate()).isEqualTo(UPDATED_TODATE);
        assertThat(testConsultationResource.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testConsultationResource.isIsAdmitted()).isEqualTo(UPDATED_IS_ADMITTED);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultationResource() throws Exception {
        int databaseSizeBeforeUpdate = consultationResourceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultationResourceMockMvc.perform(put("/api/consultation-resources")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultationResource)))
            .andExpect(status().isBadRequest());

        // Validate the ConsultationResource in the database
        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultationResource() throws Exception {
        // Initialize the database
        consultationResourceRepository.saveAndFlush(consultationResource);

        int databaseSizeBeforeDelete = consultationResourceRepository.findAll().size();

        // Delete the consultationResource
        restConsultationResourceMockMvc.perform(delete("/api/consultation-resources/{id}", consultationResource.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ConsultationResource> consultationResourceList = consultationResourceRepository.findAll();
        assertThat(consultationResourceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
