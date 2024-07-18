package yeomeong.common.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import yeomeong.common.entity.member.Teacher;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Ban {

    @Id @GeneratedValue
    @JoinColumn(name = "ban_id")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private KinderGarten kinderGarten;

    @OneToMany(mappedBy = "teacher")
    private List<Teacher> teachers = new ArrayList<>();

}
