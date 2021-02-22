package at.jiffy.hms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MeasurementUnit.
 */
@Entity
@Table(name = "measurement_unit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MeasurementUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "unit", length = 100, nullable = false)
    private String unit;

    @NotNull
    @Size(max = 20)
    @Column(name = "symbol", length = 20, nullable = false)
    private String symbol;

    @Size(max = 80)
    @Column(name = "quantity", length = 80)
    private String quantity;

    @OneToMany(mappedBy = "measurementUnit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<MedicineCategory> medicineCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUnit() {
        return unit;
    }

    public MeasurementUnit unit(String unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getSymbol() {
        return symbol;
    }

    public MeasurementUnit symbol(String symbol) {
        this.symbol = symbol;
        return this;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getQuantity() {
        return quantity;
    }

    public MeasurementUnit quantity(String quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Set<MedicineCategory> getMedicineCategories() {
        return medicineCategories;
    }

    public MeasurementUnit medicineCategories(Set<MedicineCategory> medicineCategories) {
        this.medicineCategories = medicineCategories;
        return this;
    }

    public MeasurementUnit addMedicineCategories(MedicineCategory medicineCategory) {
        this.medicineCategories.add(medicineCategory);
        medicineCategory.setMeasurementUnit(this);
        return this;
    }

    public MeasurementUnit removeMedicineCategories(MedicineCategory medicineCategory) {
        this.medicineCategories.remove(medicineCategory);
        medicineCategory.setMeasurementUnit(null);
        return this;
    }

    public void setMedicineCategories(Set<MedicineCategory> medicineCategories) {
        this.medicineCategories = medicineCategories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MeasurementUnit)) {
            return false;
        }
        return id != null && id.equals(((MeasurementUnit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MeasurementUnit{" +
            "id=" + getId() +
            ", unit='" + getUnit() + "'" +
            ", symbol='" + getSymbol() + "'" +
            ", quantity='" + getQuantity() + "'" +
            "}";
    }
}
