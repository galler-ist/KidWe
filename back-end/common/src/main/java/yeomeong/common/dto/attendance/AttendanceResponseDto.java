package yeomeong.common.dto.attendance;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import yeomeong.common.entity.Attendance;

@Getter
@Builder
public class AttendanceResponseDto {

    long attendanceId;

    long banId;
    String banName;

    long kidId;
    String kidName;

    String reason;
    boolean attendedToday;
//    Time inTime;
//    Time outTime;;
    LocalDate date;

    public static AttendanceResponseDto toAttendanceResponseDto(Attendance attendance) {
        return AttendanceResponseDto.builder()
            .attendanceId(attendance.getId())
            .banId(attendance.getKid().getBan().getId())
            .banName(attendance.getKid().getBan().getName())
            .kidId(attendance.getKid().getId())
            .kidName(attendance.getKid().getName())
            .reason(attendance.getReason())
            .attendedToday(attendance.getAttendedToday())
//            .inTime(attendance.getInTime())
//            .outTime(attendance.getOutTime())
            .date(attendance.getDate())
            .build();
    }

}
