package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * 药品
 */
@ApiModel(description = "药品")
@Entity
@Table(name = "medicine")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Medicine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "company", nullable = false)
    private String company;

    @NotNull
    @Column(name = "compositions", nullable = false)
    private String compositions;

    @Column(name = "units")
    private Integer units;

    @Column(name = "price")
    private Double price;

    @OneToMany(mappedBy = "medicine")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transactions> transactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "medicines", allowSetters = true)
    private MedicineGroup group;

    @ManyToOne
    @JsonIgnoreProperties(value = "medicines", allowSetters = true)
    private MedicineCategory category;

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

    public Medicine name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public Medicine company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getCompositions() {
        return compositions;
    }

    public Medicine compositions(String compositions) {
        this.compositions = compositions;
        return this;
    }

    public void setCompositions(String compositions) {
        this.compositions = compositions;
    }

    public Integer getUnits() {
        return units;
    }

    public Medicine units(Integer units) {
        this.units = units;
        return this;
    }

    public void setUnits(Integer units) {
        this.units = units;
    }

    public Double getPrice() {
        return price;
    }

    public Medicine price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Transactions> getTransactions() {
        return transactions;
    }

    public Medicine transactions(Set<Transactions> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Medicine addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.setMedicine(this);
        return this;
    }

    public Medicine removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.setMedicine(null);
        return this;
    }

    public void setTransactions(Set<Transactions> transactions) {
        this.transactions = transactions;
    }

    public MedicineGroup getGroup() {
        return group;
    }

    public Medicine group(MedicineGroup medicineGroup) {
        this.group = medicineGroup;
        return this;
    }

    public void setGroup(MedicineGroup medicineGroup) {
        this.group = medicineGroup;
    }

    public MedicineCategory getCategory() {
        return category;
    }

    public Medicine category(MedicineCategory medicineCategory) {
        this.category = medicineCategory;
        return this;
    }

    public void setCategory(MedicineCategory medicineCategory) {
        this.category = medicineCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Medicine)) {
            return false;
        }
        return id != null && id.equals(((Medicine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Medicine{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", company='" + getCompany() + "'" +
            ", compositions='" + getCompositions() + "'" +
            ", units=" + getUnits() +
            ", price=" + getPrice() +
            "}";
    }
}
