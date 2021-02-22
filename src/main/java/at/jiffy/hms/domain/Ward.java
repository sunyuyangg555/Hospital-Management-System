package at.jiffy.hms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ward.
 */
@Entity
@Table(name = "ward")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Ward implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 15)
    @Column(name = "name", length = 15, nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "ward")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Bed> beds = new HashSet<>();

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

    public Ward name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Bed> getBeds() {
        return beds;
    }

    public Ward beds(Set<Bed> beds) {
        this.beds = beds;
        return this;
    }

    public Ward addBeds(Bed bed) {
        this.beds.add(bed);
        bed.setWard(this);
        return this;
    }

    public Ward removeBeds(Bed bed) {
        this.beds.remove(bed);
        bed.setWard(null);
        return this;
    }

    public void setBeds(Set<Bed> beds) {
        this.beds = beds;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ward)) {
            return false;
        }
        return id != null && id.equals(((Ward) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Ward{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
