package com.invoicelogin.config;

import com.invoicelogin.util.Constants;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartFile;

@Configuration
@Profile("!test")
public class SwaggerConfig {
    public static final String INVOICE_TAG = "invoice";

    static {
        SpringDocUtils.getConfig().addFileType(MultipartFile.class);
    }

    @Bean
    public OpenAPI invoiceOpenApi() {
        return new OpenAPI()
                .info(new Info().title("Invoice REST API")
                        .description("Invoice REST API for managing invoices")
                        .version("v1.0.0")
                ).components(new Components()
                        .addSecuritySchemes(Constants.AUTHORIZATION,
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme(Constants.BEARER).bearerFormat(Constants.JWT)))
                .externalDocs(new ExternalDocumentation()
                        .description("Invoice Application - Documentation")
                        .url("http://your-invoice-app-docs-url"));
    }

}
