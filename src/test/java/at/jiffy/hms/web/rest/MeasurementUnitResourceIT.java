package at.jiffy.hms.web.rest;

import at.jiffy.hms.HospitalManagementSystemApp;
import at.jiffy.hms.domain.MeasurementUnit;
import at.jiffy.hms.repository.MeasurementUnitRepository;

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
 * Integration tests for the {@link MeasurementUnitResource} REST controller.
 */
@SpringBootTest(classes = HospitalManagementSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasurementUnitResourceIT {

    private static final String DEFAULT_UNIT = "AAAAAAAAAA";
    private static final String UPDATED_UNIT = "BBBBBBBBBB";

    private static final String DEFAULT_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_SYMBOL = "BBBBBBBBBB";

    private static final String DEFAULT_QUANTITY = "AAAAAAAAAA";
    private static final String UPDATED_QUANTITY = "BBBBBBBBBB";

    @Autowired
    private MeasurementUnitRepository measurementUnitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasurementUnitMockMvc;

    private MeasurementUnit measurementUnit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurementUnit createEntity(EntityManager em) {
        MeasurementUnit measurementUnit = new MeasurementUnit()
            .unit(DEFAULT_UNIT)
            .symbol(DEFAULT_SYMBOL)
            .quantity(DEFAULT_QUANTITY);
        return measurementUnit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MeasurementUnit createUpdatedEntity(EntityManager em) {
        MeasurementUnit measurementUnit = new MeasurementUnit()
            .unit(UPDATED_UNIT)
            .symbol(UPDATED_SYMBOL)
            .quantity(UPDATED_QUANTITY);
        return measurementUnit;
    }

    @BeforeEach
    public void initTest() {
        measurementUnit = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasurementUnit() throws Exception {
        int databaseSizeBeforeCreate = measurementUnitRepository.findAll().size();
        // Create the MeasurementUnit
        restMeasurementUnitMockMvc.perform(post("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurementUnit)))
            .andExpect(status().isCreated());

        // Validate the MeasurementUnit in the database
        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeCreate + 1);
        MeasurementUnit testMeasurementUnit = measurementUnitList.get(measurementUnitList.size() - 1);
        assertThat(testMeasurementUnit.getUnit()).isEqualTo(DEFAULT_UNIT);
        assertThat(testMeasurementUnit.getSymbol()).isEqualTo(DEFAULT_SYMBOL);
        assertThat(testMeasurementUnit.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createMeasurementUnitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measurementUnitRepository.findAll().size();

        // Create the MeasurementUnit with an existing ID
        measurementUnit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasurementUnitMockMvc.perform(post("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurementUnit)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurementUnit in the database
        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = measurementUnitRepository.findAll().size();
        // set the field null
        measurementUnit.setUnit(null);

        // Create the MeasurementUnit, which fails.


        restMeasurementUnitMockMvc.perform(post("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurementUnit)))
            .andExpect(status().isBadRequest());

        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSymbolIsRequired() throws Exception {
        int databaseSizeBeforeTest = measurementUnitRepository.findAll().size();
        // set the field null
        measurementUnit.setSymbol(null);

        // Create the MeasurementUnit, which fails.


        restMeasurementUnitMockMvc.perform(post("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurementUnit)))
            .andExpect(status().isBadRequest());

        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMeasurementUnits() throws Exception {
        // Initialize the database
        measurementUnitRepository.saveAndFlush(measurementUnit);

        // Get all the measurementUnitList
        restMeasurementUnitMockMvc.perform(get("/api/measurement-units?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measurementUnit.getId().intValue())))
            .andExpect(jsonPath("$.[*].unit").value(hasItem(DEFAULT_UNIT)))
            .andExpect(jsonPath("$.[*].symbol").value(hasItem(DEFAULT_SYMBOL)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @Test
    @Transactional
    public void getMeasurementUnit() throws Exception {
        // Initialize the database
        measurementUnitRepository.saveAndFlush(measurementUnit);

        // Get the measurementUnit
        restMeasurementUnitMockMvc.perform(get("/api/measurement-units/{id}", measurementUnit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measurementUnit.getId().intValue()))
            .andExpect(jsonPath("$.unit").value(DEFAULT_UNIT))
            .andExpect(jsonPath("$.symbol").value(DEFAULT_SYMBOL))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }
    @Test
    @Transactional
    public void getNonExistingMeasurementUnit() throws Exception {
        // Get the measurementUnit
        restMeasurementUnitMockMvc.perform(get("/api/measurement-units/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasurementUnit() throws Exception {
        // Initialize the database
        measurementUnitRepository.saveAndFlush(measurementUnit);

        int databaseSizeBeforeUpdate = measurementUnitRepository.findAll().size();

        // Update the measurementUnit
        MeasurementUnit updatedMeasurementUnit = measurementUnitRepository.findById(measurementUnit.getId()).get();
        // Disconnect from session so that the updates on updatedMeasurementUnit are not directly saved in db
        em.detach(updatedMeasurementUnit);
        updatedMeasurementUnit
            .unit(UPDATED_UNIT)
            .symbol(UPDATED_SYMBOL)
            .quantity(UPDATED_QUANTITY);

        restMeasurementUnitMockMvc.perform(put("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasurementUnit)))
            .andExpect(status().isOk());

        // Validate the MeasurementUnit in the database
        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeUpdate);
        MeasurementUnit testMeasurementUnit = measurementUnitList.get(measurementUnitList.size() - 1);
        assertThat(testMeasurementUnit.getUnit()).isEqualTo(UPDATED_UNIT);
        assertThat(testMeasurementUnit.getSymbol()).isEqualTo(UPDATED_SYMBOL);
        assertThat(testMeasurementUnit.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasurementUnit() throws Exception {
        int databaseSizeBeforeUpdate = measurementUnitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasurementUnitMockMvc.perform(put("/api/measurement-units")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurementUnit)))
            .andExpect(status().isBadRequest());

        // Validate the MeasurementUnit in the database
        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasurementUnit() throws Exception {
        // Initialize the database
        measurementUnitRepository.saveAndFlush(measurementUnit);

        int databaseSizeBeforeDelete = measurementUnitRepository.findAll().size();

        // Delete the measurementUnit
        restMeasurementUnitMockMvc.perform(delete("/api/measurement-units/{id}", measurementUnit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MeasurementUnit> measurementUnitList = measurementUnitRepository.findAll();
        assertThat(measurementUnitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
