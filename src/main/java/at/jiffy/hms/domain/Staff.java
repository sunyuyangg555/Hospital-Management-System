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
 * 工作人员
 */
@ApiModel(description = "工作人员")
@Entity
@Table(name = "staff")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Staff implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "username", unique = true)
    private String username;

    @Size(max = 20)
    @Column(name = "full_name", length = 20)
    private String fullName;

    @Column(name = "contacts")
    private String contacts;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "level")
    private String level;

    @Column(name = "email")
    private String email;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "is_acailable")
    private Boolean isAcailable;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "staff")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ConsultationResource> services = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "staffs", allowSetters = true)
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public Staff username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public Staff fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getContacts() {
        return contacts;
    }

    public Staff contacts(String contacts) {
        this.contacts = contacts;
        return this;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Staff imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLevel() {
        return level;
    }

    public Staff level(String level) {
        this.level = level;
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getEmail() {
        return email;
    }

    public Staff email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Staff isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean isIsAcailable() {
        return isAcailable;
    }

    public Staff isAcailable(Boolean isAcailable) {
        this.isAcailable = isAcailable;
        return this;
    }

    public void setIsAcailable(Boolean isAcailable) {
        this.isAcailable = isAcailable;
    }

    public User getUser() {
        return user;
    }

    public Staff user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<ConsultationResource> getServices() {
        return services;
    }

    public Staff services(Set<ConsultationResource> consultationResources) {
        this.services = consultationResources;
        return this;
    }

    public Staff addServices(ConsultationResource consultationResource) {
        this.services.add(consultationResource);
        consultationResource.setStaff(this);
        return this;
    }

    public Staff removeServices(ConsultationResource consultationResource) {
        this.services.remove(consultationResource);
        consultationResource.setStaff(null);
        return this;
    }

    public void setServices(Set<ConsultationResource> consultationResources) {
        this.services = consultationResources;
    }

    public Department getDepartment() {
        return department;
    }

    public Staff department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Staff)) {
            return false;
        }
        return id != null && id.equals(((Staff) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Staff{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", contacts='" + getContacts() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", level='" + getLevel() + "'" +
            ", email='" + getEmail() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", isAcailable='" + isIsAcailable() + "'" +
            "}";
    }
}
