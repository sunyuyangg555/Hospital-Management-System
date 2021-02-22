package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Bed.
 */
@Entity
@Table(name = "bed")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 20)
    @Column(name = "identifier", length = 20, nullable = false, unique = true)
    private String identifier;

    @Column(name = "is_occupied")
    private Boolean isOccupied;

    @ManyToOne
    @JsonIgnoreProperties(value = "beds", allowSetters = true)
    private Ward ward;

    @ManyToMany(mappedBy = "beds")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Admission> admissions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Bed identifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public Boolean isIsOccupied() {
        return isOccupied;
    }

    public Bed isOccupied(Boolean isOccupied) {
        this.isOccupied = isOccupied;
        return this;
    }

    public void setIsOccupied(Boolean isOccupied) {
        this.isOccupied = isOccupied;
    }

    public Ward getWard() {
        return ward;
    }

    public Bed ward(Ward ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Set<Admission> getAdmissions() {
        return admissions;
    }

    public Bed admissions(Set<Admission> admissions) {
        this.admissions = admissions;
        return this;
    }

    public Bed addAdmissions(Admission admission) {
        this.admissions.add(admission);
        admission.getBeds().add(this);
        return this;
    }

    public Bed removeAdmissions(Admission admission) {
        this.admissions.remove(admission);
        admission.getBeds().remove(this);
        return this;
    }

    public void setAdmissions(Set<Admission> admissions) {
        this.admissions = admissions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bed)) {
            return false;
        }
        return id != null && id.equals(((Bed) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bed{" +
            "id=" + getId() +
            ", identifier='" + getIdentifier() + "'" +
            ", isOccupied='" + isIsOccupied() + "'" +
            "}";
    }
}
