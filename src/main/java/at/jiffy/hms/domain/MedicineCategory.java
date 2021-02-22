package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MedicineCategory.
 */
@Entity
@Table(name = "medicine_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedicineCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "name", length = 200, nullable = false)
    private String name;

    @Size(max = 350)
    @Column(name = "descriptions", length = 350)
    private String descriptions;

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Medicine> medicines = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "medicineCategories", allowSetters = true)
    private MeasurementUnit measurementUnit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public MedicineCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public MedicineCategory descriptions(String descriptions) {
        this.descriptions = descriptions;
        return this;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public Set<Medicine> getMedicines() {
        return medicines;
    }

    public MedicineCategory medicines(Set<Medicine> medicines) {
        this.medicines = medicines;
        return this;
    }

    public MedicineCategory addMedicines(Medicine medicine) {
        this.medicines.add(medicine);
        medicine.setCategory(this);
        return this;
    }

    public MedicineCategory removeMedicines(Medicine medicine) {
        this.medicines.remove(medicine);
        medicine.setCategory(null);
        return this;
    }

    public void setMedicines(Set<Medicine> medicines) {
        this.medicines = medicines;
    }

    public MeasurementUnit getMeasurementUnit() {
        return measurementUnit;
    }

    public MedicineCategory measurementUnit(MeasurementUnit measurementUnit) {
        this.measurementUnit = measurementUnit;
        return this;
    }

    public void setMeasurementUnit(MeasurementUnit measurementUnit) {
        this.measurementUnit = measurementUnit;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedicineCategory)) {
            return false;
        }
        return id != null && id.equals(((MedicineCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedicineCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", descriptions='" + getDescriptions() + "'" +
            "}";
    }
}
