package br.com.pucminas.auth_service.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {
    @Value("${firebase.config.path}")
    private String firebaseConfigPath;

    @Bean
    public FirebaseApp initializeFirebaseApp() throws IOException {
        if (firebaseConfigPath == null || firebaseConfigPath.isBlank()) { throw new IllegalArgumentException("FIREBASE CONFIGURATION FILE PATH IS NOT DEFINED."); }
        try (InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream(firebaseConfigPath)) {
            if (serviceAccount == null) { throw new IOException("FAILED TO LOAD FIREBASE CONFIGURATION FILE: " + firebaseConfigPath);}
            FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
            if (FirebaseApp.getApps().isEmpty()) { return FirebaseApp.initializeApp(options); }
            return FirebaseApp.getInstance();
        }
    }
}
