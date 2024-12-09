package com.invoice.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.invoice.model.CompanyModel;
import com.invoice.request.CompanyImageUpdate;
import com.invoice.request.CompanyRequest;
import com.invoice.request.CompanyStampUpdate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.BeanUtils;

public class CompanyUtils {

    public static CompanyModel populateCompanyFromRequest(CompanyRequest companyRequest) {
        CompanyModel company = new CompanyModel();
        BeanUtils.copyProperties(companyRequest, company);
        company.setDeleted(false);
        return company;
    }

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static {
        // Configure the ObjectMapper to ignore unknown properties
        OBJECT_MAPPER.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }
    public static void updateCompanyFromRequest(CompanyModel companyToUpdate, CompanyRequest companyRequest) throws JsonMappingException {
        if (companyRequest == null) {
            throw new IllegalArgumentException(Constants.COMPANY_NOT_NULL);
        }
        // Use ObjectMapper to merge the properties
        OBJECT_MAPPER.updateValue(companyToUpdate, companyRequest);
    }
    public static CompanyModel CompanyImageUpdateProperties(CompanyModel existingEntity, CompanyImageUpdate companyRequest, String id) {
        if(companyRequest.getImage() != null){
            existingEntity.setImageFile(companyRequest.getImage());
        }

        return existingEntity;
    }

    public static CompanyModel CompanyStampImageUpdateProperties(CompanyModel existingEntity, CompanyStampUpdate companyRequest, String companyId) {
        if(companyRequest.getImage() != null){
            existingEntity.setStampImage(companyRequest.getImage());
        }

        return existingEntity;
    }

    public static CompanyModel CompanyProperties(CompanyModel companyEntity, HttpServletRequest request) {
        if (companyEntity.getImageFile() != null){
            String baseUrl = getBaseUrl(request);
            String image = baseUrl + "MyImage/" + companyEntity.getImageFile();
            companyEntity.setImageFile(image);
        }

        if (companyEntity.getStampImage() != null){
            String baseUrl = getBaseUrl(request);
            String image = baseUrl + "MyImage/" + companyEntity.getStampImage();
            companyEntity.setStampImage(image);
        }
        return companyEntity;
    }

    public static String getBaseUrl(HttpServletRequest request) {
        String scheme = request.getScheme(); // http or https
        String serverName = request.getServerName(); // localhost or IP
        int serverPort = request.getServerPort(); // port number
        String contextPath = request.getContextPath(); // context path

        return scheme + "://" + serverName+":" + (serverPort) + contextPath + "/";
    }
}
