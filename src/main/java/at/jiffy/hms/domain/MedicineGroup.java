package at.jiffy.hms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MedicineGroup.
 */
@Entity
@Table(name = "medicine_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedicineGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 200)
    @Column(name = "name", length = 200, nullable = false)
    private String name;

    @NotNull
    @Size(max = 250)
    @Column(name = "descriptions", length = 250, nullable = false)
    private String descriptions;

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Medicine> medicines = new HashSet<>();

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

    public MedicineGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public MedicineGroup descriptions(String descriptions) {
        this.descriptions = descriptions;
        return this;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public Set<Medicine> getMedicines() {
        return medicines;
    }

    public MedicineGroup medicines(Set<Medicine> medicines) {
        this.medicines = medicines;
        return this;
    }

    public MedicineGroup addMedicines(Medicine medicine) {
        this.medicines.add(medicine);
        medicine.setGroup(this);
        return this;
    }

    public MedicineGroup removeMedicines(Medicine medicine) {
        this.medicines.remove(medicine);
        medicine.setGroup(null);
        return this;
    }

    public void setMedicines(Set<Medicine> medicines) {
        this.medicines = medicines;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedicineGroup)) {
            return false;
        }
        return id != null && id.equals(((MedicineGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedicineGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", descriptions='" + getDescriptions() + "'" +
            "}";
    }
}
