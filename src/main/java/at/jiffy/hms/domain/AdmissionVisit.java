package at.jiffy.hms.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A AdmissionVisit.
 */
@Entity
@Table(name = "admission_visit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AdmissionVisit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 550)
    @Column(name = "symptoms", length = 550, nullable = false)
    private String symptoms;

    @Column(name = "date_time")
    private LocalDate dateTime;

    @ManyToOne
    @JsonIgnoreProperties(value = "visits", allowSetters = true)
    private Admission admission;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public AdmissionVisit symptoms(String symptoms) {
        this.symptoms = symptoms;
        return this;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public AdmissionVisit dateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public Admission getAdmission() {
        return admission;
    }

    public AdmissionVisit admission(Admission admission) {
        this.admission = admission;
        return this;
    }

    public void setAdmission(Admission admission) {
        this.admission = admission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AdmissionVisit)) {
            return false;
        }
        return id != null && id.equals(((AdmissionVisit) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AdmissionVisit{" +
            "id=" + getId() +
            ", symptoms='" + getSymptoms() + "'" +
            ", dateTime='" + getDateTime() + "'" +
            "}";
    }
}
