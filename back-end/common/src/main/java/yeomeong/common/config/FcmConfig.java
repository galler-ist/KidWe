//package yeomeong.common.config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import com.google.firebase.messaging.FirebaseMessaging;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.List;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//@Configuration
//public class FcmConfig {
//
//    @Bean
//    FirebaseMessaging firebaseMessaging() throws IOException {
//        ClassPathResource resource = new ClassPathResource("firebase-cloud-message.json");
//        InputStream refreshToken = resource.getInputStream();
//        FirebaseOptions options = FirebaseOptions.builder()
//            .setCredentials(GoogleCredentials.fromStream(refreshToken))
//            .build();
//        FirebaseApp firebaseApp = FirebaseApp.initializeApp(options);
//        return FirebaseMessaging.getInstance(firebaseApp);
//
////        FirebaseApp firebaseApp = null;
////        List<FirebaseApp> firebaseAppList = FirebaseApp.getApps();
////        if (firebaseAppList != null && !firebaseAppList.isEmpty()) {
////            for (FirebaseApp app : firebaseAppList) {
////                if (app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
////                    firebaseApp = app;
////                }
////            }
////        } else {
////            FirebaseOptions options = FirebaseOptions.builder()
////                .setCredentials(GoogleCredentials.fromStream(refreshToken))
////                .build();
////            firebaseApp = FirebaseApp.initializeApp(options);
////        }
////
////        return FirebaseMessaging.getInstance(firebaseApp);
//    }
//
//}