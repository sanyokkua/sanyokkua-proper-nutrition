package com.kostenko.pp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@EnableWebMvc
//@Configuration
public class MvcConfig implements WebMvcConfigurer { //TODO:

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/static/**")
//                .addResourceLocations("/WEB-INF/build/static/");
//        registry.addResourceHandler("/*.js")
//                .addResourceLocations("/WEB-INF/build/");
//        registry.addResourceHandler("/*.json")
//                .addResourceLocations("/WEB-INF/view/react/build/");
//        registry.addResourceHandler("/index.html")
//                .addResourceLocations("/WEB-INF/build/index.html");
    }
}
