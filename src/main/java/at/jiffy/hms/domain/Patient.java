package at.jiffy.hms.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Size(max = 100)
    @Column(name = "guardian_name", length = 100)
    private String guardianName;

    @Size(max = 15)
    @Column(name = "phone", length = 15)
    private String phone;

    @Size(max = 200)
    @Column(name = "address", length = 200)
    private String address;

    @Size(max = 20)
    @Column(name = "email_address", length = 20)
    private String emailAddress;

    @NotNull
    @Size(max = 10)
    @Column(name = "height", length = 10, nullable = false)
    private String height;

    @NotNull
    @Size(max = 10)
    @Column(name = "weight", length = 10, nullable = false)
    private String weight;

    @NotNull
    @Size(max = 10)
    @Column(name = "blood_pressure", length = 10, nullable = false)
    private String bloodPressure;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "is_admitted", nullable = false)
    private Boolean isAdmitted;

    @Size(max = 255)
    @Column(name = "patient_photo", length = 255)
    private String patientPhoto;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "note")
    private String note;

    @Size(max = 550)
    @Column(name = "symptoms", length = 550)
    private String symptoms;

    @Size(max = 25)
    @Column(name = "marriage_status", length = 25)
    private String marriageStatus;

    @Column(name = "gender")
    private String gender;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @OneToOne
    @JoinColumn(unique = true)
    private ConsultationResource contactsInformation;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ConsultationResource> consulatationResources = new HashSet<>();

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

    public Patient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public Patient guardianName(String guardianName) {
        this.guardianName = guardianName;
        return this;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getPhone() {
        return phone;
    }

    public Patient phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public Patient address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public Patient emailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
        return this;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getHeight() {
        return height;
    }

    public Patient height(String height) {
        this.height = height;
        return this;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public Patient weight(String weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public Patient bloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
        return this;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public Integer getAge() {
        return age;
    }

    public Patient age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean isIsAdmitted() {
        return isAdmitted;
    }

    public Patient isAdmitted(Boolean isAdmitted) {
        this.isAdmitted = isAdmitted;
        return this;
    }

    public void setIsAdmitted(Boolean isAdmitted) {
        this.isAdmitted = isAdmitted;
    }

    public String getPatientPhoto() {
        return patientPhoto;
    }

    public Patient patientPhoto(String patientPhoto) {
        this.patientPhoto = patientPhoto;
        return this;
    }

    public void setPatientPhoto(String patientPhoto) {
        this.patientPhoto = patientPhoto;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public Patient bloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
        return this;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getNote() {
        return note;
    }

    public Patient note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public Patient symptoms(String symptoms) {
        this.symptoms = symptoms;
        return this;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getMarriageStatus() {
        return marriageStatus;
    }

    public Patient marriageStatus(String marriageStatus) {
        this.marriageStatus = marriageStatus;
        return this;
    }

    public void setMarriageStatus(String marriageStatus) {
        this.marriageStatus = marriageStatus;
    }

    public String getGender() {
        return gender;
    }

    public Patient gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Patient isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public ConsultationResource getContactsInformation() {
        return contactsInformation;
    }

    public Patient contactsInformation(ConsultationResource consultationResource) {
        this.contactsInformation = consultationResource;
        return this;
    }

    public void setContactsInformation(ConsultationResource consultationResource) {
        this.contactsInformation = consultationResource;
    }

    public Set<ConsultationResource> getConsulatationResources() {
        return consulatationResources;
    }

    public Patient consulatationResources(Set<ConsultationResource> consultationResources) {
        this.consulatationResources = consultationResources;
        return this;
    }

    public Patient addConsulatationResources(ConsultationResource consultationResource) {
        this.consulatationResources.add(consultationResource);
        consultationResource.setPatient(this);
        return this;
    }

    public Patient removeConsulatationResources(ConsultationResource consultationResource) {
        this.consulatationResources.remove(consultationResource);
        consultationResource.setPatient(null);
        return this;
    }

    public void setConsulatationResources(Set<ConsultationResource> consultationResources) {
        this.consulatationResources = consultationResources;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patient)) {
            return false;
        }
        return id != null && id.equals(((Patient) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", guardianName='" + getGuardianName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", address='" + getAddress() + "'" +
            ", emailAddress='" + getEmailAddress() + "'" +
            ", height='" + getHeight() + "'" +
            ", weight='" + getWeight() + "'" +
            ", bloodPressure='" + getBloodPressure() + "'" +
            ", age=" + getAge() +
            ", isAdmitted='" + isIsAdmitted() + "'" +
            ", patientPhoto='" + getPatientPhoto() + "'" +
            ", bloodGroup='" + getBloodGroup() + "'" +
            ", note='" + getNote() + "'" +
            ", symptoms='" + getSymptoms() + "'" +
            ", marriageStatus='" + getMarriageStatus() + "'" +
            ", gender='" + getGender() + "'" +
            ", isActive='" + isIsActive() + "'" +
            "}";
    }
}
