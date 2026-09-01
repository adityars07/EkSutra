package com.example.integration_plateform.filter;


import com.example.integration_plateform.context.CorrelationContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class CorrelationIdFilter extends OncePerRequestFilter {
    public static final String CORRELATION_ID= "X-Correlation-ID";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request
            , HttpServletResponse response
            , FilterChain filterChain) throws ServletException, IOException{
        String correlationId = request.getHeader(CORRELATION_ID);
        if(correlationId == null || correlationId.isBlank()){
            correlationId = UUID.randomUUID().toString();
        }
        System.out.println(
                "Correlation ID received: " + correlationId
        );
        response.setHeader(CORRELATION_ID, correlationId);
        CorrelationContext.set(correlationId);
        try {
            filterChain.doFilter(request, response);
        } finally {
            CorrelationContext.clear();
        }
    }

}
