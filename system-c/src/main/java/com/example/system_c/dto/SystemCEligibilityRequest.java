package com.example.system_c.dto;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JacksonXmlRootElement(localName = "CitizenEligibilityRequest")
public class SystemCEligibilityRequest {
    @JacksonXmlProperty(localName = "RequestID")
    private String requestId;

    @JacksonXmlProperty(localName = "CitizenID")
    private String citizenId;

    @JacksonXmlProperty(localName = "Name")
    private String name;

    @JacksonXmlProperty(localName = "DateOfBirth")
    private String dateOfBirth;

    @JacksonXmlProperty(localName = "SchemeCode")
    private String schemeCode;
}
