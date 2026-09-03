package com.example.integration_plateform.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JacksonXmlRootElement(localName = "EligibilityResponse")
public class SystemCEligibilityResponse {

    @JacksonXmlProperty(localName = "RequestID")
    private String requestId;

    @JacksonXmlProperty(localName = "CitizenID")
    private String citizenId;

    @JacksonXmlProperty(localName = "Eligible")
    private boolean eligible;

    @JacksonXmlProperty(localName = "Status")
    private String status;
}
