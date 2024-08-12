package yeomeong.common.entity.post;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate startDate;
    private LocalDate endDate;

    @OneToOne(fetch = FetchType.LAZY)
    private Announcement announcement;

    @OneToMany(mappedBy = "vote")
    private List<VoteItem> items = new ArrayList<>();


    public Vote(String title, LocalDate startDate, LocalDate endDate,List<VoteItem> items,Announcement announcement ){
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.items = items;
        this.announcement = announcement;
    }
}

