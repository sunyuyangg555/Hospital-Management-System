package at.jiffy.hms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MedicalService.
 */
@Entity
@Table(name = "medical_service")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class MedicalService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "name", unique = true)
    private String name;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @OneToMany(mappedBy = "medicalService")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transactions> transcations = new HashSet<>();

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

    public MedicalService name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public MedicalService isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getPrice() {
        return price;
    }

    public MedicalService price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Transactions> getTranscations() {
        return transcations;
    }

    public MedicalService transcations(Set<Transactions> transactions) {
        this.transcations = transactions;
        return this;
    }

    public MedicalService addTranscations(Transactions transactions) {
        this.transcations.add(transactions);
        transactions.setMedicalService(this);
        return this;
    }

    public MedicalService removeTranscations(Transactions transactions) {
        this.transcations.remove(transactions);
        transactions.setMedicalService(null);
        return this;
    }

    public void setTranscations(Set<Transactions> transactions) {
        this.transcations = transactions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedicalService)) {
            return false;
        }
        return id != null && id.equals(((MedicalService) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MedicalService{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
