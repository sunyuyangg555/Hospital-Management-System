package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.MedicineCategory;
import at.jiffy.hms.repository.MedicineCategoryRepository;

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
 * Integration tests for the {@link MedicineCategoryResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MedicineCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTIONS = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTIONS = "BBBBBBBBBB";

    @Autowired
    private MedicineCategoryRepository medicineCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicineCategoryMockMvc;

    private MedicineCategory medicineCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicineCategory createEntity(EntityManager em) {
        MedicineCategory medicineCategory = new MedicineCategory()
            .name(DEFAULT_NAME)
            .descriptions(DEFAULT_DESCRIPTIONS);
        return medicineCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicineCategory createUpdatedEntity(EntityManager em) {
        MedicineCategory medicineCategory = new MedicineCategory()
            .name(UPDATED_NAME)
            .descriptions(UPDATED_DESCRIPTIONS);
        return medicineCategory;
    }

    @BeforeEach
    public void initTest() {
        medicineCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicineCategory() throws Exception {
        int databaseSizeBeforeCreate = medicineCategoryRepository.findAll().size();
        // Create the MedicineCategory
        restMedicineCategoryMockMvc.perform(post("/api/medicine-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineCategory)))
            .andExpect(status().isCreated());

        // Validate the MedicineCategory in the database
        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        MedicineCategory testMedicineCategory = medicineCategoryList.get(medicineCategoryList.size() - 1);
        assertThat(testMedicineCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMedicineCategory.getDescriptions()).isEqualTo(DEFAULT_DESCRIPTIONS);
    }

    @Test
    @Transactional
    public void createMedicineCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicineCategoryRepository.findAll().size();

        // Create the MedicineCategory with an existing ID
        medicineCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicineCategoryMockMvc.perform(post("/api/medicine-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineCategory)))
            .andExpect(status().isBadRequest());

        // Validate the MedicineCategory in the database
        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = medicineCategoryRepository.findAll().size();
        // set the field null
        medicineCategory.setName(null);

        // Create the MedicineCategory, which fails.


        restMedicineCategoryMockMvc.perform(post("/api/medicine-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineCategory)))
            .andExpect(status().isBadRequest());

        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMedicineCategories() throws Exception {
        // Initialize the database
        medicineCategoryRepository.saveAndFlush(medicineCategory);

        // Get all the medicineCategoryList
        restMedicineCategoryMockMvc.perform(get("/api/medicine-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicineCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].descriptions").value(hasItem(DEFAULT_DESCRIPTIONS)));
    }
    
    @Test
    @Transactional
    public void getMedicineCategory() throws Exception {
        // Initialize the database
        medicineCategoryRepository.saveAndFlush(medicineCategory);

        // Get the medicineCategory
        restMedicineCategoryMockMvc.perform(get("/api/medicine-categories/{id}", medicineCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicineCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.descriptions").value(DEFAULT_DESCRIPTIONS));
    }
    @Test
    @Transactional
    public void getNonExistingMedicineCategory() throws Exception {
        // Get the medicineCategory
        restMedicineCategoryMockMvc.perform(get("/api/medicine-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicineCategory() throws Exception {
        // Initialize the database
        medicineCategoryRepository.saveAndFlush(medicineCategory);

        int databaseSizeBeforeUpdate = medicineCategoryRepository.findAll().size();

        // Update the medicineCategory
        MedicineCategory updatedMedicineCategory = medicineCategoryRepository.findById(medicineCategory.getId()).get();
        // Disconnect from session so that the updates on updatedMedicineCategory are not directly saved in db
        em.detach(updatedMedicineCategory);
        updatedMedicineCategory
            .name(UPDATED_NAME)
            .descriptions(UPDATED_DESCRIPTIONS);

        restMedicineCategoryMockMvc.perform(put("/api/medicine-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicineCategory)))
            .andExpect(status().isOk());

        // Validate the MedicineCategory in the database
        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeUpdate);
        MedicineCategory testMedicineCategory = medicineCategoryList.get(medicineCategoryList.size() - 1);
        assertThat(testMedicineCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMedicineCategory.getDescriptions()).isEqualTo(UPDATED_DESCRIPTIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicineCategory() throws Exception {
        int databaseSizeBeforeUpdate = medicineCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicineCategoryMockMvc.perform(put("/api/medicine-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicineCategory)))
            .andExpect(status().isBadRequest());

        // Validate the MedicineCategory in the database
        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicineCategory() throws Exception {
        // Initialize the database
        medicineCategoryRepository.saveAndFlush(medicineCategory);

        int databaseSizeBeforeDelete = medicineCategoryRepository.findAll().size();

        // Delete the medicineCategory
        restMedicineCategoryMockMvc.perform(delete("/api/medicine-categories/{id}", medicineCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedicineCategory> medicineCategoryList = medicineCategoryRepository.findAll();
        assertThat(medicineCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
