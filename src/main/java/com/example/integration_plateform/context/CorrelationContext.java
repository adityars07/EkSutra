package com.example.integration_plateform.context;


public class CorrelationContext {
    private static final ThreadLocal<String> CORRELATION_ID =
            new ThreadLocal<>();

    public static void set(String id) {
        CORRELATION_ID.set(id);
    }

    public static String get() {
        return CORRELATION_ID.get();
    }

    public static void clear() {
        CORRELATION_ID.remove();
    }
}
