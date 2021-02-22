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
 * A Admission.
 */
@Entity
@Table(name = "admission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Admission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @NotNull
    @Column(name = "from_date_time", nullable = false)
    private LocalDate fromDateTime;

    @Column(name = "to_date_time")
    private LocalDate toDateTime;

    @OneToMany(mappedBy = "admission")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<AdmissionVisit> visits = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "admission_beds",
               joinColumns = @JoinColumn(name = "admission_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "beds_id", referencedColumnName = "id"))
    private Set<Bed> beds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "admissions", allowSetters = true)
    private ConsultationResource service;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Admission isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDate getFromDateTime() {
        return fromDateTime;
    }

    public Admission fromDateTime(LocalDate fromDateTime) {
        this.fromDateTime = fromDateTime;
        return this;
    }

    public void setFromDateTime(LocalDate fromDateTime) {
        this.fromDateTime = fromDateTime;
    }

    public LocalDate getToDateTime() {
        return toDateTime;
    }

    public Admission toDateTime(LocalDate toDateTime) {
        this.toDateTime = toDateTime;
        return this;
    }

    public void setToDateTime(LocalDate toDateTime) {
        this.toDateTime = toDateTime;
    }

    public Set<AdmissionVisit> getVisits() {
        return visits;
    }

    public Admission visits(Set<AdmissionVisit> admissionVisits) {
        this.visits = admissionVisits;
        return this;
    }

    public Admission addVisits(AdmissionVisit admissionVisit) {
        this.visits.add(admissionVisit);
        admissionVisit.setAdmission(this);
        return this;
    }

    public Admission removeVisits(AdmissionVisit admissionVisit) {
        this.visits.remove(admissionVisit);
        admissionVisit.setAdmission(null);
        return this;
    }

    public void setVisits(Set<AdmissionVisit> admissionVisits) {
        this.visits = admissionVisits;
    }

    public Set<Bed> getBeds() {
        return beds;
    }

    public Admission beds(Set<Bed> beds) {
        this.beds = beds;
        return this;
    }

    public Admission addBeds(Bed bed) {
        this.beds.add(bed);
        bed.getAdmissions().add(this);
        return this;
    }

    public Admission removeBeds(Bed bed) {
        this.beds.remove(bed);
        bed.getAdmissions().remove(this);
        return this;
    }

    public void setBeds(Set<Bed> beds) {
        this.beds = beds;
    }

    public ConsultationResource getService() {
        return service;
    }

    public Admission service(ConsultationResource consultationResource) {
        this.service = consultationResource;
        return this;
    }

    public void setService(ConsultationResource consultationResource) {
        this.service = consultationResource;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Admission)) {
            return false;
        }
        return id != null && id.equals(((Admission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Admission{" +
            "id=" + getId() +
            ", isActive='" + isIsActive() + "'" +
            ", fromDateTime='" + getFromDateTime() + "'" +
            ", toDateTime='" + getToDateTime() + "'" +
            "}";
    }
}
