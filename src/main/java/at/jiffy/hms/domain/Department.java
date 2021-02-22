package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "hierarchy")
    private String hierarchy;

    @Column(name = "descriptions")
    private String descriptions;

    @Column(name = "opening_date")
    private LocalDate openingDate;

    @Column(name = "extra_id")
    private String extraId;

    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Department> children = new HashSet<>();

    @OneToMany(mappedBy = "department")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Staff> staffs = new HashSet<>();

    @OneToMany(mappedBy = "department")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Transactions> transactions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "children", allowSetters = true)
    private Department parent;

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

    public Department name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHierarchy() {
        return hierarchy;
    }

    public Department hierarchy(String hierarchy) {
        this.hierarchy = hierarchy;
        return this;
    }

    public void setHierarchy(String hierarchy) {
        this.hierarchy = hierarchy;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public Department descriptions(String descriptions) {
        this.descriptions = descriptions;
        return this;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    public LocalDate getOpeningDate() {
        return openingDate;
    }

    public Department openingDate(LocalDate openingDate) {
        this.openingDate = openingDate;
        return this;
    }

    public void setOpeningDate(LocalDate openingDate) {
        this.openingDate = openingDate;
    }

    public String getExtraId() {
        return extraId;
    }

    public Department extraId(String extraId) {
        this.extraId = extraId;
        return this;
    }

    public void setExtraId(String extraId) {
        this.extraId = extraId;
    }

    public Set<Department> getChildren() {
        return children;
    }

    public Department children(Set<Department> departments) {
        this.children = departments;
        return this;
    }

    public Department addChildren(Department department) {
        this.children.add(department);
        department.setParent(this);
        return this;
    }

    public Department removeChildren(Department department) {
        this.children.remove(department);
        department.setParent(null);
        return this;
    }

    public void setChildren(Set<Department> departments) {
        this.children = departments;
    }

    public Set<Staff> getStaffs() {
        return staffs;
    }

    public Department staffs(Set<Staff> staff) {
        this.staffs = staff;
        return this;
    }

    public Department addStaffs(Staff staff) {
        this.staffs.add(staff);
        staff.setDepartment(this);
        return this;
    }

    public Department removeStaffs(Staff staff) {
        this.staffs.remove(staff);
        staff.setDepartment(null);
        return this;
    }

    public void setStaffs(Set<Staff> staff) {
        this.staffs = staff;
    }

    public Set<Transactions> getTransactions() {
        return transactions;
    }

    public Department transactions(Set<Transactions> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Department addTransactions(Transactions transactions) {
        this.transactions.add(transactions);
        transactions.setDepartment(this);
        return this;
    }

    public Department removeTransactions(Transactions transactions) {
        this.transactions.remove(transactions);
        transactions.setDepartment(null);
        return this;
    }

    public void setTransactions(Set<Transactions> transactions) {
        this.transactions = transactions;
    }

    public Department getParent() {
        return parent;
    }

    public Department parent(Department department) {
        this.parent = department;
        return this;
    }

    public void setParent(Department department) {
        this.parent = department;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return id != null && id.equals(((Department) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", hierarchy='" + getHierarchy() + "'" +
            ", descriptions='" + getDescriptions() + "'" +
            ", openingDate='" + getOpeningDate() + "'" +
            ", extraId='" + getExtraId() + "'" +
            "}";
    }
}
