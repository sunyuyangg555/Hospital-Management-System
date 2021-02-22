package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.MedicalService;
import at.jiffy.hms.repository.MedicalServiceRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MedicalServiceResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MedicalServiceResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    @Autowired
    private MedicalServiceRepository medicalServiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicalServiceMockMvc;

    private MedicalService medicalService;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicalService createEntity(EntityManager em) {
        MedicalService medicalService = new MedicalService()
            .name(DEFAULT_NAME)
            .isActive(DEFAULT_IS_ACTIVE)
            .price(DEFAULT_PRICE);
        return medicalService;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicalService createUpdatedEntity(EntityManager em) {
        MedicalService medicalService = new MedicalService()
            .name(UPDATED_NAME)
            .isActive(UPDATED_IS_ACTIVE)
            .price(UPDATED_PRICE);
        return medicalService;
    }

    @BeforeEach
    public void initTest() {
        medicalService = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicalService() throws Exception {
        int databaseSizeBeforeCreate = medicalServiceRepository.findAll().size();
        // Create the MedicalService
        restMedicalServiceMockMvc.perform(post("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalService)))
            .andExpect(status().isCreated());

        // Validate the MedicalService in the database
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeCreate + 1);
        MedicalService testMedicalService = medicalServiceList.get(medicalServiceList.size() - 1);
        assertThat(testMedicalService.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMedicalService.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testMedicalService.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createMedicalServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicalServiceRepository.findAll().size();

        // Create the MedicalService with an existing ID
        medicalService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicalServiceMockMvc.perform(post("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalService)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalService in the database
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIsActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicalServiceRepository.findAll().size();
        // set the field null
        medicalService.setIsActive(null);

        // Create the MedicalService, which fails.


        restMedicalServiceMockMvc.perform(post("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalService)))
            .andExpect(status().isBadRequest());

        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicalServiceRepository.findAll().size();
        // set the field null
        medicalService.setPrice(null);

        // Create the MedicalService, which fails.


        restMedicalServiceMockMvc.perform(post("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalService)))
            .andExpect(status().isBadRequest());

        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedicalServices() throws Exception {
        // Initialize the database
        medicalServiceRepository.saveAndFlush(medicalService);

        // Get all the medicalServiceList
        restMedicalServiceMockMvc.perform(get("/api/medical-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicalService.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMedicalService() throws Exception {
        // Initialize the database
        medicalServiceRepository.saveAndFlush(medicalService);

        // Get the medicalService
        restMedicalServiceMockMvc.perform(get("/api/medical-services/{id}", medicalService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicalService.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMedicalService() throws Exception {
        // Get the medicalService
        restMedicalServiceMockMvc.perform(get("/api/medical-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicalService() throws Exception {
        // Initialize the database
        medicalServiceRepository.saveAndFlush(medicalService);

        int databaseSizeBeforeUpdate = medicalServiceRepository.findAll().size();

        // Update the medicalService
        MedicalService updatedMedicalService = medicalServiceRepository.findById(medicalService.getId()).get();
        // Disconnect from session so that the updates on updatedMedicalService are not directly saved in db
        em.detach(updatedMedicalService);
        updatedMedicalService
            .name(UPDATED_NAME)
            .isActive(UPDATED_IS_ACTIVE)
            .price(UPDATED_PRICE);

        restMedicalServiceMockMvc.perform(put("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicalService)))
            .andExpect(status().isOk());

        // Validate the MedicalService in the database
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeUpdate);
        MedicalService testMedicalService = medicalServiceList.get(medicalServiceList.size() - 1);
        assertThat(testMedicalService.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMedicalService.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testMedicalService.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicalService() throws Exception {
        int databaseSizeBeforeUpdate = medicalServiceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicalServiceMockMvc.perform(put("/api/medical-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalService)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalService in the database
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicalService() throws Exception {
        // Initialize the database
        medicalServiceRepository.saveAndFlush(medicalService);

        int databaseSizeBeforeDelete = medicalServiceRepository.findAll().size();

        // Delete the medicalService
        restMedicalServiceMockMvc.perform(delete("/api/medical-services/{id}", medicalService.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedicalService> medicalServiceList = medicalServiceRepository.findAll();
        assertThat(medicalServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
